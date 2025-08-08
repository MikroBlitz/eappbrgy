<template>
    <CrudTable :table-data="tableData" />
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import type { Attendance } from "~/types/codegen/graphql";

import {
    attendancePaginate,
    deleteAttendance,
    upsertAttendance,
} from "~/graphql/Attendance";
import { usersPaginate } from "~/graphql/User";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const toast = useToast();
const auth = useAuthStore();
const selectedRow = ref<Attendance | null>(null);
const selectedStatus = ref("");
const isConfirmModal = ref(false);

const createUserSearchHandler = () =>
    useSearchQueryOptions(usersPaginate, {
        queryKey: "usersPaginate",
    });
const userSearch = createUserSearchHandler();
const formSchema = computed(() =>
    schema({
        user: {
            onSearch: userSearch.debouncedSearch,
            options: userSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Attendance>(
    {
        icon: "solar:document-add-broken",
        permission: "attendance",
        title: "Attendance",
    },
    {
        delete: deleteAttendance,
        paginate: attendancePaginate,
        upsert: upsertAttendance,
    },
    {
        columns,
        customActions: [
            {
                color: () => "blue",
                condition: () => auth.can("open blotter"),
                icon: () => "solar:file-broken",
                onClick: (row: Attendance) => openOtpWith(row, "open"),
                tooltip: () => "Open this blotter",
            },
            {
                color: () => "emerald",
                condition: () => auth.can("resolve blotter"),
                icon: () => "solar:file-check-broken",
                onClick: (row: Attendance) => openOtpWith(row, "resolved"),
                tooltip: () => "Resolve this blotter",
            },
            {
                color: () => "red",
                condition: () => auth.can("dismiss blotter"),
                icon: () => "solar:file-remove-broken",
                onClick: (row: Attendance) => openOtpWith(row, "dismissed"),
                tooltip: () => "Dismiss this blotter",
            },
        ],
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Attendance) => {
            userSearch.initializeOptions();
            return row
                ? {
                      am_time_in: row.am_time_in || "",
                      am_time_out: row.am_time_out || "",
                      date: row.date,
                      id: row.id,
                      pm_time_in: row.pm_time_in || "",
                      pm_time_out: row.pm_time_out || "",
                      user: row.user?.id,
                  }
                : {
                      am_time_in: "",
                      am_time_out: "",
                      date: "",
                      id: undefined,
                      pm_time_in: "",
                      pm_time_out: "",
                      user: null,
                  };
        },
        optionLoading: userSearch.loadingOptions,
        prepareSubmitData: (data, row?: Attendance) => ({
            ...data,
            am_time_in: data.am_time_in
                ? formatDateTimeForGraphQL(String(data.am_time_in))
                : null,
            am_time_out: data.am_time_out
                ? formatDateTimeForGraphQL(String(data.am_time_out))
                : null,
            date: data.date
                ? formatDateTimeForGraphQL(String(data.date))
                : null,
            id: row?.id,
            pm_time_in: data.pm_time_in
                ? formatDateTimeForGraphQL(String(data.pm_time_in))
                : null,
            pm_time_out: data.pm_time_out
                ? formatDateTimeForGraphQL(String(data.pm_time_out))
                : null,
            user: { connect: data.user },
        }),
        whereConditions: condition(),
        zodSchema: zodSchema.value,
    },
);

function openOtpWith(row: Attendance, status: string) {
    selectedRow.value = row;
    selectedStatus.value = status;
    isConfirmModal.value = true;
}

function condition() {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    return {
        column: "CREATED_AT",
        operator: "BETWEEN",
        value: [
            startOfDay.toISOString().slice(0, 19).replace("T", " "),
            endOfDay.toISOString().slice(0, 19).replace("T", " "),
        ],
    };
}
</script>
