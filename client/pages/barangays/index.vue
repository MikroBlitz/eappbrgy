<template>
    <ManageBarangay />
</template>

<script setup lang="ts">
import ManageBarangay from "./components/manage-barangay.vue";

definePageMeta({ layout: "app-layout", permission: "view barangay" });

const route = useRoute();
const routeName = computed(() => route.name ?? "Page");
const { appTitle, metaDescription } = useConstants();
useHead({
    meta: [
        {
            content: metaDescription,
            name: "description",
        },
    ],
    title: `${appTitle} - ${toTitleCase(String(routeName.value))}`,
});
</script>
