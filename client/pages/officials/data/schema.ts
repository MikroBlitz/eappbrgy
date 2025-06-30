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
                {
                    label: "Punong Barangay (Barangay Captain)",
                    value: "punong_barangay",
                },
                { label: "Barangay Kagawad (Councilor) 1", value: "kagawad_1" },
                { label: "Barangay Kagawad (Councilor) 2", value: "kagawad_2" },
                { label: "Barangay Kagawad (Councilor) 3", value: "kagawad_3" },
                { label: "Barangay Kagawad (Councilor) 4", value: "kagawad_4" },
                { label: "Barangay Kagawad (Councilor) 5", value: "kagawad_5" },
                { label: "Barangay Kagawad (Councilor) 6", value: "kagawad_6" },
                { label: "Barangay Kagawad (Councilor) 7", value: "kagawad_7" },
                { label: "Barangay Secretary", value: "barangay_secretary" },
                { label: "Barangay Treasurer", value: "barangay_treasurer" },
                { label: "SK Chairperson", value: "sk_chairperson" },
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
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});
