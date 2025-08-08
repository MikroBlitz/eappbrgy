<template>
    <CrudTable ref="crudTableRef" :table-data="tableData" />
</template>

<script setup lang="ts">
import type { Attendance } from "~/types/codegen/graphql";

import {
    attendancePaginate,
    deleteAttendance,
    upsertAttendance,
} from "~/graphql/Attendance";
import { usersPaginate } from "~/graphql/User";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

defineExpose({ refetch: () => crudTableRef.value?.refetch?.() });
const crudTableRef = ref();

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

function condition() {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0); // 12:00 AM

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 0); // 11:59:59 PM

    return {
        column: "CREATED_AT",
        operator: "BETWEEN",
        value: [
            formatDateTimeForGraphQL(startOfDay),
            formatDateTimeForGraphQL(endOfDay),
        ],
    };
}
</script>
