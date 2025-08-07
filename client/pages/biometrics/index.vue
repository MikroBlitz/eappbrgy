<template>
    <div>
        <div
            class="flex items-center max-w-[1600px] w-full mx-auto justify-between"
        >
            <div>
                <BiometricComp :has-recognize-face="true" />

                <div
                    class="flex items-center justify-evenly p-2 w-full mx-auto"
                >
                    <UButton size="xl" variant="outline">
                        Time In (AM)
                    </UButton>
                    <UButton size="xl" variant="outline">
                        Time Out (AM)
                    </UButton>
                    <UButton size="xl" variant="outline">
                        Time In (PM)
                    </UButton>
                    <UButton size="xl" variant="outline">
                        Time In (PM)
                    </UButton>
                </div>
            </div>

            <!-- Clock -->
            <div class="flex justify-between items-center">
                <div class="text-center p-20 md:px-56">
                    <span
                        class="text-gray-800 text-[2rem] dark:text-gray-100"
                        >{{ currentDate }}</span
                    >
                    <!-- Time Display -->
                    <div
                        class="font-bold text-[10rem] text-gray-800 dark:text-gray-100 tracking-tight leading-none max-md:text-[2.5rem]"
                    >
                        {{ hourMinute }}
                    </div>
                    <!-- Seconds and Date -->
                    <div
                        class="text-gray-800 dark:text-gray-100 text-[2.5rem] mt-1"
                    >
                        {{ seconds }}
                    </div>
                </div>
            </div>
        </div>

        <ManageAttendance />
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
const hourMinute = computed(() =>
    currentTime.value.split(":").slice(0, 2).join(":"),
);
const seconds = computed(() => currentTime.value.split(":")[2] ?? "--");
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
