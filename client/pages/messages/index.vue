<template>
    <ManageMessages />
</template>

<script setup lang="ts">
import ManageMessages from "./components/manage-messages.vue";

definePageMeta({ layout: "default" });

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
