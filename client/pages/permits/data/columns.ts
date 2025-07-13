import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Permit } from "~/types/codegen/graphql";

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
        key: "type",
        label: "Type",
        render: (row: Permit) => {
            return h("div", { class: "flex items-center space-x-2" }, [
                h(
                    UBadge,
                    {
                        color: "gray",
                        label: row.type,
                        size: "sm",
                        variant: "solid",
                    },
                    {
                        default: () =>
                            h("div", { class: "flex items-center space-x-1" }, [
                                h("span", null, toTitleCase(row.type)),
                            ]),
                    },
                ),
            ]);
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
        sortable: false,
    },
    {
        key: "issued_at",
        label: "Issued at",
        render: (row) => h("div", getDateOnly(row.issued_at)),
        sortable: true,
    },
    {
        key: "valid_until",
        label: "Valid until",
        render: (row) => h("div", getDateOnly(row.valid_until)),
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        render: (row: Permit) =>
            h(UBadge, {
                color:
                    row.status === "active"
                        ? "green"
                        : row.status === "expired"
                          ? "red"
                          : row.status === "revoked"
                            ? "amber"
                            : "gray",
                label:
                    row.status === "active"
                        ? "Active"
                        : row.status === "expired"
                          ? "Expired"
                          : row.status === "revoked"
                            ? "Revoked"
                            : "-",
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

export const filter = [
    {
        key: "status",
        label: "Active",
        value: "active",
    },
    {
        key: "status",
        label: "Expired",
        value: "expired",
    },
    {
        key: "status",
        label: "Revoked",
        value: "revoked",
    },
];
