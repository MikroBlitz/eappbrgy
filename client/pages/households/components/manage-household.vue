<template>
    <CrudTable :table-data="tableData" />
</template>

<script setup lang="ts">
import type { Household } from "~/types/codegen/graphql";

import { barangaysPaginate } from "~/graphql/Barangay";
import {
    householdsPaginate,
    upsertHousehold,
    deleteHousehold,
} from "~/graphql/Household";
import { puroksPaginate } from "~/graphql/Purok";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const permission = "household";
const barangaySearch = useSearchQueryOptions(barangaysPaginate, {
    queryKey: "barangaysPaginate",
});
const purokSearch = useSearchQueryOptions(puroksPaginate, {
    queryKey: "puroksPaginate",
});
const optionLoading = computed(
    () =>
        purokSearch.loadingOptions.value || barangaySearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        barangay: {
            onSearch: barangaySearch.debouncedSearch,
            options: barangaySearch.queryOptions,
        },
        purok: {
            onSearch: purokSearch.debouncedSearch,
            options: purokSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Household>(
    {
        icon: "solar:home-broken",
        permissions: {
            // permissions
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            view: `view ${permission}`,
        },
        singular: "Household",
        title: "Households",
    },
    {
        delete: deleteHousehold,
        paginate: householdsPaginate,
        upsert: upsertHousehold,
    },
    {
        columns,
        defaultViewModal: true,
        filters,
        formSchema: formSchema.value,
        getFormState: (household?: Household) => {
            if (household) {
                purokSearch.initializeOptions();
                return {
                    address: household.address,
                    barangay: household.barangay?.id,
                    household_no: household.household_no,
                    id: household.id,
                    purok: household.purok,
                };
            } else {
                purokSearch.initializeOptions();
                return {
                    address: "",
                    barangay: [],
                    household_no: "",
                    id: undefined,
                    purok: null,
                };
            }
        },
        optionLoading,
        prepareSubmitData: (data, selectedRow?: Household) => {
            return {
                ...data,
                barangay: {
                    connect: data.barangay,
                },
                id: selectedRow?.id || undefined,
                purok: {
                    connect: data.purok,
                },
            };
        },
        zodSchema: zodSchema.value,
    },
);
</script>
