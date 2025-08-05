<template>
    <CrudTable :table-data="tableData" />
</template>

<script setup lang="ts">
import type { Barangay } from "~/types/codegen/graphql";

import {
    barangaysPaginate,
    deleteBarangay,
    upsertBarangay,
} from "~/graphql/Barangay";
import { officialsPaginate } from "~/graphql/Official";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const residentSearch = useSearchQueryOptions(officialsPaginate, {
    mapFn: (item) => ({
        label: `${item.position}: ${item.resident.name}`,
        value: item.id,
    }),
    queryKey: "officialsPaginate",
});
const formSchema = computed(() =>
    schema({
        official: {
            onSearch: residentSearch.debouncedSearch,
            options: residentSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Barangay>(
    {
        icon: "solar:home-broken",
        permission: "barangay",
        title: "Barangays",
    },
    {
        delete: deleteBarangay,
        paginate: barangaysPaginate,
        upsert: upsertBarangay,
    },
    {
        columns,
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Barangay) => {
            residentSearch.initializeOptions();
            return row
                ? {
                      id: row.id,
                      name: row.name,
                      official: row.official,
                      population: row.population,
                  }
                : {
                      id: undefined,
                      name: "",
                      official: null,
                      population: 0,
                  };
        },
        optionLoading: residentSearch.loadingOptions,
        prepareSubmitData: (data, selectedRow?: Barangay) => {
            return {
                ...data,
                id: selectedRow?.id || undefined,
                official: {
                    connect: data.official || "",
                },
            };
        },
        zodSchema: zodSchema.value,
    },
);
</script>
