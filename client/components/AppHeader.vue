<template>
    <header
        class="bg-green-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 px-4"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center space-x-4">
                <UButton
                    icon="solar:bell-broken"
                    :color="isDark ? 'primary' : 'gray'"
                    variant="ghost"
                    :trailing="false"
                    class="hover:bg-transparent hover:scale-110 transition-all duration-300"
                />

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark ? 'solar:moon-broken' : 'solar:sun-broken'
                        "
                        :color="isDark ? 'primary' : 'gray'"
                        variant="ghost"
                        aria-label="Theme"
                        class="hover:bg-transparent hover:scale-110 transition-all duration-300"
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
