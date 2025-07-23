import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Blotter } from "~/types/codegen/graphql";

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
        class: "w-52",
        key: "case_no",
        label: "Case no.",
        render: (row: Blotter) => {
            return h(
                UBadge,
                {
                    color: "gray",
                    label: row.case_no,
                    size: "sm",
                    variant: "solid",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h("span", null, row.case_no),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "complaint",
        label: "Complaint",
        sortable: false,
    },
    {
        key: "complainant",
        label: "Complainant",
        render: (row: Blotter) => row.complainant?.name,
        sortable: true,
    },
    {
        key: "respondent",
        label: "Respondent",
        render: (row: Blotter) => row.respondent?.name,
        sortable: true,
    },
    {
        key: "incident_date",
        label: "Incident Date",
        render: (row) => h("div", getDateOnly(row.incident_date)),
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        render: (row: Blotter) =>
            h(UBadge, {
                color:
                    row.status === "resolved"
                        ? "green"
                        : row.status === "open"
                          ? "blue"
                          : row.status === "dismissed"
                            ? "red"
                            : "gray",
                label:
                    row.status === "resolved"
                        ? "Resolved"
                        : row.status === "open"
                          ? "Open"
                          : row.status === "dismissed"
                            ? "Dismissed"
                            : "Unknown",
                size: "sm",
                variant: "subtle",
            }),
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

export const filters = [
    {
        key: "status",
        label: "Open",
        value: "open",
    },
    {
        key: "status",
        label: "Resolved",
        value: "resolved",
    },
    {
        key: "status",
        label: "Dismissed",
        value: "dismissed",
    },
];
