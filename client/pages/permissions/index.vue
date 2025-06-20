<template>
    <ManagePermission />
</template>

<script setup lang="ts">
import ManagePermission from "./components/manage-permission.vue";

definePageMeta({ layout: "app-layout", permission: "view permission" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Permissions",
});
</script>
