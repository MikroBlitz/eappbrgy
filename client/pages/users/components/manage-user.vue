<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="status"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="role.loadingRoles"
    />
</template>

<script setup lang="ts">
import type { User } from "~/types/codegen/graphql";

import {
    usersPaginate,
    upsertUser,
    deleteUser,
    updateUserStatus,
} from "~/graphql/User";

import { columns, status } from "../data/columns";
import { schema } from "../data/schema";

const role = useRoleQueryOption();
const crudConfig = useCrudConfig(
    "Users", // title
    "User", // subtitle
    "solar:users-group-rounded-outline", // icon
    {
        // permissions
        create: "create user",
        delete: "delete user",
        edit: "edit user",
        updateStatus: "update user status",
        view: "view user",
    },
    true, // is_active button
);
const formSchema = computed(() => schema(role.roleOptions, role.searchRoles));
const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<User>(
    {
        delete: deleteUser,
        paginate: usersPaginate,
        updateStatus: updateUserStatus,
        upsert: upsertUser,
    },
    {
        getFormState: (user?: User) => {
            if (user) {
                const roleIds = user.roles
                    ? user.roles.map((role) => role?.id)
                    : [];
                role.initializeRoles();
                return {
                    email: user.email || "",
                    first_name: user.first_name || "",
                    id: user.id || "",
                    is_active: user.is_active || false,
                    last_name: user.last_name || "",
                    middle_name: user.middle_name || "",
                    password: "",
                    phone: user.phone || "",
                    roles: roleIds,
                };
            } else {
                role.initializeRoles();
                return {
                    email: "",
                    first_name: "",
                    id: "",
                    is_active: false,
                    last_name: "",
                    middle_name: "",
                    password: "",
                    phone: "",
                    roles: [],
                };
            }
        },
        prepareSubmitData: (data: any, selectedUser?: User) => {
            let roles: string[] = [];
            if (data.roles) {
                roles = Array.isArray(data.roles) ? data.roles : [data.roles];
            }

            return {
                ...data,
                id: selectedUser?.id || undefined,
                password: data.password || selectedUser?.password,
                roles: { sync: roles },
            };
        },
    },
);
</script>
