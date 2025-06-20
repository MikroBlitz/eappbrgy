<template>
    <div class="flex flex-col items-center py-2 justify-center">
        <div
            class="w-full max-w-[1400px] border border-gray-100 dark:border-gray-700 rounded-lg"
        >
            <TableData
                v-model:selected-rows="selectedRows"
                v-model:sort="sort"
                v-model:page="page"
                v-model:page-count="pageCount"
                v-model:search="search"
                v-model:selected-status="selectedFilters"
                v-model:selected-columns="selectedColumns"
                :columns="columns"
                :data="data"
                :loading="loading"
                :filters="filters"
                :total-items="pageTotal"
                :actions="computedActions"
                @reset-filters="resetFilters"
                @select="select"
            >
                <template #header>
                    <div class="flex w-full items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Icon
                                :name="config.icon"
                                class="text-gray-900 mr-2 dark:text-emerald-500"
                                size="30"
                            />
                            <h2
                                class="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight"
                            >
                                {{ config.title }}
                            </h2>
                        </div>
                        <div class="flex gap-2">
                            <template
                                v-if="auth.can(config.permissions.create)"
                            >
                                <UTooltip :text="`Add ${config.singular}`">
                                    <UButton
                                        class="p-2 rounded-full group"
                                        @click="openAddModal"
                                    >
                                        <UIcon
                                            name="mdi:add"
                                            class="group-hover:scale-150 transition-all duration-300"
                                        />
                                    </UButton>
                                </UTooltip>
                            </template>
                            <UTooltip text="Refetch Data">
                                <UButton
                                    class="p-2 rounded-full group"
                                    variant="outline"
                                    @click="fetchData"
                                >
                                    <UIcon
                                        name="mdi:reload"
                                        class="transition-transform duration-500 group-hover:scale-150"
                                        :style="`transform: rotate(${rotationRefetch}deg);`"
                                    />
                                </UButton>
                            </UTooltip>
                        </div>
                    </div>
                </template>
            </TableData>
        </div>

        <!-- Form Modal -->
        <ModalForm
            v-model:is-open="isOpen"
            :title="`${config.singular} Form`"
            :form-schema="formSchema"
            :zod-schema="zodSchema"
            :state="formState"
            :on-submit="onSubmit"
            :loading="modalLoading"
            :option-loading="optionLoading"
        />

        <!-- Delete Modal -->
        <ModalConfirm
            v-model:is-open="isDeleteModal"
            :loading="modalLoading"
            label="Delete"
            :description="`Are you sure you want to delete this ${config.singular.toLowerCase()}?`"
            icon="i-heroicons-exclamation-triangle"
            :action="() => handleDelete(selectedItem.id)"
            color="red"
        />

        <!-- Change Status Modal -->
        <ModalConfirm
            v-if="config.hasStatus"
            v-model:is-open="isChangeStatusModal"
            :loading="modalLoading"
            label="Switch Status"
            description="Confirm switch status?"
            icon="i-heroicons-information-circle"
            :action="() => handleStatusChange(selectedItem.id)"
            color="blue"
        />
    </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { FormSubmitEvent } from "#ui/types";
import type { ZodType, ZodTypeDef } from "zod";

import { useDebounce, useTimeoutFn } from "@vueuse/shared";

import type { CrudConfig, CrudOperations } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";

interface Props<T extends Record<string, unknown>> {
    actions?: Array<Record<string, unknown>>;
    columns: Array<Record<string, unknown>>;
    config: CrudConfig;
    filters: Array<Record<string, unknown>>;
    formSchema: FormSchema;
    operations: CrudOperations<T>;
    optionLoading?: Ref<boolean, boolean> | undefined;
    zodSchema: ZodType<any, ZodTypeDef, any> | undefined;
}

const props = defineProps<Props<any>>();

const auth = useAuthStore();
const selectedColumns = ref(props.columns);
const selectedRows = ref<T[]>([]);

const sort = ref({ column: "id", direction: "asc" as "asc" | "desc" });
const page = ref(1);
const pageCount = ref(10);
const search = ref("");
const selectedFilters = ref([]);
const debouncedSearch = useDebounce(search, 500);

const isOpen = ref(false);
const isDeleteModal = ref(false);
const isChangeStatusModal = ref(false);
const selectedItem = ref<T | null>(null);

const data = ref<T[]>([]);
const loading = ref(false);
const modalLoading = ref(false);
const result = ref<any>({});
const rotationRefetch = ref(0);
const formState = reactive({});

const pageTotal = computed(() => {
    const queryKey = Object.keys(result.value)[0];
    if (!queryKey) return;
    if (!result.value[queryKey]?.paginatorInfo) return 0;
    return result.value[queryKey].paginatorInfo.total;
});

const computedActions = computed(() => {
    const defaultActions = [];

    if (props.config.hasStatus) {
        defaultActions.push({
            color: (row: T) => (row.is_active ? "green" : "gray"),
            condition: () =>
                auth.can(props.config.permissions.updateStatus || ""),
            icon: (row: T) =>
                row.is_active ? "mdi:toggle-switch" : "mdi:toggle-switch-off",
            onClick: (row: T) => openChangeStatusModal(row),
            tooltip: (row: T) =>
                `Switch status to "${row.is_active ? "Inactive" : "Active"}"`,
        });
    }

    defaultActions.push(
        {
            color: () => "yellow",
            condition: () => auth.can(props.config.permissions.view),
            icon: () => "mdi:eye",
            onClick: (row: T) => openViewModal(row),
            tooltip: (row: T) =>
                `View ${props.config.singular} ${row.name || row.id}`,
        },
        {
            color: () => "blue",
            condition: () => auth.can(props.config.permissions.edit),
            icon: () => "mdi:pencil",
            onClick: (row: T) => openEditModal(row),
            tooltip: (row: T) =>
                `Edit ${props.config.singular} ${row.name || row.id}`,
        },
        {
            color: () => "red",
            condition: () => auth.can(props.config.permissions.delete),
            icon: () => "mdi:delete",
            onClick: (row: T) => openDeleteModal(row),
            tooltip: (row: T) =>
                `Delete ${props.config.singular} ${row.name || row.id}`,
        },
    );

    return props.actions
        ? [...props.actions, ...defaultActions]
        : defaultActions;
});

const resetFilters = () => {
    search.value = "";
    selectedFilters.value = [];
    sort.value = { column: "id", direction: "asc" as "asc" | "desc" };
};

function select(row: T) {
    const index = selectedRows.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selectedRows.value.push(row);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

function openAddModal() {
    Object.assign(formState, props.operations.getFormState());
    isOpen.value = true;
}

function openViewModal(item: T) {
    selectedItem.value = item;
    Object.assign(formState, props.operations.getFormState(item));
    isOpen.value = true;
}

function openEditModal(item: T) {
    selectedItem.value = item;
    Object.assign(formState, props.operations.getFormState(item));
    isOpen.value = true;
}

function openDeleteModal(item: T) {
    selectedItem.value = item;
    isDeleteModal.value = true;
}

function openChangeStatusModal(item: T) {
    selectedItem.value = item;
    isChangeStatusModal.value = true;
}

async function fetchData() {
    rotationRefetch.value += 360;
    try {
        loading.value = true;
        const variables: Record<string, unknown> = {
            first: Number(pageCount.value),
            page: page.value,
        };

        if (search.value) variables.search = search.value;
        if (sort.value) variables.sort = sort.value;
        if (selectedFilters.value && selectedFilters.value.length > 0) {
            variables.filter = selectedFilters.value;
        }

        const { data: responseData } = await useAsyncQuery(
            props.operations.query,
            variables,
        );

        if (responseData.value) {
            result.value = responseData.value;
            const queryKey = Object.keys(result.value)[0];
            data.value = result.value[queryKey].data;
        }
    } catch (error) {
        console.error(
            `Error fetching ${props.config.title.toLowerCase()}:`,
            error,
        );
    } finally {
        useTimeoutFn(() => (loading.value = false), 300);
    }
}

async function handleDelete(id: string) {
    const { mutate: deleteMutation } = useMutation(props.operations.delete);
    return useGraphQLMutation(
        props.config.singular,
        "deleted",
        modalLoading,
        { id },
        {
            auth: auth.user?.id,
            fetch: fetchData,
            modal: isDeleteModal,
            mutation: deleteMutation,
        },
    );
}

async function handleStatusChange(id: string) {
    if (!props.operations.updateStatus || !selectedItem.value) return;

    const { mutate: statusMutation } = useMutation(
        props.operations.updateStatus,
    );
    const input: Record<string, unknown> = {
        id,
        is_active: !selectedItem.value.is_active,
    };

    return useGraphQLMutation(
        `${props.config.singular} Status`,
        "updated",
        modalLoading,
        input,
        {
            auth: auth.user?.id,
            fetch: fetchData,
            modal: isChangeStatusModal,
            mutation: statusMutation,
        },
    );
}

async function onSubmit(event: FormSubmitEvent<any>) {
    const { mutate: upsertMutation } = useMutation(props.operations.upsert);
    const input = props.operations.prepareSubmitData(
        event.data,
        selectedItem.value,
    );

    return useGraphQLMutation(
        props.config.singular,
        "saved",
        modalLoading,
        { input },
        {
            fetch: fetchData,
            modal: isOpen,
            mutation: upsertMutation,
        },
    );
}

onMounted(() => fetchData());
onBeforeMount(() => fetchData());
watch(
    [page, pageCount, sort, debouncedSearch, selectedFilters],
    () => fetchData(),
    { deep: true },
);
</script>
