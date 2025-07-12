<template>
    <div>
        <CrudTable
            :config="crudConfig"
            :columns="columns"
            :filters="filter"
            :form-schema="formSchema"
            :zod-schema="zodSchema"
            :operations="operations"
            :option-loading="residentSearch.loadingOptions"
            :actions="customActions"
        />

        <ModalConfirm
            v-model:is-open="isConfirmModal"
            :loading="modalLoading"
            label="Update"
            :description="`Confirm blotter's status to ${selectedStatus}?`"
            icon="i-heroicons-exclamation-triangle"
            :action="updatePermitStatus"
            color="blue"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { TableAction } from "~/components/table/types";
import type { Permit } from "~/types/codegen/graphql";

import { deletePermit, permitsPaginate, upsertPermit } from "~/graphql/Permit";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();

const selectedRow = ref<Permit | null>(null);
const selectedStatus = ref("");
const isConfirmModal = ref(false);
const modalLoading = ref(false);

const permission = "permit";
const crudConfig = useCrudConfig(
    "Permits", // title
    "Permit", // subtitle
    "solar:documents-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);

const residentSearch = useSearchQueryOptions(residentsPaginate, {
    queryKey: "residentsPaginate",
});
const formSchema = computed(() =>
    schema({
        resident: {
            onSearch: residentSearch.debouncedSearch,
            options: residentSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));
const operations = useCrudOperations<Permit>(
    {
        delete: deletePermit,
        paginate: permitsPaginate,
        upsert: upsertPermit,
    },
    {
        getFormState: (row?: Permit) => {
            if (row) {
                residentSearch.initializeOptions();
                return {
                    id: row.id,
                    issued_at: row.issued_at,
                    resident: row.resident?.id,
                    status: row.status,
                    type: row.type,
                    valid_until: row.valid_until,
                };
            } else {
                residentSearch.initializeOptions();
                return {
                    id: undefined,
                    issued_at: "",
                    resident: "",
                    status: "",
                    type: "",
                    valid_until: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Permit) => {
            console.log(data);
            return {
                ...data,
                id: selectedRow?.id || undefined,
                issued_at: data.issued_at
                    ? formatDateTimeForGraphQL(data.issued_at)
                    : null,
                resident: {
                    connect: data.resident,
                },
                valid_until: data.valid_until
                    ? formatDateTimeForGraphQL(data.valid_until)
                    : null,
            };
        },
    },
);

const customActions: TableAction[] = [
    {
        color: () => "orange",
        condition: () => true,
        icon: () => "solar:file-remove-broken",
        onClick: (row: Permit) => confirmUpdateStatus(row, "revoked"),
        tooltip: () => "Revoke this permit",
    },
];

function confirmUpdateStatus(row: Permit, status: string) {
    selectedRow.value = row;
    selectedStatus.value = status;
    isConfirmModal.value = true;
}

async function updatePermitStatus() {
    if (!selectedRow.value || !selectedStatus.value) return;

    try {
        const { mutate } = useMutation(upsertPermit);
        await mutate({
            input: {
                id: selectedRow.value.id,
                status: selectedStatus.value,
            },
        });
        toast.add({
            color: "green",
            icon: "solar:check-circle-broken",
            title: `Status updated to ${selectedStatus.value}`,
        });
    } catch (e) {
        toast.add({
            color: "red",
            icon: "solar:close-circle-broken",
            title: "Failed to update status.",
        });
        console.error(e);
    } finally {
        isConfirmModal.value = false;
    }
}
</script>
