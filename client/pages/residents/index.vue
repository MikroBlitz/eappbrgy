<template>
    <ManageResident />
</template>

<script setup lang="ts">
import ManageResident from "./components/manage-resident.vue";

definePageMeta({ layout: "app-layout", permission: "view resident" });

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
