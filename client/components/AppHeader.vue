<template>
    <header
        class="bg-slate-800 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center space-x-4">
                <UButton
                    icon="i-heroicons-bell"
                    color="primary"
                    variant="ghost"
                    :trailing="false"
                />

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark
                                ? 'i-heroicons-moon-20-solid'
                                : 'i-heroicons-sun-20-solid'
                        "
                        color="primary"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-8 h-8" />
                    </template>
                </ClientOnly>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
defineEmits(["toggle-sidebar"]);

const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>
