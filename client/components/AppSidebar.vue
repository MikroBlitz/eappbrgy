<template>
    <div>
        <USlideover
            v-model:open="isOpen"
            :close="{
                color: 'primary',
                variant: 'outline',
                class: 'rounded-full',
            }"
            side="left"
        >
            <UButton
                icon="solar:hamburger-menu-broken"
                variant="ghost"
                color="primary"
                size="xl"
                class="w-full justify-start hover:bg-transparent hover:scale-110 transition-all duration-300 p-2 cursor-pointer"
                @click="isOpen = true"
            />

            <template #content>
                <div
                    class="flex flex-col h-full border-r border-gray-200 dark:border-gray-800 shadow-xl"
                >
                    <div
                        class="px-4 py-5 border-b border-gray-200 dark:border-gray-800"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <UIcon
                                    name="solar:people-nearby-broken"
                                    class="h-6 w-6 text-green-600"
                                />
                                <h2
                                    class="ml-2 text-xl font-bold text-gray-800 dark:text-gray-100"
                                >
                                    Govana
                                </h2>
                            </div>
                            <UButton
                                icon="i-heroicons-x-mark"
                                variant="outline"
                                color="error"
                                size="sm"
                                class="rounded-full cursor-pointer"
                                aria-label="Close sidebar"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto py-4 px-8">
                        <nav>
                            <ul class="space-y-1.5">
                                <li
                                    v-for="(item, index) in mainMenuItems"
                                    :key="index"
                                >
                                    <UButton
                                        v-if="item.permission"
                                        :to="item.to"
                                        :icon="item.icon"
                                        :color="
                                            isActive(item.to)
                                                ? 'success'
                                                : 'neutral'
                                        "
                                        :variant="
                                            isActive(item.to) ? 'soft' : 'ghost'
                                        "
                                        :class="
                                            isActive(item.to) ? 'scale-105' : ''
                                        "
                                        class="w-full justify-start py-2 px-4 hover:scale-105 transition-all duration-300"
                                        square
                                        padded
                                        @click="isOpen = false"
                                    >
                                        {{ item.label }}
                                    </UButton>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { mainMenuItems } = useLinks();
const isOpen = ref(false);

const isActive = (path: string) => route.path === path;
</script>
