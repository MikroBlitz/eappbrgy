import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "User",
            multiple: false,
            name: "user",
            onSearch: handlers.user?.onSearch,
            options: handlers.user?.options.value ?? [],
            placeholder: "Select User",
            searchable: true,
            type: "combobox",
        },
        {
            class: "col-span-full",
            label: "Date",
            name: "date",
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
            label: "Time In (AM)",
            name: "am_time_in",
            type: "time",
        },
        {
            class: "col-span-6",
            label: "Time Out (AM)",
            name: "am_time_out",
            type: "time",
        },
        {
            class: "col-span-6",
            label: "Time In (PM)",
            name: "pm_time_in",
            type: "time",
        },
        {
            class: "col-span-6",
            label: "Time Out (PM)",
            name: "pm_time_out",
            type: "time",
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;
