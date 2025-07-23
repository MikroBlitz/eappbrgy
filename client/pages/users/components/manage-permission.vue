<template>
    <CrudTable :table-data="tableData" :default-view-modal="false" />
</template>

<script setup lang="ts">
import type { Permission } from "~/types/codegen/graphql";

import {
    permissionsPaginate,
    upsertPermission,
    deletePermission,
} from "~/graphql/Permission";

import { columns, filter as filters } from "../data/permission/columns";
import { schema } from "../data/permission/schema";

const permission = "permission";
const formSchema = computed(() => schema());
const zodSchema = computed(() => formZodSchema(formSchema.value));

const tableData = useTableData<Permission>(
    {
        icon: "solar:lock-outline",
        permissions: {
            create: `create ${permission}`,
            delete: `delete ${permission}`,
            edit: `edit ${permission}`,
            view: `view ${permission}`,
        },
        singular: "Permission",
        title: "Permissions",
    },
    {
        delete: deletePermission,
        paginate: permissionsPaginate,
        upsert: upsertPermission,
    },
    {
        columns,
        filters,
        formSchema: formSchema.value,
        getFormState: (permission?: Permission) =>
            permission
                ? {
                      id: permission.id,
                      name: permission.name,
                  }
                : {
                      id: undefined,
                      name: "",
                  },
        prepareSubmitData: (data, selectedPermission?: Permission) => ({
            ...data,
            guard_name: "web",
            id: selectedPermission?.id,
        }),
        zodSchema: zodSchema.value,
    },
);
</script>
