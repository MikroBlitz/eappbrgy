<template>
    <ManageUser />
</template>

<script setup lang="ts">
import ManageUser from "./components/manage-user.vue";

definePageMeta({ layout: "app-layout", permission: "view user" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Users",
});
</script>
