<template>
    <CrudTable
        :table-data="tableData"
        :option-loading="residentSearch.loadingOptions"
    />
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

const permission = "barangay";
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
        permissions: {
            // permissions
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            view: `view ${permission}`,
        },
        singular: "Barangay",
        title: "Barangays",
    },
    {
        delete: deleteBarangay,
        paginate: barangaysPaginate,
        upsert: upsertBarangay,
    },
    {
        columns,
        filters,
        formSchema: formSchema.value,
        getFormState: (brgy?: Barangay) => {
            if (brgy) {
                residentSearch.initializeOptions();
                return {
                    id: brgy.id,
                    name: brgy.name,
                    official: brgy.official,
                    population: brgy.population,
                };
            } else {
                residentSearch.initializeOptions();
                return {
                    id: undefined,
                    name: "",
                    official: null,
                    population: 0,
                };
            }
        },
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
