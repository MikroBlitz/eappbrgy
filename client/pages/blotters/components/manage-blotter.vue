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
import type { Blotter } from "~/types/codegen/graphql";

import {
    blottersPaginate,
    deleteBlotter,
    upsertBlotter,
} from "~/graphql/Blotter";
import { residentsPaginate } from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const permission = "blotter";
const crudConfig = useCrudConfig(
    "Blotters", // title
    "Blotter", // subtitle
    "solar:document-add-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);

// query for combo box
function createResidentSearchHandler() {
    return useSearchQueryOptions(residentsPaginate, {
        queryKey: "residentsPaginate",
    });
}
const complainantSearch = createResidentSearchHandler();
const respondentSearch = createResidentSearchHandler();
const loadingOptions = computed(
    () =>
        complainantSearch.loadingOptions.value ||
        respondentSearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        complainant: {
            onSearch: complainantSearch.debouncedSearch,
            options: complainantSearch.queryOptions,
        },
        respondent: {
            onSearch: respondentSearch.debouncedSearch,
            options: respondentSearch.queryOptions,
        },
    }),
);

const zodSchema = computed(() => formZodSchema(formSchema.value));
const operations = useCrudOperations<Blotter>(
    {
        delete: deleteBlotter,
        paginate: blottersPaginate,
        upsert: upsertBlotter,
    },
    {
        getFormState: (row?: Blotter) => {
            if (row) {
                complainantSearch.initializeOptions();
                respondentSearch.initializeOptions();
                return {
                    case_no: row.case_no,
                    complainant: row.complainant?.id,
                    complaint: row.complaint,
                    details: row.details,
                    id: row.id,
                    incident_date: row.incident_date,
                    respondent: row.respondent?.id,
                    status: row.status,
                };
            } else {
                complainantSearch.initializeOptions();
                respondentSearch.initializeOptions();
                return {
                    case_no: "",
                    complainant: null,
                    complaint: "",
                    details: "",
                    id: undefined,
                    incident_date: "",
                    respondent: null,
                    status: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Blotter) => {
            console.log(data);
            return {
                ...data,
                complainant: {
                    connect: data.complainant,
                },
                id: selectedRow?.id || undefined,
                incident_date: data.incident_date
                    ? formatDateTimeForGraphQL(data.incident_date)
                    : null,
                respondent: {
                    connect: data.respondent,
                },
            };
        },
    },
);
</script>
