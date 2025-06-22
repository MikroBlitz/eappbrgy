<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="filter"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
    />
</template>

<script setup lang="ts">
import type { Household } from "~/types/codegen/graphql";

import {
    householdsPaginate,
    upsertHousehold,
    deleteHousehold,
} from "~/graphql/Household";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

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
const formSchema = computed(() => schema());
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
                return {
                    address: household.address,
                    household_no: household.household_no,
                    id: household.id || "",
                    purok: household.purok,
                };
            } else {
                return {
                    address: "",
                    household_no: "",
                    id: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Household) => {
            return {
                ...data,
                id: selectedRow?.id || undefined,
            };
        },
    },
);
</script>
