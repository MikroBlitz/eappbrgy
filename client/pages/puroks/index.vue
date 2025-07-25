<template>
    <ManagePurok />
</template>

<script setup lang="ts">
import ManagePurok from "./components/manage-purok.vue";

definePageMeta({ layout: "app-layout", permission: "view purok" });

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
