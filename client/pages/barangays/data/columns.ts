import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Barangay } from "~/types/codegen/graphql";

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
        render: (row: Barangay) => row.name,
        sortable: true,
    },
    {
        key: "official",
        label: "Brgy. Captain",
        render: (row: Barangay) => {
            const name = row.official?.resident?.name;
            if (!name) return "";

            return h("div", { class: "flex items-center space-x-2" }, [
                h(
                    "a",
                    {
                        class: "text-blue-600 cursor-pointer",
                        onClick: () => {
                            copyToClipboard("captain", name);
                            navigateTo("/officials");
                        },
                    },
                    name,
                ),
            ]);
        },
        sortable: false,
    },
    {
        key: "population",
        label: "Population",
        sortable: true,
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
