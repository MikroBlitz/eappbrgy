import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Household } from "~/types/codegen/graphql";

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
        key: "household_no",
        label: "Household no.",
        render: (row: Household) => {
            return h(
                UBadge,
                {
                    color: "gray",
                    label: row.household_no,
                    size: "sm",
                    variant: "solid",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h("span", null, row.household_no),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "purok",
        label: "Purok",
        render: (row: Household) => row.purok?.name,
        sortable: true,
    },
    {
        key: "address",
        label: "Address",
        sortable: true,
    },
    {
        class: "w-[250px]",
        key: "barangay",
        label: "Barangay",
        render: (row) =>
            h("div", { class: "flex items-center space-x-2" }, [
                h(
                    "a",
                    {
                        class: "text-blue-600 cursor-pointer",
                        onClick: () => {
                            copyToClipboard("barangay", row.barangay?.name);
                            navigateTo("/barangays");
                        },
                    },
                    row.barangay?.name,
                ),
            ]),
        sortable: false,
    },
    // {
    //     key: "created_at",
    //     label: "Created At",
    //     render: (row) => h("div", getFriendlyDate(row.created_at)),
    //     sortable: true,
    // },
    {
        key: "updated_at",
        label: "Updated At",
        render: (row) => h("div", getFriendlyDate(row.updated_at)),
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

export const filters = [];
