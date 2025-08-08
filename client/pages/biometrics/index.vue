<template>
    <div class="p-4">
        <div
            class="flex flex-col lg:flex-row items-center max-w-[1600px] gap-4 mt-4 w-full mx-auto"
        >
            <!-- Clock Section -->
            <div class="w-full lg:flex-1">
                <ClockDisplay />

                <!-- Buttons -->
                <div
                    class="flex flex-col sm:flex-row items-center justify-center gap-2 p-5 w-full mx-auto"
                >
                    <UButton
                        v-if="activeButton === 'am_time_in'"
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('am_time_in')"
                    >
                        Time In (AM)
                    </UButton>

                    <UButton
                        v-else-if="activeButton === 'am_time_out'"
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('am_time_out')"
                    >
                        Time Out (AM)
                    </UButton>

                    <UButton
                        v-else-if="activeButton === 'pm_time_in'"
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('pm_time_in')"
                    >
                        Time In (PM)
                    </UButton>

                    <UButton
                        v-else-if="activeButton === 'pm_time_out'"
                        size="xl"
                        variant="outline"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('pm_time_out')"
                    >
                        Time Out (PM)
                    </UButton>

                    <span v-else class="text-gray-600 dark:text-gray-400"
                        >No available action at this time. Please come back
                        tomorrow.</span
                    >
                </div>
            </div>

            <div v-if="activeButton" class="w-full lg:w-auto">
                <BiometricComp
                    ref="biometricRef"
                    :has-detect-face="false"
                    :has-recognize-face="false"
                    @recognize-scanned-face="onRecognized"
                />
            </div>
        </div>

        <div v-if="activeButton" class="mt-4">
            <ManageAttendance ref="manageAttendanceRef" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import { findAttendanceByDate, upsertAttendance } from "~/graphql/Attendance";

import ClockDisplay from "./components/clock-display.vue";
import ManageAttendance from "./components/manage-attendance.vue";
import { formatAttendanceLabel } from "./utils/helpers";

definePageMeta({ layout: "app-layout", permission: ["view biometric"] });

const toast = useToast();
const route = useRoute();
const routeName = computed(() => route.name ?? "Page");
const { appTitle, metaDescription } = useConstants();
useHead({
    meta: [{ content: metaDescription, name: "description" }],
    title: `${appTitle} - ${toTitleCase(String(routeName.value))}`,
});

const manageAttendanceRef = ref();
const biometricRef = ref();
const selectedType = ref<
    null | "am_time_in" | "am_time_out" | "pm_time_in" | "pm_time_out"
>(null);

function handleButtonClick(type: typeof selectedType.value) {
    selectedType.value = type;
    biometricRef.value?.recognizeFaceHandler?.();
}

async function onRecognized(userId: string) {
    if (!selectedType.value) {
        toast.add({
            color: "amber",
            description: "Please click a button before recognizing a face.",
            title: "No action selected",
        });
        return;
    }

    const now = new Date();
    const fullDateTime = formatDateTimeForGraphQL(now);
    const dateOnly = now.toISOString().split("T")[0];

    try {
        const { refetch, result: data } = useQuery(findAttendanceByDate, {
            date: dateOnly,
            user_id: userId,
        });

        const existingId = data.value?.attendanceByDate?.id;

        const input: Record<string, any> = {
            date: fullDateTime,
            [selectedType.value]: fullDateTime,
            user: { connect: userId },
        };

        if (existingId) input.id = existingId;

        const { mutate } = useMutation(upsertAttendance);
        const { data: mutationData } = await mutate({ input });

        if (mutationData?.upsertAttendance) {
            toast.add({
                color: "green",
                title: formatAttendanceLabel(selectedType.value, !!existingId),
            });
        }
        refetch();
    } catch (error) {
        console.error(error);
        toast.add({
            color: "red",
            description: "Failed to submit attendance.",
            title: "Error",
        });
    } finally {
        selectedType.value = null;
        manageAttendanceRef.value?.refetch?.();
    }
}

const now = ref<Date>(new Date());
let interval: ReturnType<typeof setInterval>;
onMounted(() => {
    interval = setInterval(() => {
        now.value = new Date();
    }, 60000);
});
onBeforeUnmount(() => clearInterval(interval));
function isBetween(start: string, end: string): boolean {
    const current = now.value;
    const startTime = new Date(current);
    const endTime = new Date(current);

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    startTime.setHours(sh, sm, 0, 0);
    endTime.setHours(eh, em, 59, 999);

    return current >= startTime && current <= endTime;
}

const activeButton = computed(() => {
    if (isBetween("06:00", "09:59")) return "am_time_in";
    if (isBetween("10:00", "12:00")) return "am_time_out";
    if (isBetween("12:15", "14:59")) return "pm_time_in";
    if (isBetween("15:00", "19:00")) return "pm_time_out";
    return null;
});
</script>
