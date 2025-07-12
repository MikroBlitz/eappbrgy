import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "Permit Type",
            name: "type",
            options: [
                { label: "Barangay Clearance", value: "barangay_clearance" },
                {
                    label: "Certificate of Residency",
                    value: "certificate_of_residency",
                },
                {
                    label: "Certificate of Indigency",
                    value: "certificate_of_indigency",
                },
                { label: "Business Clearance", value: "business_clearance" },
                { label: "Barangay ID", value: "barangay_id" },
                {
                    label: "Certificate of Solo Parent",
                    value: "certificate_of_solo_parent",
                },
                {
                    label: "Barangay Permit for Construction",
                    value: "permit_construction",
                },
                { label: "Barangay Permit for Events", value: "permit_events" },
                {
                    label: "Certificate of Good Moral",
                    value: "certificate_good_moral",
                },
                {
                    label: "Certificate of Calamity Victim",
                    value: "certificate_calamity_victim",
                },
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
            label: "Issued at",
            name: "issued_at",
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
            label: "Valid until",
            name: "valid_until",
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
