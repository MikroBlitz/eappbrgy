import { z } from "zod";

import type { FormSchema } from "~/types/fields";
import type { formZodSchema } from "~/utils/helpers";

export const notificationSchema = (): FormSchema => ({
    fields: [
        {
            class: "col-span-full",
            label: "Title",
            name: "title",
            type: "text",
            validation: z.string().min(1, "Title is required"),
        },
        {
            class: "col-span-full",
            label: "Content",
            name: "content",
            type: "textarea",
            validation: z.string().min(1, "Content is required"),
        },
        {
            class: "col-span-full",
            label: "Publish Date",
            name: "publish_date",
            type: "date",
        },
    ],
});

export type Schema = z.infer<ReturnType<typeof formZodSchema>>;
