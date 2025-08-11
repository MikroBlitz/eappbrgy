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
        key: "date",
        label: "Date",
        render: (row) => h("div", row.date ? getDateOnly(row.date) : ""),
        sortable: true,
    },
    {
        key: "user",
        label: "User",
        render: (row: Attendance) => {
            const name = row.user?.name;
            if (!name) return "";

            return h("div", { class: "flex items-center space-x-2" }, [
                h(
                    "a",
                    {
                        class: "text-blue-600 cursor-pointer",
                        onClick: () => {
                            copyToClipboard("User", name);
                            navigateTo("/users");
                        },
                    },
                    name,
                ),
            ]);
        },
        sortable: false,
    },
    {
        class: "w-48",
        key: "am_time_in",
        label: "Time in (AM)",
        render: (row) =>
            h("div", row.am_time_in ? getFriendlyTime(row.am_time_in) : ""),
        sortable: true,
    },
    {
        class: "w-48",
        key: "am_time_out",
        label: "Time out (AM)",
        render: (row) =>
            h("div", row.am_time_out ? getFriendlyTime(row.am_time_out) : ""),
        sortable: true,
    },
    {
        class: "w-48",
        key: "pm_time_in",
        label: "Time in (PM)",
        render: (row) =>
            h("div", row.pm_time_in ? getFriendlyTime(row.pm_time_in) : ""),
        sortable: true,
    },
    {
        class: "w-48",
        key: "pm_time_out",
        label: "Time out (PM)",
        render: (row) =>
            h("div", row.pm_time_out ? getFriendlyTime(row.pm_time_out) : ""),
        sortable: true,
    },
    {
        key: "actions",
        label: "Actions",
        sortable: false,
    },
];

export const filters = [];
