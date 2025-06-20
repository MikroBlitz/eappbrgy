import type { ZodTypeAny } from "zod";

export type FieldType =
    | "text"
    | "email"
    | "password"
    | "select"
    | "combobox"
    | "tel"
    | "number";

export interface FieldOption {
    label: string;
    value: string | number;
}

export interface FormField {
    name: string;
    label: string;
    class?: string;
    type: FieldType;
    required?: boolean;
    multiple?: boolean;
    placeholder?: string;
    searchable?: boolean;
    options?: FieldOption[];
    validation?: ZodTypeAny;
    valueAttribute?: string;
    optionAttribute?: string;
    onSearch?: (query: string) => Promise<FieldOption[]>;
}

export interface FormSchema {
    fields: FormField[];
}
