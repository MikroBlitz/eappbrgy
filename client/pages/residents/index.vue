<template>
    <ManageResident />
</template>

<script setup lang="ts">
import ManageResident from "./components/manage-resident.vue";

definePageMeta({ layout: "app-layout", permission: "view resident" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "BarangayConnect - Residents",
});
</script>
