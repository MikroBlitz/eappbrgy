<template>
    <div>
        <CrudTable
            :table-data="tableData"
            :option-loading="residentSearch.loadingOptions"
            :actions="customActions"
        />

        <ModalConfirm
            v-model:is-open="isConfirmModal"
            :loading="modalLoading"
            label="Update"
            :description="`Confirm document's status to ${selectedStatus}?`"
            icon="i-heroicons-exclamation-triangle"
            :action="updateDocumentStatus"
            color="blue"
        />
    </div>
</template>

<script setup lang="ts">
import type { TableAction } from "~/components/table/types";
import type { Document } from "~/types/codegen/graphql";

import {
    deleteDocument,
    documentsPaginate,
    upsertDocument,
} from "~/graphql/Document";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();
const selectedRow = ref<Document | null>(null);
const selectedStatus = ref<string | null>(null);
const isConfirmModal = ref(false);
const modalLoading = ref(false);

// Resident search handler
const residentSearch = useSearchQueryOptions(residentsPaginate, {
    queryKey: "residentsPaginate",
});

// Form schema
const formSchema = computed(() =>
    schema({
        resident: {
            onSearch: residentSearch.debouncedSearch,
            options: residentSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

// Initialize table data
const tableData = useTableData<Document>(
    {
        icon: "solar:documents-broken",
        permissions: {
            create: `create document`,
            delete: `delete document`,
            edit: `edit document`,
            view: `view document`,
        },
        singular: "Document",
        title: "Documents",
    },
    {
        delete: deleteDocument,
        paginate: documentsPaginate,
        upsert: upsertDocument,
    },
    {
        columns,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Document) => {
            residentSearch.initializeOptions();
            return row
                ? {
                      category: row.category,
                      id: row.id,
                      issued_at: row.issued_at,
                      requested_at: row.requested_at,
                      resident: row.resident?.id,
                      status: row.status,
                      type: row.type,
                      valid_until: row.valid_until,
                  }
                : {
                      category: "",
                      id: undefined,
                      issued_at: "",
                      requested_at: "",
                      resident: "",
                      status: "",
                      type: "",
                      valid_until: "",
                  };
        },
        prepareSubmitData: (data, selectedRow?: Document) => ({
            ...data,
            id: selectedRow?.id,
            issued_at: data.issued_at
                ? formatDateTimeForGraphQL(String(data.issued_at))
                : null,
            requested_at: data.requested_at
                ? formatDateTimeForGraphQL(String(data.requested_at))
                : null,
            resident: { connect: data.resident },
            status:
                selectedRow?.status === "revoked"
                    ? "revoked"
                    : !data.valid_until
                      ? undefined
                      : new Date(String(data.valid_until)).getTime() >
                          Date.now()
                        ? data.status
                        : "expired",
            valid_until: data.valid_until
                ? formatDateTimeForGraphQL(String(data.valid_until))
                : null,
        }),
        zodSchema: zodSchema.value,
    },
);

const customActions: TableAction[] = [
    {
        color: () => "green",
        condition: () => true,
        icon: () => "solar:check-square-broken",
        onClick: (row: Document) => confirmUpdateStatus(row, "approved"),
        tooltip: () => "Approve this document",
    },
    {
        color: () => "emerald",
        condition: () => true,
        icon: () => "solar:square-arrow-right-up-broken",
        onClick: (row: Document) => confirmUpdateStatus(row, "released"),
        tooltip: () => "Release this document",
    },
    {
        color: () => "orange",
        condition: () => true,
        icon: () => "solar:close-square-broken",
        onClick: (row: Document) => confirmUpdateStatus(row, "revoked"),
        tooltip: () => "Revoke this document",
    },
];

function confirmUpdateStatus(row: Document, status: string) {
    selectedRow.value = row;
    selectedStatus.value = status;
    isConfirmModal.value = true;
}

async function updateDocumentStatus() {
    if (!selectedRow.value || !selectedStatus.value) return;
    try {
        const { mutate } = useMutation(tableData.upsert);
        await mutate({
            input: {
                id: selectedRow.value.id,
                issued_at:
                    selectedStatus.value === "released"
                        ? formatDateTimeForGraphQL(new Date())
                        : selectedRow.value.issued_at,
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
            title: e.message || "Failed to update status.",
        });
        console.error(e);
    } finally {
        isConfirmModal.value = false;
        selectedStatus.value = null;
    }
}
</script>
