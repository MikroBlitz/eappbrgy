<template>
    <ManageDocument />
</template>

<script setup lang="ts">
import ManageDocument from "./components/manage-document.vue";

definePageMeta({ layout: "app-layout", permission: "view document" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Documents",
});
</script>
