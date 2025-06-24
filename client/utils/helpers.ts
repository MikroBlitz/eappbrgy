import type { BadgeColor } from "#ui/types";

import { Briefcase, Shield, User } from "lucide-vue-next";
import { z } from "zod";

import type { FormSchema } from "~/types/fields";

// It is used for logging out via gql it can be improved.
export const authContext = () => {
    const authStore = useAuthStore();
    if (!authStore.token) throw new Error("Missing auth token");

    return {
        context: {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        },
    };
};

export const roleIconMap: Record<string, any> = {
    Admin: Shield,
    Manager: Briefcase,
    User: User,
};

export const colorMap: Record<string, BadgeColor> = {
    Admin: "emerald",
    Manager: "orange",
    User: "blue",
};

export function parseGraphQLError(e: any): string {
    const graphQLErrors = e?.graphQLErrors || e?.response?.errors;
    if (Array.isArray(graphQLErrors)) {
        const messages = graphQLErrors.map((error) => {
            const debugMessage = error?.extensions?.debugMessage;
            const message = error?.message;
            return debugMessage || message || "Unknown error";
        });
        messages.forEach((msg) => console.error("GraphQL Error:", msg));

        return messages.join("\n");
    }
    console.error("Unexpected error:", e);

    return "An unexpected error occurred";
}

export const getFriendlyDate = (datetimeStr: string): string => {
    const date = new Date(datetimeStr.replace(" ", "T"));

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        hour: "numeric",
        hour12: true,
        minute: "2-digit",
        month: "long",
        year: "numeric",
    };

    return date.toLocaleString(undefined, options);
};

export const formZodSchema = (schema: FormSchema) => {
    return z.object(
        schema.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.validation || z.any();
                return acc;
            },
            {} as Record<string, z.ZodTypeAny>,
        ),
    );
};

export function toGraphQLDateTime(input: Date | string | null): string | null {
    if (!input) return null;
    const date = input instanceof Date ? input : new Date(input);
    if (isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const phoneRegex = /^(?:\+63|0)?9\d{9}$/;
