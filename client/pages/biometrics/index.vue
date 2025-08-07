<template>
    <div class="p-4">
        <div
            class="flex flex-col lg:flex-row items-center max-w-[1600px] gap-4 mt-4 w-full mx-auto"
        >
            <!-- Clock -->
            <div class="w-full lg:flex-1">
                <div class="text-center p-4 sm:p-8 lg:p-20 lg:px-56">
                    <!-- Time Display -->
                    <div class="relative lg:pr-16 lg:pt-4 inline-block">
                        <!-- Main Time -->
                        <div
                            class="font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] text-gray-800 dark:text-gray-100 tracking-tight leading-none"
                        >
                            {{ hourMinute }}
                        </div>

                        <!-- Date -->
                        <div
                            class="text-sm sm:text-base md:text-lg lg:text-[2rem] text-gray-800 dark:text-gray-100 mb-2 lg:mb-0 lg:absolute lg:top-0 lg:left-0"
                        >
                            {{ currentDate }}
                        </div>

                        <!-- AM/PM -->
                        <div
                            class="flex justify-center gap-4 mt-2 lg:mt-0 text-gray-800 dark:text-gray-100"
                        >
                            <div
                                class="text-lg sm:text-xl md:text-2xl lg:text-[2.5rem] lg:absolute lg:top-11 lg:right-0"
                            >
                                {{ ampm }}
                            </div>
                            <div
                                class="text-lg sm:text-xl md:text-2xl lg:text-[2.5rem] lg:absolute lg:bottom-4 lg:right-0"
                            >
                                {{ seconds }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div
                    class="flex flex-col sm:flex-row items-center justify-center gap-2 p-5 w-full mx-auto"
                >
                    <UButton
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                    >
                        Time In (AM)
                    </UButton>
                    <UButton
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                    >
                        Time Out (AM)
                    </UButton>
                    <UButton
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                    >
                        Time In (PM)
                    </UButton>
                    <UButton
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                    >
                        Time Out (PM)
                    </UButton>
                </div>
            </div>

            <div class="w-full lg:w-auto">
                <BiometricComp
                    :has-detect-face="false"
                    :has-recognize-face="true"
                />
            </div>
        </div>

        <div class="mt-4">
            <ManageAttendance />
        </div>
    </div>
</template>

<script setup lang="ts">
import ManageAttendance from "./components/manage-attendance.vue";

definePageMeta({ layout: "app-layout", permission: ["view biometric"] });

const route = useRoute();
const routeName = computed(() => route.name ?? "Page");
const { appTitle, metaDescription } = useConstants();
useHead({
    meta: [{ content: metaDescription, name: "description" }],
    title: `${appTitle} - ${toTitleCase(String(routeName.value))}`,
});

// Clock functionality
const currentTime = ref("");
const currentDate = ref("");

// Computed: "03:21"
const hourMinute = computed(() => {
    const parts = currentTime.value.split(":");
    return `${parts[0]}:${parts[1]}`;
});

// Computed: "AM" or "PM"
const ampm = computed(() => {
    const parts = currentTime.value.split(":");
    return parts[2]?.slice(3) ?? "";
});

const seconds = computed(() => {
    return currentTime.value.split(":")[2]?.slice(0, 2) ?? "--";
});

let timeInterval = null;

const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
        second: "2-digit",
    });
    currentDate.value = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        weekday: "long",
        year: "numeric",
    });
};

onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});
</script>
