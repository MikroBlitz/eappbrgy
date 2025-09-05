<template>
    <div class="p-4">
        <div
            class="flex p-2 lg:p-0 items-center max-w-[1600px] gap-4 mt-4 w-full mx-auto"
        >
            <!-- Clock Section -->
            <div class="w-full lg:flex-1">
                <ClockDisplay />

                <!-- Buttons -->
                <div
                    class="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 w-full mx-auto"
                >
                    <!--  v-if="activeButton === 'am_time_in'"  -->
                    <UButton
                        :disabled="isLoading"
                        size="xl"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('am_time_in')"
                    >
                        Time In (AM)
                    </UButton>

                    <!--  v-else-if="activeButton === 'am_time_out_pm_time_in'"  -->
                    <UButton
                        :disabled="isLoading"
                        size="xl"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('am_time_out')"
                    >
                        Time Out (AM)
                    </UButton>

                    <UButton
                        :disabled="isLoading"
                        size="xl"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('pm_time_in')"
                    >
                        Time In (PM)
                    </UButton>

                    <!--  v-else-if="activeButton === 'pm_time_out'" -->
                    <UButton
                        :disabled="isLoading"
                        size="xl"
                        class="w-full sm:w-auto text-sm sm:text-base"
                        @click="() => handleButtonClick('pm_time_out')"
                    >
                        Time Out (PM)
                    </UButton>

                    <!--                    <span-->
                    <!--                        v-if="!activeButton"-->
                    <!--                        class="text-gray-600 dark:text-gray-400"-->
                    <!--                        >No available action at this time. Please come back-->
                    <!--                        tomorrow.-->
                    <!--                    </span>-->
                </div>
            </div>

            <!--  v-if="activeButton"  -->
            <div class="w-full lg:w-auto">
                <BiometricComp
                    ref="biometricRef"
                    :has-detect-face="false"
                    :has-recognize-face="false"
                    @recognize-scanned-face="onRecognized"
                />
            </div>
        </div>

        <!--  v-if="activeButton" -->
        <div class="mt-4">
            <ManageAttendance ref="manageAttendanceRef" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "#ui/composables/useToast";

import { findAttendanceByDate, upsertAttendance } from "~/graphql/Attendance";

import { formatAttendanceLabel, isBetween } from "../utils/helpers";
import ClockDisplay from "./clock-display.vue";
import ManageAttendance from "./manage-attendance.vue";

const toast = useToast();

const manageAttendanceRef = ref();
const biometricRef = ref();
const selectedType = ref<
    null | "am_time_in" | "am_time_out" | "pm_time_in" | "pm_time_out"
>(null);
const isLoading = ref(false);

function handleButtonClick(type: typeof selectedType.value) {
    selectedType.value = type;
    biometricRef.value?.recognizeFaceHandler?.();
}

async function onRecognized(userId: string) {
    isLoading.value = true;

    if (!selectedType.value) {
        toast.add({
            color: "amber",
            title: "No action selected",
        });
        return;
    }

    const now = new Date();
    const fullDateTime = formatDateTimeForGraphQL(now);
    const dateOnly = now.toISOString().split("T")[0];

    try {
        const { refetch } = useQuery(
            findAttendanceByDate,
            {},
            { fetchPolicy: "network-only" },
        );

        const res = await refetch({
            date: dateOnly,
            user_id: userId,
        });

        const existingId = res?.data?.attendanceByDate?.id;

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
        isLoading.value = false;
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

// const activeButton = computed(() => {
//     if (isBetween("06:00", "09:59")) return "am_time_in";
//     if (isBetween("10:00", "14:59")) return "am_time_out_pm_time_in";
//     if (isBetween("15:00", "19:00")) return "pm_time_out";
//     return null;
// });
</script>
