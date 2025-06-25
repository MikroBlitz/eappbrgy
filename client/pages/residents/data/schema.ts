import { z } from "zod";

import type { FieldOption, FormSchema } from "~/types/fields";

// import { CivilStatus, Gender } from "~/types/codegen/graphql";
import { CivilStatus, Gender } from "~/types/codegen/graphql";
import { type formZodSchema, phoneRegex } from "~/utils/helpers";

export const schema = ({
    householdOptions,
    purokOptions,
    searchOptions,
}: {
    purokOptions: Ref<FieldOption[]>;
    householdOptions: Ref<FieldOption[]>;
    searchOptions: (q: string) => Promise<FieldOption[]>;
}): FormSchema => ({
    fields: [
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
            class: "col-span-6 md:col-span-4",
            label: "Suffix",
            name: "suffix",
            type: "text",
            validation: z.string().optional(),
        },
        {
            class: "col-span-6 md:col-span-5",
            label: "Birthdate",
            name: "birthdate",
            type: "date",
            validation: z
                .date()
                .max(new Date(), {
                    message: "Birthdate cannot be in the future",
                })
                .optional(),
        },
        {
            class: "col-span-6",
            label: "Gender",
            name: "gender",
            options: [
                { label: "Male", value: Gender.Male },
                { label: "Female", value: Gender.Female },
            ],
            type: "select",
            validation: z.string().min(1, "Civil status is required"),
        },
        {
            class: "col-span-6",
            label: "Civil Status",
            name: "civil_status",
            options: [
                { label: "Single", value: CivilStatus.Single },
                { label: "Married", value: CivilStatus.Married },
                { label: "Widowed", value: CivilStatus.Widowed },
                { label: "Separated", value: CivilStatus.Separated },
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
            validation: z.string().email("Invalid email"),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Purok",
            multiple: false,
            name: "purok",
            onSearch: searchOptions,
            options: purokOptions.value,
            placeholder: "Select Purok",
            searchable: true,
            type: "combobox",
            validation: z.union([
                z.string().min(1, "Purok is required"),
                z.array(z.string()).min(1, "At least one purok is required"),
            ]),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Household",
            multiple: false,
            name: "household",
            onSearch: searchOptions,
            options: householdOptions.value,
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
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    password: "",
    phone: "",
    roles: [],
});
