<template>
    <CrudTable
        :table-data="tableData"
        :option-loading="purokSearch.loadingOptions"
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

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const permission = "household";
const purokSearch = useSearchQueryOptions(puroksPaginate, {
    queryKey: "puroksPaginate",
});
const formSchema = computed(() =>
    schema({
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
        filters,
        formSchema: formSchema.value,
        getFormState: (household?: Household) => {
            if (household) {
                purokSearch.initializeOptions();
                return {
                    address: household.address,
                    household_no: household.household_no,
                    id: household.id,
                    purok: household.purok,
                };
            } else {
                purokSearch.initializeOptions();
                return {
                    address: "",
                    household_no: "",
                    id: undefined,
                    purok: null,
                };
            }
        },
        prepareSubmitData: (data, selectedRow?: Household) => {
            return {
                ...data,
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
