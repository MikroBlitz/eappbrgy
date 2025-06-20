export function useCrudOperations<T extends Record<string, unknown>>(
    queries: {
        paginate: <TData = unknown>(params?: unknown) => TData;
        upsert: <TData = unknown>(data: unknown) => TData;
        delete: <TData = unknown>(id: unknown) => TData;
        updateStatus?: <TData = unknown>(params: {
            id: unknown;
            status: boolean;
        }) => TData;
    },
    options?: {
        getFormState?: (item?: T) => Record<string, unknown>;
        prepareSubmitData?: (
            data: Record<string, unknown>,
            selectedItem?: T,
        ) => Record<string, unknown>;
        hasRelations?: boolean;
        relationKey?: string;
    },
) {
    const defaultGetFormState = (item?: T): Record<string, unknown> => {
        if (item) {
            const state: Record<string, unknown> = {};
            Object.keys(item).forEach((key) => {
                if (key === "id" || key === "name" || key === "is_active") {
                    state[key] =
                        item[key] || (key === "is_active" ? false : "");
                }
            });
            if (item.key === "password") state.password = "";
            return state;
        } else {
            return {
                id: "",
                is_active: false,
                name: "",
            };
        }
    };

    const defaultPrepareSubmitData = (
        data: Record<string, unknown>,
        selectedItem?: T,
    ): Record<string, unknown> => {
        return {
            ...data,
            id: selectedItem?.id || undefined,
        };
    };

    return {
        delete: queries.delete,
        getFormState: options?.getFormState || defaultGetFormState,
        prepareSubmitData:
            options?.prepareSubmitData || defaultPrepareSubmitData,
        query: queries.paginate,
        updateStatus: queries.updateStatus,
        upsert: queries.upsert,
    };
}
