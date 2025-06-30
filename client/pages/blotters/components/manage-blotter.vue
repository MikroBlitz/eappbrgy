<template>
    <div>
        <CrudTable
            :config="crudConfig"
            :columns="columns"
            :filters="filter"
            :form-schema="formSchema"
            :zod-schema="zodSchema"
            :operations="operations"
            :option-loading="loadingOptions"
            :actions="customActions"
        />

        <ModalConfirm
            v-model:is-open="isConfirmModal"
            :loading="modalLoading"
            label="Update"
            :description="`Confirm blotter's status to ${selectedStatus}?`"
            icon="i-heroicons-exclamation-triangle"
            :action="confirmUpdateStatus"
            color="blue"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { TableAction } from "~/components/table/types";
import type { Blotter } from "~/types/codegen/graphql";

import {
    blottersPaginate,
    deleteBlotter,
    upsertBlotter,
} from "~/graphql/Blotter";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();
const permission = "blotter";
const crudConfig = useCrudConfig(
    "Blotters", // title
    "Blotter", // subtitle
    "solar:document-add-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);

// query for combo box
function createResidentSearchHandler() {
    return useSearchQueryOptions(residentsPaginate, {
        queryKey: "residentsPaginate",
    });
}
const complainantSearch = createResidentSearchHandler();
const respondentSearch = createResidentSearchHandler();
const loadingOptions = computed(
    () =>
        complainantSearch.loadingOptions.value ||
        respondentSearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        complainant: {
            onSearch: complainantSearch.debouncedSearch,
            options: complainantSearch.queryOptions,
        },
        respondent: {
            onSearch: respondentSearch.debouncedSearch,
            options: respondentSearch.queryOptions,
        },
    }),
);

const zodSchema = computed(() => formZodSchema(formSchema.value));
const operations = useCrudOperations<Blotter>(
    {
        delete: deleteBlotter,
        paginate: blottersPaginate,
        upsert: upsertBlotter,
    },
    {
        getFormState: (row?: Blotter) => {
            if (row) {
                complainantSearch.initializeOptions();
                respondentSearch.initializeOptions();
                return {
                    case_no: row.case_no,
                    complainant: row.complainant?.id,
                    complaint: row.complaint,
                    details: row.details,
                    id: row.id,
                    incident_date: row.incident_date,
                    respondent: row.respondent?.id,
                    status: row.status,
                };
            } else {
                complainantSearch.initializeOptions();
                respondentSearch.initializeOptions();
                return {
                    case_no: "",
                    complainant: null,
                    complaint: "",
                    details: "",
                    id: undefined,
                    incident_date: "",
                    respondent: null,
                    status: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Blotter) => {
            console.log(data);
            return {
                ...data,
                complainant: {
                    connect: data.complainant,
                },
                id: selectedRow?.id || undefined,
                incident_date: data.incident_date
                    ? formatDateTimeForGraphQL(data.incident_date)
                    : null,
                respondent: {
                    connect: data.respondent,
                },
            };
        },
    },
);

const selectedRow = ref();
const selectedStatus = ref("");
const isConfirmModal = ref(false);
const modalLoading = ref(false);

const customActions: TableAction[] = [
    {
        color: () => "blue",
        condition: () => true,
        icon: () => "solar:file-broken",
        onClick: (row: Blotter) => {
            selectedRow.value = row;
            selectedStatus.value = "open";
            isConfirmModal.value = true;
        },
        tooltip: () => "Open this blotter",
    },
    {
        color: () => "emerald",
        condition: () => true,
        icon: () => "solar:file-check-broken",
        onClick: (row: Blotter) => {
            selectedRow.value = row;
            selectedStatus.value = "resolved";
            isConfirmModal.value = true;
        },
        tooltip: () => "Resolve this blotter",
    },
    {
        color: () => "red",
        condition: () => true,
        icon: () => "solar:file-remove-broken",
        onClick: (row: Blotter) => {
            selectedRow.value = row;
            selectedStatus.value = "dismissed";
            isConfirmModal.value = true;
        },
        tooltip: () => "Dismiss this blotter",
    },
];

async function confirmUpdateStatus() {
    const { mutate } = useMutation(upsertBlotter);
    if (!selectedRow.value || !selectedStatus.value) return;
    if (selectedRow.value.status === selectedStatus.value) {
        isConfirmModal.value = false;
        toast.add({
            color: "yellow",
            icon: "i-mdi-information-outline",
            title: "Status is already set — no changes made.",
        });
        return;
    }

    modalLoading.value = true;
    try {
        await mutate({
            input: {
                id: selectedRow.value.id,
                status: selectedStatus.value,
            },
        });
        isConfirmModal.value = false;
        toast.add({
            color: "green",
            icon: "i-mdi-check-circle-outline",
            title: `Status has been updated to ${selectedStatus.value}`,
        });
    } catch (error) {
        console.error(error);
        toast.add({
            color: "red",
            icon: "i-mdi-alert-circle-outline",
            title: "Something went wrong, please try again.",
        });
    } finally {
        modalLoading.value = false;
    }
}
</script>
