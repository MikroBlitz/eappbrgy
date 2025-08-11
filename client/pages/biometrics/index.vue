<template>
    <div class="pt-2 md:px-4 px-2">
        <UTabs
            :ui="{
                list: {
                    base: 'relative flex whitespace-nowrap max-w-xl',
                },
            }"
            :items="items"
        >
            <template #manage-bio>
                <ManageBiometric />
            </template>
            <template #manage-dtr>
                <ManageDtr />
            </template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import ManageBiometric from "./components/manage-biometric.vue";
import ManageDtr from "./components/manage-dtr.vue";

const items = [
    {
        icon: "solar:face-scan-square-broken",
        label: "Biometric",
        slot: "manage-bio",
    },
    {
        icon: "solar:documents-minimalistic-broken",
        label: "DTR",
        slot: "manage-dtr",
    },
];

definePageMeta({ layout: "app-layout", permission: "view biometric" });

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
