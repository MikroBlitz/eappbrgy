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

        <ModalOtp
            v-model:is-open="isOtpModal"
            :user-id="currentUserId"
            session-prefix="otp:blotter"
            title="Confirm OTP"
            description="A verification code has been sent to your email"
            icon="solar:shield-check-broken"
            :on-verified="updateBlotterStatus"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { TableAction } from "~/components/table/types";
import type { Blotter } from "~/types/codegen/graphql";

import {
    upsertBlotter,
    blottersPaginate,
    deleteBlotter,
} from "~/graphql/Blotter";
import { residentsPaginate } from "~/graphql/Resident";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();
const auth = useAuthStore();
const currentUserId = auth.user?.id;

const selectedRow = ref<Blotter | null>(null);
const selectedStatus = ref("");
const isConfirmModal = ref(false);
const isOtpModal = ref(false);
const modalLoading = ref(false);

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
        prepareSubmitData: (data: any, row?: Blotter) => ({
            ...data,
            complainant: { connect: data.complainant },
            id: row?.id,
            incident_date: data.incident_date
                ? formatDateTimeForGraphQL(data.incident_date)
                : null,
            respondent: { connect: data.respondent },
        }),
    },
);

const customActions: TableAction[] = [
    {
        color: () => "blue",
        condition: () => true,
        icon: () => "solar:file-broken",
        onClick: (row: Blotter) => openOtpWith(row, "open"),
        tooltip: () => "Open this blotter",
    },
    {
        color: () => "emerald",
        condition: () => true,
        icon: () => "solar:file-check-broken",
        onClick: (row: Blotter) => openOtpWith(row, "resolved"),
        tooltip: () => "Resolve this blotter",
    },
    {
        color: () => "red",
        condition: () => true,
        icon: () => "solar:file-remove-broken",
        onClick: (row: Blotter) => openOtpWith(row, "dismissed"),
        tooltip: () => "Dismiss this blotter",
    },
];

function openOtpWith(row: Blotter, status: string) {
    selectedRow.value = row;
    selectedStatus.value = status;
    isConfirmModal.value = true;
}

async function confirmUpdateStatus() {
    isConfirmModal.value = false;
    await nextTick();
    isOtpModal.value = true;
}

async function updateBlotterStatus() {
    if (!selectedRow.value || !selectedStatus.value) return;

    try {
        const { mutate } = useMutation(upsertBlotter);
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
        isOtpModal.value = false;
    }
}
</script>
