<template>
    <ManageBlotter />
</template>

<script setup lang="ts">
import ManageBlotter from "./components/manage-blotter.vue";

definePageMeta({ layout: "app-layout", permission: "view blotter" });

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
