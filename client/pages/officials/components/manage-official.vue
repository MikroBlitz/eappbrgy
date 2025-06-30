<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="filter"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
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

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const permission = "official";
const crudConfig = useCrudConfig(
    "Officials", // title
    "Official", // subtitle
    "solar:crown-star-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);

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
const operations = useCrudOperations<Official>(
    {
        delete: deleteOfficial,
        paginate: officialsPaginate,
        upsert: upsertOfficial,
    },
    {
        getFormState: (row?: Official) => {
            if (row) {
                residentSearch.initializeOptions();
                return {
                    id: row.id,
                    position: row.position,
                    resident: row.resident?.id,
                    term_end: row.term_end || null,
                    term_start: row.term_start,
                };
            } else {
                residentSearch.initializeOptions();
                return {
                    id: undefined,
                    position: "",
                    resident: "",
                    term_end: "",
                    term_start: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Official) => {
            console.log(data);
            return {
                ...data,
                id: selectedRow?.id || undefined,
                resident: {
                    connect: data.resident,
                },
                term_end: data.term_end
                    ? formatDateTimeForGraphQL(data.term_end)
                    : null,
                term_start: data.term_start
                    ? formatDateTimeForGraphQL(data.term_start)
                    : null,
            };
        },
    },
);
</script>
