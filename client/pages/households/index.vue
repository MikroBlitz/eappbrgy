<template>
    <ManageHousehold />
</template>

<script setup lang="ts">
import ManageHousehold from "./components/manage-household.vue";

definePageMeta({ layout: "app-layout", permission: "view household" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "BarangayConnect - Households",
});
</script>
