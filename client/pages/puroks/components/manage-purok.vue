<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="filter"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="loadingOptions"
    />
</template>

<script setup lang="ts">
import type { Purok } from "~/types/codegen/graphql";

import { householdsPaginate } from "~/graphql/Household";
import { puroksPaginate, upsertPurok, deletePurok } from "~/graphql/Purok";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

// Purok Search Option
const { debouncedSearch, initializeOptions, loadingOptions, queryOptions } =
    useSearchQueryOptions(householdsPaginate, {
        mapFn: (map: { address: string; id: string }) => ({
            label: map.address,
            value: map.id,
        }),
        pageSize: 50,
        queryKey: "householdsPaginate",
    });

const permission = "purok";
const crudConfig = useCrudConfig(
    "Puroks", // title
    "Purok", // subtitle
    "solar:home-angle-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);
const formSchema = computed(() => schema(queryOptions, debouncedSearch));
const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<Purok>(
    {
        delete: deletePurok,
        paginate: puroksPaginate,
        upsert: upsertPurok,
    },
    {
        getFormState: (purok?: Purok) => {
            if (purok) {
                const householdIds = purok.households
                    ? purok.households.map((p) => p?.id)
                    : [];
                initializeOptions();
                return {
                    households: householdIds,
                    id: purok.id || "",
                    name: purok.name,
                };
            } else {
                initializeOptions();
                return {
                    households: [],
                    id: "",
                    name: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedPurok?: Purok) => {
            let households: string[] = [];
            if (data.households) {
                households = Array.isArray(data.households)
                    ? data.households
                    : [data.households];
            }
            return {
                ...data,
                households: { sync: households },
                id: selectedPurok?.id || undefined,
            };
        },
    },
);
</script>
