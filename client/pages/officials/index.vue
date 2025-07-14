<template>
    <ManageOfficial />
</template>

<script setup lang="ts">
import ManageOfficial from "./components/manage-official.vue";

definePageMeta({ layout: "app-layout", permission: "view official" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Officials",
});
</script>
