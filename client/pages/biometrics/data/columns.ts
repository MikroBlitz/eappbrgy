import { UBadge } from "#components";

import type { Column } from "~/components/table/types";
import type { Attendance } from "~/types/codegen/graphql";

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
        key: "user",
        label: "User",
        render: (row: Attendance) => {
            return h(
                UBadge,
                {
                    color: "gray",
                    label: row.user.name,
                    size: "sm",
                    variant: "solid",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h("span", null, row.user.name),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "am_time_in",
        label: "Time in (AM)",
        render: (row) => h("div", getFriendlyDate(row.am_time_in)),
        sortable: true,
    },
    {
        key: "am_time_out",
        label: "Time in (AM)",
        render: (row) => h("div", getFriendlyDate(row.am_time_out)),
        sortable: true,
    },
    {
        key: "pm_time_in",
        label: "Time in (AM)",
        render: (row) => h("div", getFriendlyDate(row.pm_time_in)),
        sortable: true,
    },
    {
        key: "pm_time_out",
        label: "Time in (AM)",
        render: (row) => h("div", getFriendlyDate(row.pm_time_out)),
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

export const filters = [];
