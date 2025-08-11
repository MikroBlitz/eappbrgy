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

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

defineExpose({ refetch: () => crudTableRef.value?.refetch?.() });
const crudTableRef = ref();
const auth = useAuthStore();

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
                      extra_time_in_1: row.extra_time_in_1,
                      extra_time_in_2: row.extra_time_in_2,
                      extra_time_out_1: row.extra_time_out_1,
                      extra_time_out_2: row.extra_time_out_2,
                      id: row.id,
                      pm_time_in: row.pm_time_in || "",
                      pm_time_out: row.pm_time_out || "",
                      user: row.user?.id,
                  }
                : {
                      am_time_in: "",
                      am_time_out: "",
                      date: "",
                      extra_time_in_1: "",
                      extra_time_in_2: "",
                      extra_time_out_1: "",
                      extra_time_out_2: "",
                      id: undefined,
                      pm_time_in: "",
                      pm_time_out: "",
                      user: null,
                  };
        },
        headerActions: auth.is("Admin"),
        optionLoading: userSearch.loadingOptions,
        prepareSubmitData: (data, row?: Attendance) => {
            const datePart = data.date ? new Date(data.date as string) : null;

            return {
                ...data,
                am_time_in: mergeDateAndTime(datePart, data.am_time_in as Date),

                am_time_out: mergeDateAndTime(
                    datePart,
                    data.am_time_out as Date,
                ),
                date: mergeDateAndTime(datePart, "00:00:00"),
                extra_time_in_1: mergeDateAndTime(
                    datePart,
                    data.extra_time_in_1 as Date,
                ),
                extra_time_in_2: mergeDateAndTime(
                    datePart,
                    data.extra_time_in_2 as Date,
                ),

                extra_time_out_1: mergeDateAndTime(
                    datePart,
                    data.extra_time_out_1 as Date,
                ),
                extra_time_out_2: mergeDateAndTime(
                    datePart,
                    data.extra_time_out_2 as Date,
                ),
                id: row?.id,
                pm_time_in: mergeDateAndTime(datePart, data.pm_time_in as Date),
                pm_time_out: mergeDateAndTime(
                    datePart,
                    data.pm_time_out as Date,
                ),
                user: { connect: data.user },
            };
        },
        whereConditions: conditions(
            [
                "view biometric",
                "create biometric",
                "edit biometric",
                "delete biometrics",
            ],
            [
                formatDateTimeForGraphQL(startOfDay),
                formatDateTimeForGraphQL(endOfDay),
            ],
            "DATE",
            "BETWEEN",
        ),
        zodSchema: zodSchema.value,
    },
);
</script>
