import type { Column } from "~/components/table/types";
import type { Household, Resident } from "~/types/codegen/graphql";

import { getFriendlyDate } from "~/utils/helpers";

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
        render: (row: Resident) => `${row.name} ${row.suffix}`,
        sortable: true,
    },
    {
        key: "birthdate",
        label: "Birthdate",
        render: (row: Resident) => getFriendlyDate(row.birthdate),
        sortable: true,
    },
    {
        key: "gender",
        label: "Gender",
        sortable: true,
    },
    {
        key: "civil_status",
        label: "Civil Status",
        sortable: true,
    },
    {
        key: "phone",
        label: "Phone",
        sortable: true,
    },
    {
        key: "email",
        label: "Email",
        sortable: true,
    },
    {
        key: "purok",
        label: "Purok",
        render: (row: Resident) => row.purok?.name ?? "-",
        sortable: true,
    },
    {
        key: "household",
        label: "Household",
        render: (row: Household) => row.household_no ?? "-",
        sortable: true,
    },
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
