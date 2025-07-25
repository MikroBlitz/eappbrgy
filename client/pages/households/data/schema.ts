import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
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
            label: "Barangay",
            multiple: false,
            name: "barangay",
            onSearch: handlers.barangay?.onSearch,
            options: handlers.barangay?.options.value ?? [],
            placeholder: "Select Barangay",
            searchable: true,
            type: "combobox",
            validation: z.string().optional(),
        },
        {
            class: "col-span-full",
            label: "Purok",
            multiple: false,
            name: "purok",
            onSearch: handlers.purok?.onSearch,
            options: handlers.purok?.options.value ?? [],
            placeholder: "Select Purok",
            searchable: true,
            type: "combobox",
            validation: z.string().optional(),
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
