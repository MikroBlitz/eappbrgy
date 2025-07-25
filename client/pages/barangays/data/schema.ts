import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        // {
        //     class: "col-span-full",
        //     label: "Brgy. Captain",
        //     multiple: false,
        //     name: "official",
        //     onSearch: handlers.official?.onSearch,
        //     options: handlers.official?.options.value ?? [],
        //     placeholder: "Select Brgy. Captain",
        //     searchable: true,
        //     type: "combobox",
        // },
        {
            class: "col-span-full",
            label: "Barangay Name",
            name: "name",
            type: "text",
            validation: z.string().min(1, "Barangay name is required"),
        },
        {
            class: "col-span-full",
            label: "Population",
            name: "population",
            type: "number",
            validation: z.number().default(0),
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;

export const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});
