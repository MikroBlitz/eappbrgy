<template>
    <Biometric />
</template>

<script setup>
import Biometric from "./components/biometric.vue";

definePageMeta({ layout: "app-layout", permission: ["view biometric"] });

const route = useRoute();
const routeName = computed(() => route.name ?? "Page");
const { appTitle, metaDescription } = useConstants();
useHead({
    meta: [{ content: metaDescription, name: "description" }],
    title: `${appTitle} - ${toTitleCase(String(routeName.value))}`,
});
</script>
