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

const crudConfig = useCrudConfig(
    "Puroks", // title
    "Purok", // subtitle
    "solar:home-angle-broken", // icon
    {
        // permissions
        create: "create purok",
        delete: "delete purok",
        edit: "edit purok",
        view: "view purok",
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
            if (purok) {
                return {
                    id: purok.id || "",
                    name: purok.name,
                };
            } else {
                return {
                    id: "",
                    name: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedPermission?: Purok) => {
            return {
                ...data,
                id: selectedPermission?.id || undefined,
            };
        },
    },
);
</script>
