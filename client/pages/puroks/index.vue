<template>
    <ManagePurok />
</template>

<script setup lang="ts">
import ManagePurok from "./components/manage-purok.vue";

definePageMeta({ layout: "app-layout", permission: "view puroks" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "BarangayConnect - Puroks",
});
</script>
