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
import type { Household } from "~/types/codegen/graphql";

import {
    householdsPaginate,
    upsertHousehold,
    deleteHousehold,
} from "~/graphql/Household";
import { puroksPaginate } from "~/graphql/Purok";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const { debouncedSearch, initializeOptions, loadingOptions, queryOptions } =
    useSearchQueryOptions(puroksPaginate, {
        mapFn: (map: { name: string; id: string }) => ({
            label: map.name,
            value: map.id,
        }),
        pageSize: 50,
        queryKey: "puroksPaginate",
    });

const permission = "household";
const crudConfig = useCrudConfig(
    "Households", // title
    "Household", // subtitle
    "solar:home-broken", // icon
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

const operations = useCrudOperations<Household>(
    {
        delete: deleteHousehold,
        paginate: householdsPaginate,
        upsert: upsertHousehold,
    },
    {
        getFormState: (household?: Household) => {
            if (household) {
                initializeOptions();
                return {
                    address: household.address,
                    household_no: household.household_no,
                    id: household.id,
                    purok: household.purok,
                };
            } else {
                initializeOptions();
                return {
                    address: "",
                    household_no: "",
                    id: undefined,
                    purok: null,
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Household) => {
            console.log(data);
            return {
                ...data,
                id: selectedRow?.id || undefined,
                purok: {
                    connect: data.purok,
                },
            };
        },
    },
);
</script>
