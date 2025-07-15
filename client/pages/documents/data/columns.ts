import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Document } from "~/types/codegen/graphql";

import { toTitleCase } from "~/utils/helpers";

export const columns: Column[] = [
    {
        class: "w-2",
        key: "select",
    },
    {
        class: "w-2",
        key: "id",
        label: "#",
        sortable: true,
    },
    // {
    //     class: "w-2",
    //     key: "category",
    //     label: "Category",
    //     render: (row: Document) => {
    //         return h("div", { class: "flex items-center space-x-2" }, [
    //             h(
    //                 UBadge,
    //                 {
    //                     color: "gray",
    //                     label: row.category,
    //                     size: "sm",
    //                     variant: "solid",
    //                 },
    //                 {
    //                     default: () =>
    //                         h("div", { class: "flex items-center space-x-1" }, [
    //                             h("span", null, toTitleCase(row.category)),
    //                         ]),
    //                 },
    //             ),
    //         ]);
    //     },
    //     sortable: true,
    // },
    {
        class: "w-[250px]",
        key: "type",
        label: "Type",
        render: (row: Document) => {
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
        class: "w-[250px]",
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
        key: "requested_at",
        label: "Requested at",
        render: (row) =>
            h("div", row.requested_at ? getDateOnly(row.requested_at) : ""),
        sortable: true,
    },
    {
        key: "issued_at",
        label: "Issued at",
        render: (row) =>
            h("div", row.issued_at ? getDateOnly(row.issued_at) : ""),
        sortable: true,
    },
    {
        key: "valid_until",
        label: "Valid until",
        render: (row) =>
            h("div", row.valid_until ? getDateOnly(row.valid_until) : ""),
        sortable: true,
    },
    {
        class: "w-2",
        key: "status",
        label: "Status",
        render: (row: Document) =>
            h(UBadge, {
                color:
                    row.status === "approved"
                        ? "emerald"
                        : row.status === "released"
                          ? "blue"
                          : row.status === "expired"
                            ? "red"
                            : row.status === "revoked"
                              ? "amber"
                              : "gray",
                label:
                    row.status === "approved"
                        ? "Approved"
                        : row.status === "released"
                          ? "Released"
                          : row.status === "expired"
                            ? "Expired"
                            : row.status === "revoked"
                              ? "Revoked"
                              : "Pending",
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
        label: "Pending",
        value: "pending",
    },
    {
        key: "status",
        label: "Approved",
        value: "approved",
    },
    {
        key: "status",
        label: "Released",
        value: "released",
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
