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
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Users",
});
</script>
