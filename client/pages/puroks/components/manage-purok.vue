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
import type { Purok } from "~/types/codegen/graphql";

import { puroksPaginate, upsertPurok, deletePurok } from "~/graphql/Purok";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

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
const formSchema = computed(() => schema());
const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<Purok>(
    {
        delete: deletePurok,
        paginate: puroksPaginate,
        upsert: upsertPurok,
    },
    {
        getFormState: (purok?: Purok) => {
            console.log(purok);
            if (purok) {
                return {
                    id: purok.id,
                    name: purok.name,
                };
            } else {
                return {
                    id: undefined,
                    name: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedPurok?: Purok) => {
            return {
                ...data,
                id: selectedPurok?.id || undefined,
            };
        },
    },
);
</script>
