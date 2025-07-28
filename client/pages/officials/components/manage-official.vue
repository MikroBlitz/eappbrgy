<template>
    <CrudTable :table-data="tableData" />
</template>

<script setup lang="ts">
import type { Official } from "~/types/codegen/graphql";

import { barangaysPaginate } from "~/graphql/Barangay";
import {
    deleteOfficial,
    officialsPaginate,
    upsertOfficial,
} from "~/graphql/Official";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const residentSearch = useSearchQueryOptions(residentsPaginate, {
    queryKey: "residentsPaginate",
});
const barangaySearch = useSearchQueryOptions(barangaysPaginate, {
    queryKey: "barangaysPaginate",
});
const optionLoading = computed(
    () =>
        residentSearch.loadingOptions.value ||
        barangaySearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        barangay: {
            onSearch: barangaySearch.debouncedSearch,
            options: barangaySearch.queryOptions,
        },
        resident: {
            onSearch: residentSearch.debouncedSearch,
            options: residentSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Official>(
    {
        icon: "solar:crown-star-broken",
        permission: "official",
        title: "Officials",
    },
    {
        delete: deleteOfficial,
        paginate: officialsPaginate,
        upsert: upsertOfficial,
    },
    {
        columns,
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Official) => {
            residentSearch.initializeOptions();
            return row
                ? {
                      barangay: row.barangay?.id,
                      id: row.id,
                      position: row.position,
                      resident: row.resident?.id,
                      term_end: row.term_end || null,
                      term_start: row.term_start,
                  }
                : {
                      barangay: "",
                      id: undefined,
                      position: "",
                      resident: "",
                      term_end: "",
                      term_start: "",
                  };
        },
        optionLoading,
        prepareSubmitData: (data, selectedRow?: Official) => {
            return {
                ...data,
                barangay: {
                    connect: data.barangay,
                },
                id: selectedRow?.id || undefined,
                resident: {
                    connect: data.resident,
                },
                term_end: data.term_end
                    ? formatDateTimeForGraphQL(String(data.term_end))
                    : null,
                term_start: data.term_start
                    ? formatDateTimeForGraphQL(String(data.term_start))
                    : null,
            };
        },
        zodSchema: zodSchema.value,
    },
);
</script>
