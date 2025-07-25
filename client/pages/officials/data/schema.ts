import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "Position",
            name: "position",
            options: [
                // ✅ CITY-LEVEL POSITIONS
                { label: "City Mayor", value: "City Mayor" },
                { label: "City Vice Mayor", value: "City Vice Mayor" },
                { label: "City Councilor 1", value: "City Councilor 1" },
                { label: "City Councilor 2", value: "City Councilor 2" },
                { label: "City Councilor 3", value: "City Councilor 3" },
                { label: "City Councilor 4", value: "City Councilor 4" },
                { label: "City Councilor 5", value: "City Councilor 5" },
                { label: "City Councilor 6", value: "City Councilor 6" },
                { label: "City Councilor 7", value: "City Councilor 7" },
                { label: "City Administrator", value: "City Administrator" },
                { label: "City Treasurer", value: "City Treasurer" },
                { label: "City Budget Officer", value: "City Budget Officer" },
                { label: "City Engineer", value: "City Engineer" },
                { label: "City Health Officer", value: "City Health Officer" },
                {
                    label: "City Disaster Risk Officer",
                    value: "City Disaster Risk Officer",
                },
                {
                    label: "City Planning Officer",
                    value: "City Planning Officer",
                },

                // ✅ BARANGAY-LEVEL POSITIONS
                {
                    label: "Punong Barangay (Barangay Captain)",
                    value: "Barangay Captain",
                },
                {
                    label: "Barangay Kagawad (Councilor) 1",
                    value: "Barangay Councilor 1",
                },
                {
                    label: "Barangay Kagawad (Councilor) 2",
                    value: "Barangay Councilor 2",
                },
                {
                    label: "Barangay Kagawad (Councilor) 3",
                    value: "Barangay Councilor 3",
                },
                {
                    label: "Barangay Kagawad (Councilor) 4",
                    value: "Barangay Councilor 4",
                },
                {
                    label: "Barangay Kagawad (Councilor) 5",
                    value: "Barangay Councilor 5",
                },
                {
                    label: "Barangay Kagawad (Councilor) 6",
                    value: "Barangay Councilor 6",
                },
                {
                    label: "Barangay Kagawad (Councilor) 7",
                    value: "Barangay Councilor 7",
                },
                { label: "Barangay Secretary", value: "Barangay Secretary" },
                { label: "Barangay Treasurer", value: "Barangay Treasurer" },
                { label: "SK Chairperson", value: "SK Chairperson" },
            ],
            type: "select",
            validation: z.string().min(1, "Position is required"),
        },
        {
            class: "col-span-full",
            label: "Resident",
            multiple: false,
            name: "resident",
            onSearch: handlers.resident?.onSearch,
            options: handlers.resident?.options.value ?? [],
            placeholder: "Select Resident",
            searchable: true,
            type: "combobox",
            validation: z.union([
                z.string().min(1, "Resident is required"),
                z.array(z.string()).min(1, "At least one resident is required"),
            ]),
        },
        {
            class: "col-span-6",
            label: "Term Start",
            name: "term_start",
            type: "date",
            validation: z.preprocess((val) => {
                if (typeof val === "string" || val instanceof Date) {
                    const date = new Date(val);
                    return isNaN(date.getTime()) ? undefined : date;
                }
                return undefined;
            }, z.date()),
        },
        {
            class: "col-span-6",
            label: "Term End",
            name: "term_end",
            type: "date",
            validation: z.preprocess((val) => {
                if (typeof val === "string" || val instanceof Date) {
                    const date = new Date(val);
                    return isNaN(date.getTime()) ? undefined : date;
                }
                return undefined;
            }, z.date()),
        },
        {
            class: "col-span-full",
            label: "Barangay",
            multiple: false,
            name: "barangay",
            onSearch: handlers.barangay?.onSearch,
            options: handlers.barangay?.options.value ?? [],
            placeholder: "Select Barangay",
            searchable: true,
            type: "combobox",
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});
