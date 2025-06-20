<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="status"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="permission.loadingPermissions"
    />
</template>

<script setup lang="ts">
import type { Role } from "~/types/codegen/graphql";

import { rolesPaginate, upsertRole, deleteRole } from "~/graphql/Role";

import { columns, status } from "../data/columns";
import { schema } from "../data/schema";

const permission = usePermissionQueryOption();
const crudConfig = useCrudConfig(
    "Roles", // title
    "Role", // subtitle
    "solar:key-outline", // icon
    {
        // permissions
        create: "create role",
        delete: "delete role",
        edit: "edit role",
        view: "view role",
    },
);
const formSchema = computed(() =>
    schema(permission.permissionOptions, permission.searchPermissions),
);
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
                permission.initializePermissions();
                return {
                    id: role.id || "",
                    name: role.name,
                    permissions: permissionIds,
                };
            } else {
                permission.initializePermissions();
                return {
                    id: "",
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
