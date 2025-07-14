<template>
    <ManageBlotter />
</template>

<script setup lang="ts">
import ManageBlotter from "./components/manage-blotter.vue";

definePageMeta({ layout: "app-layout", permission: "view blotter" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Blotters",
});
</script>
