import type { Column } from "~/components/table/types";
import type { Resident } from "~/types/codegen/graphql";

import { getDateOnly, toTitleCase } from "~/utils/helpers";

export const columns: Column[] = [
    {
        class: "w-2",
        key: "select",
    },
    {
        key: "id",
        label: "#",
        sortable: true,
    },
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "suffix",
        label: "Suffix",
        sortable: true,
    },
    {
        key: "gender",
        label: "Gender",
        render: (row: Resident) => toTitleCase(row.gender),
        sortable: true,
    },
    {
        key: "civil_status",
        label: "Civil Status",
        render: (row: Resident) => toTitleCase(row.civil_status),
        sortable: true,
    },
    {
        key: "birthdate",
        label: "Birthdate",
        render: (row: Resident) => getDateOnly(row.birthdate),
        sortable: true,
    },
    // {
    //     key: "phone",
    //     label: "Phone",
    //     sortable: true,
    // },
    // {
    //     key: "email",
    //     label: "Email",
    //     sortable: true,
    // },
    // {
    //     key: "purok",
    //     label: "Purok",
    //     render: (row: Resident) => row.purok?.name ?? "-",
    //     sortable: true,
    // },
    // {
    //     key: "household",
    //     label: "Household",
    //     render: (row: Household) => row.household_no ?? "-",
    //     sortable: true,
    // },
    {
        key: "updated_at",
        label: "Updated At",
        render: (row: Resident) => getFriendlyDate(row.updated_at),
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

export const filter = [];
