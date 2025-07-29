<template>
    <div>
        <CrudTable :table-data="tableData" />

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
            :title="`Confirm Blotter to ${toTitleCase(selectedStatus)}`"
            description="A verification code has been sent to your email"
            icon="solar:shield-check-broken"
            :on-verified="updateBlotterStatus"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { Blotter } from "~/types/codegen/graphql";

import { barangaysPaginate } from "~/graphql/Barangay";
import {
    upsertBlotter,
    blottersPaginate,
    deleteBlotter,
} from "~/graphql/Blotter";
import { residentsPaginate } from "~/graphql/Resident";
import { generateCustomId, toTitleCase } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();
const auth = useAuthStore();
const currentUserId = auth.user?.id;
const selectedRow = ref<Blotter | null>(null);
const selectedStatus = ref("");
const isConfirmModal = ref(false);
const isOtpModal = ref(false);
const modalLoading = ref(false);

const createResidentSearchHandler = () =>
    useSearchQueryOptions(residentsPaginate, {
        queryKey: "residentsPaginate",
    });
const barangaySearch = useSearchQueryOptions(barangaysPaginate, {
    queryKey: "barangaysPaginate",
});
const complainantSearch = createResidentSearchHandler();
const respondentSearch = createResidentSearchHandler();
const optionLoading = computed(
    () =>
        complainantSearch.loadingOptions.value ||
        respondentSearch.loadingOptions.value ||
        barangaySearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        barangay: {
            onSearch: barangaySearch.debouncedSearch,
            options: barangaySearch.queryOptions,
        },
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

const tableData = useTableData<Blotter>(
    {
        icon: "solar:document-add-broken",
        permission: "blotter",
        title: "Blotters",
    },
    {
        delete: deleteBlotter,
        paginate: blottersPaginate,
        upsert: upsertBlotter,
    },
    {
        columns,
        customActions: [
            {
                color: () => "blue",
                condition: () => auth.can("open blotter"),
                icon: () => "solar:file-broken",
                onClick: (row: Blotter) => openOtpWith(row, "open"),
                tooltip: () => "Open this blotter",
            },
            {
                color: () => "emerald",
                condition: () => auth.can("resolve blotter"),
                icon: () => "solar:file-check-broken",
                onClick: (row: Blotter) => openOtpWith(row, "resolved"),
                tooltip: () => "Resolve this blotter",
            },
            {
                color: () => "red",
                condition: () => auth.can("dismiss blotter"),
                icon: () => "solar:file-remove-broken",
                onClick: (row: Blotter) => openOtpWith(row, "dismissed"),
                tooltip: () => "Dismiss this blotter",
            },
        ],
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Blotter) => {
            complainantSearch.initializeOptions();
            respondentSearch.initializeOptions();
            return row
                ? {
                      barangay: row.barangay?.id,
                      case_no: row.case_no,
                      complainant: row.complainant?.id,
                      complaint: row.complaint,
                      details: row.details,
                      id: row.id,
                      incident_date: row.incident_date,
                      respondent: row.respondent?.id,
                      status: row.status,
                  }
                : {
                      barangay: [],
                      case_no: "",
                      complainant: null,
                      complaint: "",
                      details: "",
                      id: undefined,
                      incident_date: "",
                      respondent: null,
                      status: "",
                  };
        },
        optionLoading,
        prepareSubmitData: (data, row?: Blotter) => ({
            ...data,
            barangay: {
                connect: data.barangay,
            },
            case_no: row?.case_no || generateCustomId("Case"),
            complainant: { connect: data.complainant },
            id: row?.id,
            incident_date: data.incident_date
                ? formatDateTimeForGraphQL(String(data.incident_date))
                : null,
            respondent: { connect: data.respondent },
        }),
        zodSchema: zodSchema.value,
    },
);

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
        const { mutate } = useMutation(tableData.upsert);
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
