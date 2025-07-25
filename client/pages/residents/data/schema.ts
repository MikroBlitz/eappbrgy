import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";

import { type formZodSchema, phoneRegex } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
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
        {
            class: "col-span-6",
            label: "Purok",
            multiple: false,
            name: "purok",
            onSearch: handlers.purok?.onSearch,
            options: handlers.purok?.options.value ?? [],
            placeholder: "Select Purok",
            searchable: true,
            type: "combobox",
            validation: z.union([
                z.string().min(1, "Purok is required"),
                z.array(z.string()).min(1, "At least one purok is required"),
            ]),
        },
        {
            class: "col-span-6",
            label: "Household",
            multiple: false,
            name: "household",
            onSearch: handlers.household?.onSearch,
            options: handlers.household?.options.value ?? [],
            placeholder: "Select Household",
            searchable: true,
            type: "combobox",
            validation: z.union([
                z.string().min(1, "Household is required"),
                z
                    .array(z.string())
                    .min(1, "At least one household is required"),
            ]),
        },
        {
            class: "col-span-full",
            label: "First Name",
            name: "first_name",
            type: "text",
            validation: z.string().min(1, "First name is required"),
        },
        {
            class: "col-span-full",
            label: "Middle Name",
            name: "middle_name",
            type: "text",
            validation: z.string().optional(),
        },
        {
            class: "col-span-full",
            label: "Last Name",
            name: "last_name",
            type: "text",
            validation: z.string().min(1, "Last name is required"),
        },
        {
            class: "col-span-6",
            label: "Suffix",
            name: "suffix",
            type: "text",
            validation: z.string().optional(),
        },
        {
            class: "col-span-6",
            label: "Birthdate",
            name: "birthdate",
            type: "date",
            validation: z.preprocess(
                (val) => {
                    if (typeof val === "string" || val instanceof Date) {
                        const date = new Date(val);
                        return isNaN(date.getTime()) ? undefined : date;
                    }
                    return undefined;
                },
                z.date().max(new Date(), {
                    message: "Birthdate cannot be in the future",
                }),
            ),
        },
        {
            class: "col-span-6",
            label: "Gender",
            name: "gender",
            options: [
                // TODO: to enums "Gender.Male"
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
            ],
            type: "select",
            validation: z.string().min(1, "Civil status is required"),
        },
        {
            class: "col-span-6",
            label: "Civil Status",
            name: "civil_status",
            options: [
                // TODO: to enums "CivilStatus.Single"
                { label: "Single", value: "single" },
                { label: "Married", value: "married" },
                { label: "Widowed", value: "widowed" },
                { label: "Separated", value: "separated" },
            ],
            type: "select",
            validation: z.string().min(1, "Civil status is required"),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Phone",
            name: "phone",
            type: "tel",
            validation: z
                .string()
                .optional()
                .refine(
                    (val) => !val || phoneRegex.test(val),
                    "Invalid Philippine phone number",
                ),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Email",
            name: "email",
            type: "email",
            validation: z
                .string()
                .trim()
                .optional()
                .refine(
                    (val) => !val || z.string().email().safeParse(val).success,
                    { message: "Invalid email" },
                ),
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;
