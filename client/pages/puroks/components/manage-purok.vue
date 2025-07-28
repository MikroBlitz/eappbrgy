<template>
    <CrudTable :table-data="tableData" />
</template>

<script setup lang="ts">
import type { Purok } from "~/types/codegen/graphql";

import { puroksPaginate, upsertPurok, deletePurok } from "~/graphql/Purok";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const permission = "purok";
const formSchema = computed(() => schema());
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Purok>(
    {
        icon: "solar:home-angle-broken",
        permissions: {
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            view: `view ${permission}`,
        },
        singular: "Purok",
        title: "Puroks",
    },
    {
        delete: deletePurok,
        paginate: puroksPaginate,
        upsert: upsertPurok,
    },
    {
        columns,
        defaultViewModal: false,
        filters,
        formSchema: formSchema.value,
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
        prepareSubmitData: (data, selectedPurok?: Purok) => {
            return {
                ...data,
                id: selectedPurok?.id || undefined,
            };
        },
        zodSchema: zodSchema.value,
    },
);
</script>
