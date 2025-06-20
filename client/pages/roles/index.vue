<template>
    <ManageRoles />
</template>

<script setup lang="ts">
import ManageRoles from "./components/manage-role.vue";

definePageMeta({ layout: "app-layout", permission: "view role" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Roles",
});
</script>
