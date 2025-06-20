import { useDebounceFn } from "@vueuse/shared";

import type { FieldOption } from "~/types/fields";

import { permissionsPaginate } from "~/graphql/Permission";

export function usePermissionQueryOption() {
    const loadingPermissions = ref(false);
    const permissionOptions = ref<FieldOption[]>([]);

    const fetchPermissions = async (q = "") => {
        try {
            const variables = { first: 50, search: q };
            const { data } = await useAsyncQuery(
                permissionsPaginate,
                variables,
            );
            if (data.value) {
                return data.value.permissionsPaginate.data.map(
                    (permission: { name: string; id: string }) => ({
                        label: permission.name,
                        value: permission.id,
                    }),
                );
            }
            return [];
        } catch (e) {
            console.error("Failed to fetch permissions", e);
            return [];
        }
    };

    const searchPermission = async (q: string) => {
        loadingPermissions.value = true;
        const result = await fetchPermissions(q);
        loadingPermissions.value = false;
        return result;
    };
    const searchPermissions = useDebounceFn(searchPermission, 700);
    const initializePermissions = async () =>
        (permissionOptions.value = await fetchPermissions());

    return {
        fetchPermissions,
        initializePermissions,
        loadingPermissions,
        permissionOptions,
        searchPermission,
        searchPermissions,
    };
}
