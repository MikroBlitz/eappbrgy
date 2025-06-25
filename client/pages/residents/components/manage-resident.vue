<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="filter"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="loadingOptions"
        :actions="customActions"
    />
</template>

<script setup lang="ts">
import type { Household, Resident } from "~/types/codegen/graphql";

import { householdsPaginate } from "~/graphql/Household";
import { puroksPaginate } from "~/graphql/Purok";
import {
    residentsPaginate,
    deleteResident,
    upsertResident,
} from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const permission = "resident";
const crudConfig = useCrudConfig(
    "Residents", // title
    "Resident", // subtitle
    "solar:users-group-two-rounded-broken", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        updateStatus: "update user status",
        view: `view ${permission}`,
    },
);

const purokSearch = useSearchQueryOptions(puroksPaginate, {
    queryKey: "puroksPaginate",
});
const householdSearch = useSearchQueryOptions(householdsPaginate, {
    mapFn: (item: Household) => ({
        label: item.household_no,
        value: item.id,
    }),
    queryKey: "householdsPaginate",
});
const loadingOptions = computed(
    () =>
        purokSearch.loadingOptions.value ||
        householdSearch.loadingOptions.value,
);
const debouncedSearch = computed(
    () => purokSearch.debouncedSearch || householdSearch.debouncedSearch,
);

const formSchema = computed(() =>
    schema({
        householdOptions: householdSearch.queryOptions,
        purokOptions: purokSearch.queryOptions,
        searchOptions: debouncedSearch.value,
    }),
);

const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<Resident>(
    {
        delete: deleteResident,
        paginate: residentsPaginate,
        upsert: upsertResident,
    },
    {
        getFormState: (row?: Resident) => {
            if (row) {
                // This is for editing data
                purokSearch.initializeOptions();
                householdSearch.initializeOptions();
                return {
                    birthdate: row.birthdate || "",
                    citizenship: row.citizenship,
                    civil_status: row.civil_status,
                    email: row.email || "",
                    first_name: row.first_name,
                    gender: row.gender || "",
                    household: row.household || "",
                    id: row.id,
                    last_name: row.last_name,
                    middle_name: row.middle_name || "",
                    phone: row.phone || "",
                    purok: row.purok || "",
                    suffix: row.suffix || "",
                };
            } else {
                // This is adding data
                purokSearch.initializeOptions();
                householdSearch.initializeOptions();
                return {
                    birthdate: "",
                    citizenship: "",
                    civil_status: "",
                    email: "",
                    first_name: "",
                    gender: "",
                    household: "",
                    id: undefined,
                    last_name: "",
                    middle_name: "",
                    phone: "",
                    purok: "",
                    suffix: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedRow?: Resident) => {
            console.log(data);
            return {
                ...data,
                birthdate: data.birthdate
                    ? formatDateTimeForGraphQL(data.birthdate)
                    : null,
                household: {
                    connect: data.household,
                },
                id: selectedRow?.id || undefined,
                purok: {
                    connect: data.purok,
                },
            };
        },
    },
);

// Custom actions
const customActions = [
    {
        color: () => "orange",
        condition: () => true,
        icon: () => "solar:file-download-broken",
        onClick: (row: Resident) => customFunction(row),
        tooltip: (row: Resident) => `Log the Data ${row.name}`,
    },
];
const customFunction = (row: Resident) => {
    console.log("Resident Row Data:", row);
    useToast().add({
        color: "green",
        description: `Row data for ${row.name} logged to console`,
        title: "Custom Action Triggered",
    });
};
</script>
