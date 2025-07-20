<template>
    <div class="pt-2 md:px-4 px-2">
        <UTabs
            :ui="{
                list: {
                    base: 'relative flex whitespace-nowrap max-w-xl',
                },
            }"
            :items="items"
        >
            <template #manage-user>
                <ManageUser />
            </template>
            <template #manage-role>
                <ManageRole />
            </template>
            <template #manage-permission>
                <ManagePermission />
            </template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import ManagePermission from "./components/manage-permission.vue";
import ManageRole from "./components/manage-role.vue";
import ManageUser from "./components/manage-user.vue";

const items = [
    {
        icon: "solar:users-group-rounded-outline",
        label: "Users",
        slot: "manage-user",
    },
    {
        icon: "solar:key-outline",
        label: "Roles",
        slot: "manage-role",
    },
    {
        icon: "solar:lock-outline",
        label: "Permissions",
        slot: "manage-permission",
    },
];

definePageMeta({
    layout: "app-layout",
    permission: ["view user", "view role", "view permission"],
});
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Users, Roles and Permissions",
});
</script>
