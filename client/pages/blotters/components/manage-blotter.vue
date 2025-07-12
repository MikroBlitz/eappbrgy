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
            :on-confirm="handleOtpConfirm"
            :loading="otpLoading"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { TableAction } from "~/components/table/types";
import type { Blotter } from "~/types/codegen/graphql";

import { requestOtp, verifyOtp } from "~/graphql/Auth";
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
const auth = useAuthStore();
const currentUserId = auth.user?.id;

const selectedRow = ref();
const selectedStatus = ref("");
const isConfirmModal = ref(false);
const isOtpModal = ref(false);
const modalLoading = ref(false);
const otpLoading = ref(false);
const sessionKey = ref("");

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
    modalLoading.value = true;

    try {
        const { mutate: requestOtpMutate } = useMutation(requestOtp);
        sessionKey.value = `otp:session:${currentUserId}`;

        const { data } = (await requestOtpMutate({
            sessionKey: sessionKey.value,
            userId: currentUserId,
        })) as {
            data: {
                requestOtp: {
                    status: boolean;
                    remarks?: string;
                    error?: string;
                    expiry?: number;
                };
            };
        };

        if (data?.requestOtp?.status) {
            isConfirmModal.value = false;
            await nextTick();
            isOtpModal.value = true;
            toast.add({
                color: "green",
                icon: "solar:mailbox-broken",
                title: "OTP sent to your email.",
            });
        } else {
            throw new Error(data?.requestOtp?.error || "OTP request failed");
        }
    } catch (e: any) {
        console.error("OTP request error:", e);
        toast.add({
            color: "red",
            icon: "solar:mailbox-broken",
            title: e?.message || "Failed to send OTP. Please try again.",
        });
        isConfirmModal.value = true;
    } finally {
        modalLoading.value = false;
    }
}

async function handleOtpConfirm(rawOtp: string) {
    if (!rawOtp) {
        console.error("Missing OTP");
        return;
    }
    otpLoading.value = true;

    try {
        const config = useRuntimeConfig();
        const secret = config.public.OTP_SECRET_KEY;
        const hashedOtp = await hmacSHA256(rawOtp, secret);

        const { mutate: verifyOtpMutate } = useMutation(verifyOtp);
        const verifyResponse = await verifyOtpMutate({
            otp: hashedOtp,
            sessionKey: sessionKey.value,
            userId: currentUserId,
        });

        const verification = verifyResponse?.data?.verifyOtp;

        if (!verification?.status) {
            toast.add({
                color: "red",
                icon: "solar:mailbox-broken",
                title: verification?.error || "Invalid OTP",
            });
            return;
        }

        const { mutate: upsertBlotterMutate } = useMutation(upsertBlotter);
        await upsertBlotterMutate({
            input: {
                id: selectedRow.value.id,
                status: selectedStatus.value,
            },
        });

        toast.add({
            color: "green",
            icon: "solar:check-circle-broken",
            title: `Status has been updated to ${selectedStatus.value}`,
        });

        isOtpModal.value = false;
    } catch (error) {
        console.error("OTP verification/update error:", error);
        toast.add({
            color: "red",
            icon: "solar:mailbox-broken",
            title: "OTP verified, but status update failed.",
        });
    } finally {
        otpLoading.value = false;
    }
}
</script>
