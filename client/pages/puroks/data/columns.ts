import { UBadge } from "#components";

import type { Column } from "~/components/table/types";

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
        key: "households",
        label: "Households",
        render: (row) => {
            return h(
                "div",
                { class: "flex flex-wrap gap-1" },
                row.permissions?.map((household: { name: string }) =>
                    h(
                        UBadge,
                        {
                            color: "gray",
                            label: household?.name,
                            size: "sm",
                            variant: "solid",
                        },
                        {
                            default: () =>
                                h(
                                    "div",
                                    { class: "flex items-center space-x-1" },
                                    [h("span", null, household?.name)],
                                ),
                        },
                    ),
                ),
            );
        },
        sortable: true,
    },
    // {
    //     key: "guard_name",
    //     label: "Guard Name",
    //     sortable: true,
    // },
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

export const filter = [];
