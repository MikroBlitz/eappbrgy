<template>
    <ManageMessages />
</template>

<script setup lang="ts">
import ManageMessages from "./components/manage-messages.vue";

definePageMeta({ layout: "default" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Messages",
});
</script>
