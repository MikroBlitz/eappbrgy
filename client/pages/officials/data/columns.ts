import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Official } from "~/types/codegen/graphql";

import { toTitleCase } from "~/utils/helpers";

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
        key: "position",
        label: "Positions",
        render: (row) => {
            return h(
                UBadge,
                {
                    color: "gray",
                    label: row.name,
                    size: "sm",
                    variant: "solid",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h("span", null, toTitleCase(row.position)),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "resident",
        label: "Resident",
        render: (row) =>
            h("div", { class: "flex items-center space-x-2" }, [
                h(
                    "a",
                    {
                        class: "text-blue-600 cursor-pointer",
                        onClick: () => {
                            copyToClipboard("email", row.resident?.name);
                            navigateTo("/residents");
                        },
                    },
                    row.resident?.name,
                ),
            ]),
        sortable: true,
    },
    {
        key: "term_start",
        label: "Term Start",
        render: (row) => h("div", getDateOnly(row.term_start)),
        sortable: true,
    },
    {
        key: "term_end",
        label: "Term End",
        render: (row) => h("div", getDateOnly(row.term_end)),
        sortable: true,
    },
    // {
    //     key: "created_at",
    //     label: "Created At",
    //     render: (row) => h("div", getFriendlyDate(row.created_at)),
    //     sortable: true,
    // },
    // {
    //     key: "updated_at",
    //     label: "Updated At",
    //     render: (row) => h("div", getFriendlyDate(row.updated_at)),
    //     sortable: true,
    // },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

export const filter = [];
