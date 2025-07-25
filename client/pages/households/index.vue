<template>
    <ManageHousehold />
</template>

<script setup lang="ts">
import ManageHousehold from "./components/manage-household.vue";

definePageMeta({ layout: "app-layout", permission: "view household" });

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
