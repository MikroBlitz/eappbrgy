<template>
    <header
        class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-3 sticky top-0 z-50"
    >
        <div class="flex items-center justify-between max-w-full">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center gap-2">
                <!-- User Profile Dropdown -->
                <UDropdown
                    :items="userMenuItems"
                    class="flex items-center hover:bg-slate-100/70 dark:hover:bg-slate-800/70 rounded-lg p-1 transition-colors duration-200"
                >
                    <div class="flex items-center gap-2 cursor-pointer">
                        <UAvatar
                            :src="'https://cdn.pixabay.com/photo/2024/06/21/10/50/ai-generated-8844136_1280.png'"
                            :alt="auth.user?.name || 'User Avatar'"
                            size="sm"
                            class="ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-primary/50 transition-all duration-200"
                        />

                        <div
                            class="hidden sm:flex flex-col items-start min-w-0"
                        >
                            <span
                                class="text-sm text-slate-900 dark:text-slate-100 font-medium truncate max-w-24"
                                :title="auth.user?.name || 'No Name'"
                            >
                                {{ auth.user?.name || "No Name" }}
                            </span>
                            <span
                                class="text-xs text-slate-600 dark:text-slate-400 truncate max-w-24"
                                :title="auth.user?.roles?.[0]?.name || 'User'"
                            >
                                {{ auth.user?.roles?.[0]?.name || "User" }}
                            </span>
                        </div>

                        <UIcon
                            name="solar:alt-arrow-down-bold"
                            class="w-4 h-4 text-slate-400 dark:text-slate-500 hidden sm:block transition-transform duration-200 group-hover:rotate-180"
                        />
                    </div>
                </UDropdown>

                <!-- Notification Bell -->
                <div class="relative">
                    <Notification />
                </div>

                <!-- Theme Toggle -->
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
const auth = useAuthStore();
const isDark = inject("isDark");
const { userMenuItems } = useLinks();
</script>
