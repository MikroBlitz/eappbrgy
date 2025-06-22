import { useDebounceFn } from "@vueuse/shared";

import type { FieldOption } from "~/types/fields";

interface SearchQueryOptions<T = any> {
    dataKey?: string;
    debounceMs?: number;
    mapFn?: (item: T) => FieldOption;
    pageSize?: number;
    queryKey: string;
    variables?: Record<string, any>;
}

export function useSearchQueryOptions<T = any>(
    query: any,
    options: SearchQueryOptions<T>,
) {
    const {
        dataKey = "data",
        debounceMs = 700,
        mapFn = (item: any) => ({ label: item.name, value: item.id }),
        pageSize = 50,
        queryKey,
        variables = {},
    } = options;

    const loadingOptions = ref(false);
    const queryOptions = ref<FieldOption[]>([]);

    const fetchItems = async (search = "") => {
        try {
            const queryVariables = {
                first: pageSize,
                search,
                ...variables,
            };

            const { data } = await useAsyncQuery(query, queryVariables);

            if (data.value && data.value[queryKey]) {
                const items =
                    data.value[queryKey][dataKey] || data.value[queryKey];
                return Array.isArray(items) ? items.map(mapFn) : [];
            }

            return [];
        } catch (error) {
            console.error(`Failed to fetch ${queryKey}:`, error);
            return [];
        }
    };

    const searchItems = async (searchTerm: string) => {
        loadingOptions.value = true;
        const result = await fetchItems(searchTerm);
        loadingOptions.value = false;
        return result;
    };

    const debouncedSearch = useDebounceFn(searchItems, debounceMs);

    const initializeOptions = async () => {
        queryOptions.value = await fetchItems();
    };

    return {
        debouncedSearch,
        initializeOptions,
        loadingOptions,
        queryOptions,
    };
}
