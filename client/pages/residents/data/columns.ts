import { UBadge } from "#components";
import { LucideUser } from "lucide-vue-next";
import { h } from "vue";

import type { Column } from "~/components/table/types";
import type { Resident } from "~/types/codegen/graphql";

import { genderColorMap, genderIconMap, toTitleCase } from "~/utils/helpers";

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
    {
        class: "w-2",
        key: "suffix",
        label: "Suffix",
        sortable: true,
    },
    {
        class: "w-[250px]",
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "gender",
        label: "Gender",
        render: (row: Resident) => {
            const gender = row.gender?.toLowerCase();
            const Icon = genderIconMap[gender] || LucideUser;
            const color = genderColorMap[gender] || "gray";
            const label = gender
                ? gender.charAt(0).toUpperCase() + gender.slice(1)
                : "Unknown";

            return h(
                UBadge,
                {
                    color,
                    label,
                    size: "sm",
                    variant: "soft",
                },
                {
                    default: () =>
                        h("div", { class: "flex items-center space-x-1" }, [
                            h(Icon, { class: "w-3 h-3" }),
                            h("span", null, label),
                        ]),
                },
            );
        },
        sortable: true,
    },
    {
        key: "civil_status",
        label: "Civil Status",
        render: (row: Resident) => toTitleCase(row.civil_status),
        sortable: true,
    },
    {
        key: "birthdate",
        label: "Age",
        render: (row: Resident) => {
            if (!row.birthdate) return "";

            const birthDate = new Date(row.birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();

            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            return `${age} y/o`;
        },
        sortable: true,
    },
    // {
    //     key: "phone",
    //     label: "Phone",
    //     sortable: true,
    // },
    // {
    //     key: "email",
    //     label: "Email",
    //     sortable: true,
    // },
    // {
    //     key: "purok",
    //     label: "Purok",
    //     render: (row: Resident) => row.purok?.name ?? "-",
    //     sortable: true,
    // },
    // {
    //     key: "household",
    //     label: "Household",
    //     render: (row: Household) => row.household_no ?? "-",
    //     sortable: true,
    // },
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

// Filters
export const filters = [
    {
        key: "gender",
        label: "Male",
        value: "male",
    },
    {
        key: "gender",
        label: "Female",
        value: "female",
    },
    {
        key: "civil_status",
        label: "Single",
        value: "single",
    },
    {
        key: "civil_status",
        label: "Married",
        value: "married",
    },
    {
        key: "civil_status",
        label: "Widowed",
        value: "widowed",
    },
    {
        key: "civil_status",
        label: "Separated",
        value: "separated",
    },
];
