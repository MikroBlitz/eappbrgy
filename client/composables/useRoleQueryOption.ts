import { useDebounceFn } from "@vueuse/shared";

import type { FieldOption } from "~/types/fields";

import { rolesPaginate } from "~/graphql/Role";

export function useRoleQueryOption() {
    const loadingRoles = ref(false);
    const roleOptions = ref<FieldOption[]>([]);

    const fetchRoles = async (q = "") => {
        try {
            const variables = { first: 50, search: q };
            const { data } = await useAsyncQuery(rolesPaginate, variables);
            if (data.value) {
                return data.value.rolesPaginate.data.map(
                    (role: { name: string; id: string }) => ({
                        label: role.name,
                        value: role.id,
                    }),
                );
            }
            return [];
        } catch (e) {
            console.error("Failed to fetch roles:", e);
            return [];
        }
    };

    const searchRole = async (q: string) => {
        loadingRoles.value = true;
        const result = await fetchRoles(q);
        roleOptions.value = result;
        loadingRoles.value = false;
        return result;
    };

    const searchRoles = useDebounceFn(searchRole, 700);
    const initializeRoles = async () =>
        (roleOptions.value = await fetchRoles());

    return {
        fetchRoles,
        initializeRoles,
        loadingRoles,
        roleOptions,
        searchRole,
        searchRoles,
    };
}
