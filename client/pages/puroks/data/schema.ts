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
            label: "Name",
            name: "name",
            type: "text",
            validation: z.string().min(1, "Name is required"),
        },
        {
            class: "col-span-full",
            label: "Households",
            multiple: true,
            name: "households",
            onSearch: searchOptions,
            options: options.value,
            placeholder: "Select Household/s",
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
    guard_name: "",
    name: "",
});
