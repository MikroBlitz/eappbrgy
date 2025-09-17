<template>
    <div>
        <UModal
            v-model="isModalOpen"
            prevent-close
            :ui="{ width: 'w-full sm:max-w-5xl' }"
        >
            <UCard
                :ui="{
                    base: 'h-full flex flex-col',
                    ring: '',
                    divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Daily Time Record
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isModalOpen = false"
                        />
                    </div>
                    <div class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Employee:
                        <span class="text-primary">{{ employeeName }}</span>
                    </div>
                    <div class="text-sm text-gray-700 dark:text-gray-300">
                        Period: {{ startDate }} - {{ endDate }}
                    </div>

                    <div class="text-sm text-gray-700 dark:text-gray-300">
                        Total Working Days:
                        <span class="text-primary">{{ totalDays }}</span>
                    </div>
                    <div class="text-sm text-gray-700 dark:text-gray-300">
                        Total Hours:
                        <span class="text-primary">{{
                            totalHours.toFixed(2)
                        }}</span>
                    </div>
                </template>

                <div class="overflow-x-auto">
                    <table
                        class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    Date
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    AM In
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    AM Out
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    PM In
                                </th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    PM Out
                                </th>
                                <!--                                <th-->
                                <!--                                    v-if="hasAnyExtraTime1"-->
                                <!--                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"-->
                                <!--                                >-->
                                <!--                                    Extra Time 1 In-->
                                <!--                                </th>-->
                                <!--                                <th-->
                                <!--                                    v-if="hasAnyExtraTime1"-->
                                <!--                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"-->
                                <!--                                >-->
                                <!--                                    Extra Time 1 Out-->
                                <!--                                </th>-->
                                <!--                                <th-->
                                <!--                                    v-if="hasAnyExtraTime2"-->
                                <!--                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"-->
                                <!--                                >-->
                                <!--                                    Extra Time 2 In-->
                                <!--                                </th>-->
                                <!--                                <th-->
                                <!--                                    v-if="hasAnyExtraTime2"-->
                                <!--                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"-->
                                <!--                                >-->
                                <!--                                    Extra Time 2 Out-->
                                <!--                                </th>-->
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    Total Hours
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <tr
                                v-for="(attendance, index) in attendances"
                                :key="index"
                                :class="
                                    index % 2 === 0
                                        ? 'bg-white dark:bg-gray-900'
                                        : 'bg-gray-50 dark:bg-gray-800'
                                "
                            >
                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                >
                                    {{ getDateOnly(attendance.date) }}
                                </td>
                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{
                                        getFriendlyTime(
                                            attendance.am_time_in,
                                        ) || "-"
                                    }}
                                </td>
                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{
                                        getFriendlyTime(
                                            attendance.am_time_out,
                                        ) || "-"
                                    }}
                                </td>
                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{
                                        getFriendlyTime(
                                            attendance.pm_time_in,
                                        ) || "-"
                                    }}
                                </td>
                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{
                                        getFriendlyTime(
                                            attendance.pm_time_out,
                                        ) || "-"
                                    }}
                                </td>

                                <!--                                <td-->
                                <!--                                    v-if="hasExtraTime(attendance)"-->
                                <!--                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"-->
                                <!--                                >-->
                                <!--                                    {{-->
                                <!--                                        getFriendlyTime(-->
                                <!--                                            attendance.extra_time_in_1,-->
                                <!--                                        ) || "-"-->
                                <!--                                    }}-->
                                <!--                                </td>-->
                                <!--                                <td-->
                                <!--                                    v-if="hasExtraTime(attendance)"-->
                                <!--                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"-->
                                <!--                                >-->
                                <!--                                    {{-->
                                <!--                                        getFriendlyTime(-->
                                <!--                                            attendance.extra_time_out_1,-->
                                <!--                                        ) || "-"-->
                                <!--                                    }}-->
                                <!--                                </td>-->

                                <!--                                <td-->
                                <!--                                    v-if="hasExtraTime2(attendance)"-->
                                <!--                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"-->
                                <!--                                >-->
                                <!--                                    {{-->
                                <!--                                        getFriendlyTime(-->
                                <!--                                            attendance.extra_time_in_2,-->
                                <!--                                        ) || "-"-->
                                <!--                                    }}-->
                                <!--                                </td>-->
                                <!--                                <td-->
                                <!--                                    v-if="hasExtraTime2(attendance)"-->
                                <!--                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"-->
                                <!--                                >-->
                                <!--                                    {{-->
                                <!--                                        getFriendlyTime(-->
                                <!--                                            attendance.extra_time_out_2,-->
                                <!--                                        ) || "-"-->
                                <!--                                    }}-->
                                <!--                                </td>-->

                                <td
                                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {{ calculateDailyHours(attendance) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div
                    v-if="!attendances?.length"
                    class="text-center text-gray-500 dark:text-gray-400 py-8"
                >
                    No attendance records found.
                </div>

                <template #footer>
                    <div class="flex justify-end">
                        <UButton
                            label="Close"
                            color="red"
                            variant="outline"
                            @click="isModalOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { Attendance } from "~/types/codegen/graphql";

import {
    calculateDailyHours,
    hasExtraTime2,
    hasExtraTime,
} from "../../utils/helpers";

const props = defineProps({
    attendances: {
        default: () => [],
        type: Array as PropType<Attendance[]>,
    },
    employeeName: {
        required: true,
        type: String,
    },
    endDate: {
        required: true,
        type: String,
    },
    isOpen: {
        required: true,
        type: Boolean,
    },
    startDate: {
        required: true,
        type: String,
    },
});

const emit = defineEmits(["update:isOpen"]);

const isModalOpen = computed({
    get() {
        return props.isOpen;
    },
    set(value) {
        emit("update:isOpen", value);
    },
});

const totalHours = computed(() => {
    if (!props.attendances || props.attendances.length === 0) return 0;
    return props.attendances.reduce((sum, att) => {
        const hours = Number(calculateDailyHours(att));
        return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
});

const totalDays = computed(() =>
    props.attendances ? props.attendances.length : 0,
);

const hasAnyExtraTime1 = computed(() =>
    props.attendances.some((att) => hasExtraTime(att)),
);

const hasAnyExtraTime2 = computed(() =>
    props.attendances.some((att) => hasExtraTime2(att)),
);
</script>
