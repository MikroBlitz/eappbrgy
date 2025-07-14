import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        // {
        //     class: "col-span-full",
        //     label: "Category",
        //     name: "category",
        //     options: [
        //         { label: "Permit", value: "permit" },
        //         { label: "Certificate", value: "certificate" },
        //         { label: "ID", value: "id" },
        //     ],
        //     type: "select",
        //     validation: z.string().min(1, "Category is required"),
        // },
        {
            class: "col-span-full",
            label: "Document Type",
            name: "type",
            options: [
                {
                    category: "permit",
                    label: "Barangay Clearance",
                    value: "barangay_clearance",
                },
                {
                    category: "certificate",
                    label: "Certificate of Residency",
                    value: "certificate_of_residency",
                },
                {
                    category: "certificate",
                    label: "Certificate of Indigency",
                    value: "certificate_of_indigency",
                },
                {
                    category: "permit",
                    label: "Business Clearance",
                    value: "business_clearance",
                },
                { category: "id", label: "Barangay ID", value: "barangay_id" },
                {
                    category: "certificate",
                    label: "Certificate of Solo Parent",
                    value: "certificate_of_solo_parent",
                },
                {
                    category: "permit",
                    label: "Permit for Construction",
                    value: "permit_construction",
                },
                {
                    category: "permit",
                    label: "Permit for Events",
                    value: "permit_events",
                },
                {
                    category: "certificate",
                    label: "Certificate of Good Moral",
                    value: "certificate_good_moral",
                },
                {
                    category: "certificate",
                    label: "Certificate of Calamity Victim",
                    value: "certificate_calamity_victim",
                },
            ],
            type: "select",
            validation: z.string().min(1, "Document type is required"),
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
            label: "Requested at",
            name: "requested_at",
            type: "date",
            validation: z.preprocess((val) => {
                if (typeof val === "string" || val instanceof Date) {
                    const date = new Date(val);
                    return isNaN(date.getTime()) ? undefined : date;
                }
                return undefined;
            }, z.date()),
        },
        // {
        //     class: "col-span-6",
        //     label: "Issued at",
        //     name: "issued_at",
        //     type: "date",
        //     validation: z.preprocess((val) => {
        //         if (typeof val === "string" || val instanceof Date) {
        //             const date = new Date(val);
        //             return isNaN(date.getTime()) ? undefined : date;
        //         }
        //         return undefined;
        //     }, z.date()),
        // },
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
            }, z.date().optional()),
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});
