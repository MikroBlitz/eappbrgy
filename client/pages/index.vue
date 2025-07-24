<template>
    <div
        class="h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden"
    >
        <FluidCursor v-if="isFuildCursorEnabled" />
        <nav
            class="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
        >
            <div class="flex items-center">
                <span class="text-blue-500 font-bold text-xl"
                    >Govana<span class="text-slate-900 dark:text-white"
                        >App</span
                    ></span
                >
            </div>
            <ClientOnly>
                <div class="gap-2 flex">
                    <UButton
                        :variant="isFuildCursorEnabled ? 'soft' : 'ghost'"
                        color="primary"
                        :icon="
                            isFuildCursorEnabled
                                ? 'solar:cursor-bold'
                                : 'solar:cursor-broken'
                        "
                        class="hover:scale-110 transition-all duration-300"
                        @click="isFuildCursorEnabled = !isFuildCursorEnabled"
                    />

                    <UButton
                        :icon="
                            !isDark
                                ? 'i-heroicons-sun-20-solid'
                                : 'i-heroicons-moon-20-solid'
                        "
                        color="primary"
                        variant="ghost"
                        aria-label="Theme"
                        class="hover:scale-110 transition-all duration-300"
                        @click="isDark = !isDark"
                    />
                </div>
            </ClientOnly>
        </nav>

        <div
            class="flex-1 flex items-center justify-center relative overflow-hidden"
        >
            <!-- Background gradient circles -->
            <div
                class="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-lg opacity-5 dark:opacity-10 blur-3xl"
            />
            <div
                class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-lg opacity-5 dark:opacity-10 blur-3xl"
            />

            <div class="max-w-2xl mx-auto px-6 text-center z-10">
                <h1
                    class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                >
                    <span
                        class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent drop-shadow-sm"
                    >
                        Govana
                    </span>
                    <span
                        class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse"
                    >
                        App
                    </span>
                </h1>

                <p
                    class="text-slate-600 text-lg dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    <span
                        class="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    >
                        Fast, secure, and convenient
                    </span>
                    digital solutions designed for your community.
                </p>

                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <UButton
                        class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg px-6 py-2"
                        @click="navigateTo('/register')"
                    >
                        Register
                    </UButton>
                    <UButton
                        variant="ghost"
                        class="text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-700 rounded-lg px-6 py-2 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400"
                        @click="navigateTo('/login')"
                    >
                        Login
                    </UButton>
                </div>

                <!-- Service highlights -->
                <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div
                        class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                        <div
                            class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-3 mx-auto"
                        >
                            <UIcon
                                name="i-heroicons-document-text"
                                class="text-blue-600 dark:text-blue-400"
                            />
                        </div>
                        <h3 class="font-semibold text-sm mb-2">Certificates</h3>
                        <p class="text-xs text-slate-600 dark:text-gray-400">
                            Barangay clearance, indigency, residency
                            certificates
                        </p>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                        <div
                            class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-3 mx-auto"
                        >
                            <UIcon
                                name="i-heroicons-megaphone"
                                class="text-blue-600 dark:text-blue-400"
                            />
                        </div>
                        <h3 class="font-semibold text-sm mb-2">
                            Announcements
                        </h3>
                        <p class="text-xs text-slate-600 dark:text-gray-400">
                            Stay updated with community news and events
                        </p>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                        <div
                            class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-3 mx-auto"
                        >
                            <UIcon
                                name="i-heroicons-chat-bubble-left-right"
                                class="text-blue-600 dark:text-blue-400"
                            />
                        </div>
                        <h3 class="font-semibold text-sm mb-2">Support</h3>
                        <p class="text-xs text-slate-600 dark:text-gray-400">
                            Report concerns and get assistance from officials
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <footer
            class="py-4 px-6 border-t border-gray-200 dark:border-gray-800 text-center"
        >
            <div class="flex justify-center space-x-6 mb-3">
                <a
                    href="#"
                    class="text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    <UIcon name="i-heroicons-phone" size="sm" />
                </a>
                <a
                    href="#"
                    class="text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    <UIcon name="i-heroicons-envelope" size="sm" />
                </a>
                <a
                    href="#"
                    class="text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    <UIcon name="i-simple-icons-facebook" size="sm" />
                </a>
            </div>
            <p class="text-xs text-slate-500 dark:text-gray-500">
                © {{ getYear() }} Govana. Serving our community digitally.
            </p>
        </footer>
    </div>
</template>

<script setup lang="ts">
const getYear = () => new Date().getFullYear();
const isFuildCursorEnabled = ref(true);
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
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Digital Barangay Services",
});
</script>
