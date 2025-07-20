<template>
    <header
        class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2.5"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <AppSidebar />
            </div>

            <div class="flex items-center gap-3 pr-2">
                <Notification />

                <ClientOnly>
                    <UButton
                        :icon="
                            isDark ? 'solar:moon-broken' : 'solar:sun-2-bold'
                        "
                        variant="ghost"
                        :color="isDark ? 'primary' : 'warning'"
                        aria-label="Theme"
                        class="hover:bg-transparent hover:scale-110 transition-all duration-300 p-1 cursor-pointer"
                        size="xl"
                        @click="isDark = !isDark"
                    />
                    <template #fallback>
                        <div class="w-8 h-8" />
                    </template>
                </ClientOnly>

                <UPopover
                    class="ml-2"
                    :content="{
                        align: 'end',
                        side: 'bottom',
                    }"
                >
                    <!-- Trigger -->
                    <UAvatar
                        :src="'https://images.pexels.com/photos/8107821/pexels-photo-8107821.jpeg'"
                        size="sm"
                        class="cursor-pointer hover:scale-105 transition-transform duration-200"
                    />

                    <!-- Popover Content -->
                    <template #content>
                        <div
                            class="flex flex-col w-48 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                        >
                            <div
                                class="px-3 py-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                                {{ auth.user?.name || "Guest" }}
                            </div>
                            <hr
                                class="my-1 border-gray-200 dark:border-gray-700"
                            />

                            <UButton
                                color="neutral"
                                variant="ghost"
                                icon="solar:logout-outline"
                                class="justify-start cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-300"
                                @click="handleLogout"
                            >
                                Logout
                            </UButton>
                        </div>
                    </template>
                </UPopover>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/shared";
import { useToast } from "#ui/composables/useToast";
defineEmits(["toggle-sidebar"]);

const isDark = inject("isDark");
const toast = useToast();
const auth = useAuthStore();

async function handleLogout() {
    await auth.logout();
    useTimeoutFn(() => {
        toast.add({
            icon: "solar:check-circle-outline",
            title: "Logged out successfully",
        });
    }, 500);
}
</script>
