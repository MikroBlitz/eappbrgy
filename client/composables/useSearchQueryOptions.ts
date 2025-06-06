import { useDebounceFn } from "@vueuse/shared";
import { ref, computed, watch, readonly } from "vue";

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

    const searchTerm = ref("");
    const isInitialized = ref(false);

    const queryVariables = computed(() => ({
        first: pageSize,
        search: searchTerm.value,
        ...variables,
    }));

    const { error, loading, refetch, result } = useQuery(query, queryVariables);

    const queryOptions = computed<FieldOption[]>(() => {
        if (!result.value || !result.value[queryKey]) {
            return [];
        }

        try {
            const items =
                result.value[queryKey][dataKey] || result.value[queryKey];
            return Array.isArray(items) ? items.map(mapFn) : [];
        } catch (err) {
            console.error(`Failed to process ${queryKey} data:`, err);
            return [];
        }
    });

    const searchItems = async (search: string) => {
        searchTerm.value = search;
        await refetch();
        return queryOptions.value;
    };

    const debouncedSearch = useDebounceFn(searchItems, debounceMs);

    const initializeOptions = async () => {
        if (!isInitialized.value) {
            searchTerm.value = "";
            isInitialized.value = true;
            await refetch();
        }
        return queryOptions.value;
    };

    watch(error, (newError) => {
        if (newError) {
            console.error(`Failed to fetch ${queryKey}:`, newError);
        }
    });

    return {
        debouncedSearch,
        initializeOptions,
        loadingOptions: readonly(loading),
        queryOptions: readonly(queryOptions),
    };
}
