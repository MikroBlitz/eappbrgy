<template>
    <div
        class="h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden"
    >
        <nav
            class="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
        >
            <div class="flex items-center">
                <span class="text-emerald-500 font-bold text-xl"
                    >Market<span class="text-slate-900 dark:text-white"
                        >Hub</span
                    ></span
                >
            </div>
            <ClientOnly>
                <UButton
                    :icon="
                        !isDark
                            ? 'i-heroicons-sun-20-solid'
                            : 'i-heroicons-moon-20-solid'
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
        </nav>

        <div
            class="flex-1 flex items-center justify-center relative overflow-hidden"
        >
            <!-- Background gradient circles -->
            <div
                class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500 rounded-lg opacity-5 dark:opacity-10 blur-3xl"
            />
            <div
                class="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500 rounded-lg opacity-5 dark:opacity-10 blur-3xl"
            />

            <div class="max-w-2xl mx-auto px-6 text-center z-10">
                <div class="inline-block mb-4">
                    <span
                        class="bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs px-3 py-1 rounded-lg"
                    >
                        Community Marketplace
                    </span>
                </div>

                <h1
                    class="text-4xl md:text-5xl font-bold pb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                    Trading Made
                    <span class="text-emerald-500 dark:text-emerald-400"
                        >Simple</span
                    >
                </h1>

                <p
                    class="text-sm text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                >
                    Connect with buyers and sellers in a seamless ecosystem
                    built for community-driven trading experiences.
                </p>

                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <UButton
                        class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg px-6 py-2"
                        @click="navigateTo('/login')"
                    >
                        Get Started
                    </UButton>
                    <UButton
                        variant="ghost"
                        class="text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-700 rounded-lg px-6 py-2 hover:border-emerald-500 hover:text-emerald-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                        @click="navigateTo('/dashboard')"
                    >
                        Try Demo
                    </UButton>
                </div>
            </div>
        </div>

        <footer
            class="py-4 px-6 border-t border-gray-200 dark:border-gray-800 text-center"
        >
            <div class="flex justify-center space-x-6 mb-3">
                <a
                    href="https://github.com/maktezi"
                    class="text-slate-500 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                    <UIcon name="i-simple-icons-github" size="sm" />
                </a>
                <a
                    href="#"
                    class="text-slate-500 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                    <UIcon name="i-simple-icons-twitter" size="sm" />
                </a>
                <a
                    href="#"
                    class="text-slate-500 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                    <UIcon name="i-simple-icons-discord" size="sm" />
                </a>
            </div>
            <p class="text-xs text-slate-500 dark:text-gray-500">
                © {{ getYear() }} MarketHub. All rights reserved.
            </p>
        </footer>
    </div>
</template>

<script setup lang="ts">
const getYear = () => new Date().getFullYear();
const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});

useHead({
    meta: [
        {
            content:
                "A secure platform connecting buyers and sellers in a community-driven ecosystem.",
            name: "description",
        },
    ],
    title: "MarketHub - Community Marketplace",
});
</script>
