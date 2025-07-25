<template>
    <ManageOfficial />
</template>

<script setup lang="ts">
import ManageOfficial from "./components/manage-official.vue";

definePageMeta({ layout: "app-layout", permission: "view official" });

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
