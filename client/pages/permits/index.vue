<template>
    <ManagePermit />
</template>

<script setup lang="ts">
import ManagePermit from "./components/manage-permit.vue";

definePageMeta({ layout: "app-layout", permission: "view permit" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "BarangayConnect - Permits",
});
</script>
