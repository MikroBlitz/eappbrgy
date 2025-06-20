<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <UNotifications />
</template>
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isMobile = ref(false);
const auth = useAuthStore();
const isAdmin = computed(() => auth.user?.is_admin);

provide("isMobile", isMobile);
provide("isAdmin", isAdmin);

onMounted(() => {
    const mediaQuery = useMediaQuery("(max-width: 768px)");
    isMobile.value = mediaQuery.value;

    watch(mediaQuery, (newValue) => {
        isMobile.value = newValue;
    });
});
</script>
