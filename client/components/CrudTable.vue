<template>
    <div class="flex flex-col items-center p-2 h-[calc(100vh-100px)]">
        <div
            class="w-full max-w-[1600px] border border-gray-100 dark:border-gray-700 rounded-lg flex flex-col h-[calc(100vh-85px)]"
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
                class="flex flex-col h-full overflow-auto"
                @reset-filters="resetFilters"
                @select="select"
            >
                <template #header>
                    <div class="flex w-full items-center justify-between pt-2">
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
                                        class="hover:bg-transparent hover:scale-110 transition-all duration-300 p-1"
                                        icon="solar:add-square-broken"
                                        variant="ghost"
                                        size="xl"
                                        @click="openAddModal"
                                    />
                                </UTooltip>
                            </template>
                            <UTooltip text="Refetch Data">
                                <UButton
                                    class="hover:bg-transparent hover:scale-110 rounded-full transition-all duration-300 p-1"
                                    :style="`transform: rotate(${rotationRefetch}deg);`"
                                    icon="solar:refresh-bold"
                                    variant="ghost"
                                    size="xl"
                                    @click="handleRefetch"
                                />
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
            :is-fullscreen="isFormFullscreen"
        />

        <!-- View Modal -->
        <ModalView
            v-if="defaultViewModal"
            v-model:is-open="isViewModal"
            :title="`View ${config.singular}`"
            :form-schema="formSchema"
            :state="viewState"
            :show-edit-button="auth.can(config.permissions.edit)"
            @edit-clicked="handleEditFromView"
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

import { useDebounce } from "@vueuse/shared";

import type {
    CrudConfig,
    CrudOperations,
    TableAction,
} from "~/components/table/types";
import type { FormSchema } from "~/types/fields";

interface Props<T extends Record<string, unknown>> {
    actions?: TableAction[];
    columns: Array<Record<string, unknown>>;
    config: CrudConfig;
    defaultViewModal: boolean;
    filters?: Array<Record<string, unknown>>;
    formSchema: FormSchema;
    isFormFullscreen: boolean;
    operations: CrudOperations<T>;
    optionLoading?: Ref<boolean, boolean> | boolean;
    zodSchema: ZodType<any, ZodTypeDef, any> | undefined;

    // Action configuration
    actionPosition?: "start" | "end" | "both";
    hideDefaultActions?: boolean;
    maxVisibleActions?: number;
    useActionDropdown?: boolean;
}

const props = withDefaults(defineProps<Props<any>>(), {
    actionPosition: "end",
    actions: () => [],
    defaultViewModal: true,
    filters: () => [],
    hideDefaultActions: false,
    isFormFullscreen: false,
    maxVisibleActions: 5,
    optionLoading: false,
    useActionDropdown: false,
});

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
const isViewModal = ref(false);
const isDeleteModal = ref(false);
const isChangeStatusModal = ref(false);
const selectedItem = ref<T | null>(null);

const modalLoading = ref(false);
const rotationRefetch = ref(0);
const formState = reactive({});
const viewState = reactive({});

const queryVariables = computed(() => {
    const variables: Record<string, unknown> = {
        first: Number(pageCount.value),
        page: page.value,
    };

    if (debouncedSearch.value) variables.search = debouncedSearch.value;
    if (sort.value) variables.sort = sort.value;
    if (selectedFilters.value && selectedFilters.value.length > 0) {
        variables.filter = selectedFilters.value;
    }

    return variables;
});

const { error, loading, refetch, result } = useQuery(
    props.operations.query,
    queryVariables,
    {
        errorPolicy: "all",
        fetchPolicy: "cache-and-network",
    },
);

const data = computed(() => {
    if (!result.value) return [];
    const queryKey = Object.keys(result.value)[0];
    if (!queryKey) return [];
    return result.value[queryKey].data || [];
});

const pageTotal = computed(() => {
    if (!result.value) return 0;
    const queryKey = Object.keys(result.value)[0];
    if (!queryKey) return 0;
    return result.value[queryKey].paginatorInfo?.total || 0;
});

// Helper function to resolve dynamic values
const resolveDynamicValue = <T, K>(value: K | ((row: T) => K), row: T): K => {
    return typeof value === "function" ? (value as (row: T) => K)(row) : value;
};

// Enhanced computed actions with full customization
const computedActions = computed(() => {
    const customActions = props.actions.map((action, _index) => ({
        ...action,
    }));

    const defaultActions = props.hideDefaultActions
        ? []
        : [
              ...(props.config.hasStatus
                  ? [
                        {
                            color: (row: T) =>
                                row.is_active ? "green" : "gray",
                            condition: () =>
                                auth.can(
                                    props.config.permissions.updateStatus || "",
                                ),
                            icon: (row: T) =>
                                row.is_active
                                    ? "mdi:toggle-switch"
                                    : "mdi:toggle-switch-off",
                            onClick: (row: T) => openChangeStatusModal(row),
                            tooltip: (row: T) =>
                                `Switch status to "${row.is_active ? "Inactive" : "Active"}"`,
                        },
                    ]
                  : []),

              // View action
              {
                  color: () => "yellow",
                  condition: () =>
                      props.defaultViewModal &&
                      auth.can(props.config.permissions.view),
                  icon: () => "solar:eye-broken",
                  onClick: (row: T) => openViewModal(row),
                  tooltip: (row: T) =>
                      `View ${props.config.singular} ${row.name || row.id}`,
              },

              // Edit action
              {
                  color: () => "blue",
                  condition: () => auth.can(props.config.permissions.edit),
                  icon: () => "solar:pen-new-square-outline",
                  onClick: (row: T) => openEditModal(row),
                  tooltip: (row: T) =>
                      `Edit ${props.config.singular} ${row.name || row.id}`,
              },

              // Delete action
              {
                  color: () => "red",
                  condition: () => auth.can(props.config.permissions.delete),
                  icon: () => "solar:trash-bin-minimalistic-broken",
                  onClick: (row: T) => openDeleteModal(row),
                  tooltip: (row: T) =>
                      `Delete ${props.config.singular} ${row.name || row.id}`,
              },
          ];

    const allActions = [...customActions, ...defaultActions];

    return allActions.map((action) => ({
        color: action.color,
        condition: action.condition,
        icon: action.icon,
        onClick: action.onClick,
        tooltip: action.tooltip,
    }));
});

// Watch for errors and handle them
watch(error, (newError) => {
    if (newError) {
        console.error(
            `Error fetching ${props.config.title.toLowerCase()}:`,
            newError,
        );
    }
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
    selectedItem.value = null;
    Object.assign(formState, props.operations.getFormState());
    isOpen.value = true;
}

function openViewModal(item: T) {
    selectedItem.value = item;
    Object.assign(viewState, props.operations.getFormState(item));
    isViewModal.value = true;
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

function handleEditFromView() {
    isViewModal.value = false;
    // The formState should already be populated from openViewModal
    Object.assign(formState, viewState);
    isOpen.value = true;
}

async function handleRefetch() {
    rotationRefetch.value += 360;
    try {
        await refetch();
    } catch (error) {
        console.error(
            `Error refetching ${props.config.title.toLowerCase()}:`,
            error,
        );
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
            fetch: () => refetch(),
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
            fetch: () => refetch(),
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
            fetch: () => refetch(),
            modal: isOpen,
            mutation: upsertMutation,
        },
    );
}

// Expose helper function for parent components
defineExpose({
    openAddModal,
    openEditModal,
    openViewModal,
    refetch: handleRefetch,
    resolveDynamicValue,
});
</script>
