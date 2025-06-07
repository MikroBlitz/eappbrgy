<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="status"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="loadingOptions"
    />
</template>

<script setup lang="ts">
import type { Role } from "~/types/codegen/graphql";

import { permissionsPaginate } from "~/graphql/Permission";
import { rolesPaginate, upsertRole, deleteRole } from "~/graphql/Role";

import { columns, status } from "../data/columns";
import { schema } from "../data/schema";

// Permission Search Option
const { debouncedSearch, initializeOptions, loadingOptions, queryOptions } =
    useSearchQueryOptions(permissionsPaginate, {
        mapFn: (map: { name: string; id: string }) => ({
            label: map.name,
            value: map.id,
        }),
        pageSize: 50,
        queryKey: "permissionsPaginate",
    });

const permissionName = "role";
const crudConfig = useCrudConfig(
    "Roles", // title
    "Role", // subtitle
    "solar:key-outline", // icon
    {
        // permissions
        create: `create ${permissionName}`,
        delete: `delete ${permissionName}`,
        edit: `edit ${permissionName}`,
        view: `view ${permissionName}`,
    },
);
const formSchema = computed(() => schema(queryOptions, debouncedSearch));
const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<Role>(
    {
        delete: deleteRole,
        paginate: rolesPaginate,
        upsert: upsertRole,
    },
    {
        getFormState: (role?: Role) => {
            if (role) {
                const permissionIds = role.permissions
                    ? role.permissions.map((perm) => perm?.id)
                    : [];
                initializeOptions();
                return {
                    id: role.id,
                    name: role.name,
                    permissions: permissionIds,
                };
            } else {
                initializeOptions();
                return {
                    id: undefined,
                    name: "",
                    permissions: [],
                };
            }
        },
        prepareSubmitData: (data: any, selectedRole?: Role) => {
            let permissions: string[] = [];
            if (data.permissions) {
                permissions = Array.isArray(data.permissions)
                    ? data.permissions
                    : [data.permissions];
            }

            return {
                ...data,
                id: selectedRole?.id || undefined,
                permissions: { sync: permissions },
            };
        },
    },
);
</script>
