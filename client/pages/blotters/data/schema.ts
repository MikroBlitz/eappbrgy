import { z } from "zod";

import type { SearchableFieldHandlers } from "~/components/table/types";
import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const schema = (handlers: SearchableFieldHandlers): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "Case no.",
            name: "case_no",
            type: "text",
            validation: z.string().min(1, "Case no is required"),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Complaint",
            name: "complaint",
            type: "text",
            validation: z.string().min(1, "Complaint is required"),
        },
        {
            class: "col-span-6",
            label: "Incident Date",
            name: "incident_date",
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
                    message: "Incident cannot be in the future",
                }),
            ),
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Complainant",
            multiple: false,
            name: "complainant",
            onSearch: handlers.complainant?.onSearch,
            options: handlers.complainant?.options.value ?? [],
            placeholder: "Select Complainant",
            searchable: true,
            type: "combobox",
        },
        {
            class: "col-span-full md:col-span-6",
            label: "Respondent",
            multiple: false,
            name: "respondent",
            onSearch: handlers.respondent?.onSearch,
            options: handlers.respondent?.options.value ?? [],
            placeholder: "Select Respondent",
            searchable: true,
            type: "combobox",
        },
        {
            class: "col-span-full",
            label: "Details",
            name: "details",
            type: "text",
            validation: z.string().min(1, "Details is required"),
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;
