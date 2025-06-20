<template>
    <ManageMessages />
</template>

<script setup lang="ts">
import ManageMessages from "./components/manage-messages.vue";

definePageMeta({ layout: "default", permission: "view messages" });
useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Messages",
});
</script>
