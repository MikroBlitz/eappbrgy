<template>
    <div>
        <UButton
            icon="solar:hamburger-menu-broken"
            variant="ghost"
            color="green"
            size="xl"
            class="w-full justify-start hover:bg-transparent hover:scale-110 transition-all duration-300 p-2"
            @click="isOpen = true"
        >
            <USlideover
                v-model="isOpen"
                :overlay="true"
                side="left"
                :ui="{
                    width: 'w-64 max-w-xs',
                    border: 'border-r border-gray-200 dark:border-gray-800',
                    shadow: 'shadow-xl',
                }"
            >
                <div class="flex flex-col h-full">
                    <div
                        class="px-4 py-5 border-b border-gray-200 dark:border-gray-800"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <UIcon
                                    name="mdi:connect-without-contact"
                                    class="h-6 w-6 text-green-600"
                                />
                                <h2
                                    class="ml-2 text-xl font-bold text-gray-800 dark:text-gray-100"
                                >
                                    BarangayConnect
                                </h2>
                            </div>
                            <UButton
                                icon="i-heroicons-x-mark"
                                variant="ghost"
                                color="gray"
                                size="sm"
                                class="rounded-full"
                                aria-label="Close sidebar"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto p-4">
                        <nav class="space-y-3">
                            <div>
                                <UDivider
                                    label="Menu"
                                    label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                                />
                                <ul class="mt-2 space-y-1">
                                    <li
                                        v-for="(item, index) in mainMenuItems"
                                        :key="index"
                                    >
                                        <UButton
                                            v-if="item.permission"
                                            :icon="item.icon"
                                            :to="item.to"
                                            :color="
                                                isActive(item.to)
                                                    ? 'green'
                                                    : 'gray'
                                            "
                                            :variant="
                                                isActive(item.to)
                                                    ? 'soft'
                                                    : 'ghost'
                                            "
                                            class="w-full justify-start"
                                            square
                                            padded
                                            @click="isOpen = false"
                                        >
                                            {{ item.label }}
                                        </UButton>
                                    </li>
                                </ul>
                            </div>

                            <div v-if="auth.is('Admin')">
                                <UDivider
                                    label="Admin"
                                    label-class="text-xs font-medium text-gray-500 dark:text-gray-400"
                                />
                                <ul class="mt-2 space-y-1">
                                    <li
                                        v-for="(item, index) in adminItems"
                                        :key="index"
                                    >
                                        <UButton
                                            v-if="item.permission"
                                            :icon="item.icon"
                                            :to="item.to"
                                            :color="
                                                isActive(item.to)
                                                    ? 'green'
                                                    : 'gray'
                                            "
                                            :variant="
                                                isActive(item.to)
                                                    ? 'soft'
                                                    : 'ghost'
                                            "
                                            class="w-full justify-start"
                                            square
                                            padded
                                            @click="isOpen = false"
                                        >
                                            {{ item.label }}
                                        </UButton>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div class="border-t border-gray-200 dark:border-gray-800">
                        <UDropdown :items="userMenuItems" class="w-full p-2">
                            <UAvatar
                                src="https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
                                size="sm"
                                class="cursor-pointer"
                            />

                            <template #leading>
                                <UAvatar
                                    src="/api/placeholder/40/40"
                                    alt="User"
                                    size="sm"
                                />
                            </template>

                            <div class="pl-2 flex flex-col items-start">
                                <span
                                    class="text-sm text-gray-800 dark:text-gray-200 font-medium"
                                    >{{
                                        auth.user?.name
                                            ? auth.user?.name
                                            : "No Name"
                                    }}</span
                                >
                                <span class="text-xs text-gray-500">{{
                                    auth.user?.email || "No Email"
                                }}</span>
                            </div>
                        </UDropdown>
                    </div>
                </div>
            </USlideover>
        </UButton>
    </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const route = useRoute();
const auth = useAuthStore();
const { adminItems, mainMenuItems, userMenuItems } = useLinks();

const isActive = (path: string) => {
    return route.path === path;
};

const isDark = inject("isDark");
</script>
