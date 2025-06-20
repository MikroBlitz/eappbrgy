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
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "BarangayConnect - Roles",
});
</script>
