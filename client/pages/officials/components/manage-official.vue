<template>
    <CrudTable
        :table-data="tableData"
        :option-loading="residentSearch.loadingOptions"
    />
</template>

<script setup lang="ts">
import type { Official } from "~/types/codegen/graphql";

import {
    deleteOfficial,
    officialsPaginate,
    upsertOfficial,
} from "~/graphql/Official";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const permission = "official";
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

const tableData = useTableData<Official>(
    {
        icon: "solar:crown-star-broken",
        permissions: {
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            view: `view ${permission}`,
        },
        singular: "Official",
        title: "Officials",
    },
    {
        delete: deleteOfficial,
        paginate: officialsPaginate,
        upsert: upsertOfficial,
    },
    {
        columns,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Official) => {
            residentSearch.initializeOptions();
            return row
                ? {
                      id: row.id,
                      position: row.position,
                      resident: row.resident?.id,
                      term_end: row.term_end || null,
                      term_start: row.term_start,
                  }
                : {
                      id: undefined,
                      position: "",
                      resident: "",
                      term_end: "",
                      term_start: "",
                  };
        },
        prepareSubmitData: (data, selectedRow?: Official) => {
            return {
                ...data,
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
