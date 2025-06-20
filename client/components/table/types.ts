export interface Column {
    class?: string;
    key: string;
    label?: string;
    render?: (row: any) => any;
    sortable?: boolean;
}

export interface FilterOption {
    key: string | number;
    label: string;
    value: boolean | string;
}

export interface Sort {
    column: string;
    direction: "asc" | "desc";
}

export type Row = Record<string, any>;

export interface TableAction {
    color: (row: any) => string;
    condition: () => boolean;
    icon: (row: any) => string;
    onClick: (row: any) => void;
    tooltip: (row: any) => string;
}

export interface CrudConfig {
    hasStatus?: boolean;
    icon: string;
    permissions: {
        create: string;
        view: string;
        edit: string;
        delete: string;
        updateStatus?: string;
    };
    singular: string;
    title: string;
}

export interface CrudOperations<T> {
    delete: any;
    getFormState: (item?: T) => any;
    prepareSubmitData: (data: any, selectedItem?: T) => any;
    query: any;
    updateStatus?: any;
    upsert: any;
}
