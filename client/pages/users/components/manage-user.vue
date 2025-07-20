<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="status"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
        :option-loading="roleSearch.loadingOptions"
        :actions="customActions"
    />
</template>

<script setup lang="ts">
import type { User } from "~/types/codegen/graphql";

import { rolesPaginate } from "~/graphql/Role";
import {
    usersPaginate,
    upsertUser,
    deleteUser,
    updateUserStatus,
} from "~/graphql/User";

import { columns, status } from "../data/user/columns";
import { schema } from "../data/user/schema";

const permission = "user";
const crudConfig = useCrudConfig(
    "Users", // title
    "User", // subtitle
    "solar:users-group-rounded-outline", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        updateStatus: "update user status",
        view: `view ${permission}`,
    },
    true, // is_active button
);

// Role Search Option
const roleSearch = useSearchQueryOptions(rolesPaginate, {
    queryKey: "rolesPaginate",
});

const formSchema = computed(() =>
    schema({
        role: {
            onSearch: roleSearch.debouncedSearch,
            options: roleSearch.queryOptions,
        },
    }),
);
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
                // This is for editing data
                const roleIds = user.roles
                    ? user.roles.map((role) => role?.id)
                    : [];
                roleSearch.initializeOptions();
                return {
                    email: user.email || "",
                    first_name: user.first_name || "",
                    id: user.id,
                    is_active: user.is_active || false,
                    last_name: user.last_name || "",
                    middle_name: user.middle_name || "",
                    password: "",
                    phone: user.phone || "",
                    roles: roleIds,
                };
            } else {
                // This is adding data
                roleSearch.initializeOptions();
                return {
                    email: "",
                    first_name: "",
                    id: undefined,
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

// Custom actions
const customActions = [
    {
        color: () => "orange",
        condition: () => true,
        icon: () => "solar:file-download-broken",
        onClick: (row: User) => customFunction(row),
        tooltip: (row: User) => `Log the Data ${row.name}`,
    },
];
const customFunction = (user: User) => {
    console.log("User Row Data:", user);
    useToast().add({
        color: "green",
        description: `Row data for ${user.name} logged to console`,
        title: "Custom Action Triggered",
    });
};
</script>
