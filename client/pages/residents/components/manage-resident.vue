<template>
    <CrudTable
        :table-data="tableData"
        :option-loading="loadingOptions"
        :actions="customActions"
    />
</template>

<script setup lang="ts">
import type { TableAction } from "~/components/table/types";
import type { Household, Resident } from "~/types/codegen/graphql";

import { barangaysPaginate } from "~/graphql/Barangay";
import { householdsPaginate } from "~/graphql/Household";
import { puroksPaginate } from "~/graphql/Purok";
import {
    residentsPaginate,
    deleteResident,
    upsertResident,
} from "~/graphql/Resident";
import { formatDateTimeForGraphQL } from "~/utils/helpers";

import { columns, filters } from "../data/columns";
import { schema } from "../data/schema";

const permission = "resident";
const purokSearch = useSearchQueryOptions(puroksPaginate, {
    queryKey: "puroksPaginate",
});
const householdSearch = useSearchQueryOptions(householdsPaginate, {
    mapFn: (item: Household) => ({
        label: `${item.household_no} - ${item.address}`,
        value: item.id,
    }),
    queryKey: "householdsPaginate",
});
const barangaySearch = useSearchQueryOptions(barangaysPaginate, {
    queryKey: "barangaysPaginate",
});
const loadingOptions = computed(
    () =>
        purokSearch.loadingOptions.value ||
        householdSearch.loadingOptions.value ||
        barangaySearch.loadingOptions.value,
);
const formSchema = computed(() =>
    schema({
        barangay: {
            onSearch: barangaySearch.debouncedSearch,
            options: barangaySearch.queryOptions,
        },
        household: {
            onSearch: householdSearch.debouncedSearch,
            options: householdSearch.queryOptions,
        },
        purok: {
            onSearch: purokSearch.debouncedSearch,
            options: purokSearch.queryOptions,
        },
    }),
);
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Resident>(
    {
        icon: "solar:users-group-two-rounded-broken",
        permissions: {
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            updateStatus: "update user status",
            view: `view ${permission}`,
        },
        singular: "Resident",
        title: "Residents",
    },
    {
        delete: deleteResident,
        paginate: residentsPaginate,
        upsert: upsertResident,
    },
    {
        columns,
        filters,
        formSchema: formSchema.value,
        getFormState: (row?: Resident) => {
            purokSearch.initializeOptions();
            householdSearch.initializeOptions();
            return row
                ? {
                      barangay: row.barangay?.id,
                      birthdate: row.birthdate,
                      citizenship: row.citizenship,
                      civil_status: row.civil_status,
                      email: row.email || "",
                      first_name: row.first_name,
                      gender: row.gender || "",
                      household: row.household?.id,
                      id: row.id,
                      last_name: row.last_name,
                      middle_name: row.middle_name || "",
                      phone: row.phone || "",
                      purok: row.purok?.id,
                      suffix: row.suffix || "",
                  }
                : {
                      barangay: [],
                      birthdate: "",
                      citizenship: "",
                      civil_status: "",
                      email: "",
                      first_name: "",
                      gender: "",
                      household: [],
                      id: undefined,
                      last_name: "",
                      middle_name: "",
                      phone: "",
                      purok: [],
                      suffix: "",
                  };
        },
        prepareSubmitData: (data, selectedRow?: Resident) => {
            return {
                ...data,
                barangay: {
                    connect: data.barangay,
                },
                birthdate: data.birthdate
                    ? formatDateTimeForGraphQL(String(data.birthdate))
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
        zodSchema: zodSchema.value,
    },
);

// Custom actions
const customActions: TableAction[] = [
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
