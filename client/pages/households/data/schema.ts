import { z } from "zod";

import type { FieldOption, FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (
    options: Ref<FieldOption[]>,
    searchOptions: (q: string) => Promise<FieldOption[]>,
): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "Household no.",
            name: "household_no",
            type: "text",
            validation: z.string().min(1, "Household no is required"),
        },
        {
            class: "col-span-full",
            label: "Purok",
            multiple: false,
            name: "purok",
            onSearch: searchOptions,
            options: options.value,
            placeholder: "Select Purok",
            searchable: true,
            type: "combobox",
            validation: z.union([
                z.string().min(1, "Purok is required"),
                z
                    .array(z.string())
                    .min(1, "At least one permission is required"),
            ]),
        },
        {
            class: "col-span-full",
            label: "Address",
            name: "address",
            type: "text",
            validation: z.string().min(1, "Address is required"),
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});
