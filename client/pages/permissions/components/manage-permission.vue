<template>
    <CrudTable
        :config="crudConfig"
        :columns="columns"
        :filters="filter"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :operations="operations"
    />
</template>

<script setup lang="ts">
import type { Permission } from "~/types/codegen/graphql";

import {
    permissionsPaginate,
    upsertPermission,
    deletePermission,
} from "~/graphql/Permission";

import { columns, filter } from "../data/columns";
import { schema } from "../data/schema";

const permission = "permission";
const crudConfig = useCrudConfig(
    "Permissions", // title
    "Permission", // subtitle
    "solar:lock-outline", // icon
    {
        // permissions
        create: `create ${permission}`,
        delete: `delete ${permission}`,
        edit: `edit ${permission}`,
        view: `view ${permission}`,
    },
);
const formSchema = computed(() => schema());
const zodSchema = computed(() => formZodSchema(formSchema.value));

const operations = useCrudOperations<Permission>(
    {
        delete: deletePermission,
        paginate: permissionsPaginate,
        upsert: upsertPermission,
    },
    {
        getFormState: (permission?: Permission) => {
            if (permission) {
                return {
                    id: permission.id,
                    name: permission.name,
                };
            } else {
                return {
                    id: undefined,
                    name: "",
                };
            }
        },
        prepareSubmitData: (data: any, selectedPermission?: Permission) => {
            return {
                ...data,
                guard_name: "web",
                id: selectedPermission?.id || undefined,
            };
        },
    },
);
</script>
