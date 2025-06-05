<template>
    <header
        class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2.5"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center gap-2 pr-2">
                <UButton
                    icon="solar:bell-broken"
                    variant="ghost"
                    :trailing="false"
                    class="hover:bg-transparent hover:scale-110 transition-all duration-300 p-1"
                    size="xl"
                />

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark ? 'solar:moon-broken' : 'solar:sun-2-bold'
                        "
                        variant="ghost"
                        :color="isDark ? 'primary' : 'yellow'"
                        aria-label="Theme"
                        class="hover:bg-transparent hover:scale-110 transition-all duration-300 p-1"
                        size="xl"
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

const isDark = inject("isDark");
</script>
