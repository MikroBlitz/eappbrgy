<template>
    <div class="p-6 max-w-[1600px] mx-auto">
        <UCard class="shadow-sm">
            <!-- Header Section -->
            <template #header>
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between">
                        <h2
                            class="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                            Daily Time Record
                        </h2>

                        <div class="flex items-center gap-2">
                            <!-- Filter Popover -->
                            <UPopover
                                :popper="{ placement: 'bottom-end' }"
                                :ui="{
                                    base: 'overflow-visible focus:outline-none relative',
                                }"
                            >
                                <UButton
                                    variant="outline"
                                    label="Filters"
                                    icon="solar:filter-broken"
                                    size="sm"
                                    class="w-28 px-4"
                                />

                                <template #panel>
                                    <div class="p-4 w-96">
                                        <div
                                            class="flex flex-col gap-4 overflow-visible"
                                        >
                                            <h3
                                                class="font-medium text-gray-900 dark:text-white"
                                            >
                                                Filter Options
                                            </h3>

                                            <!-- User Selection -->
                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Users
                                                </label>
                                                <USelectMenu
                                                    v-model="selected"
                                                    :loading="isLoading"
                                                    :searchable="search"
                                                    placeholder="Search users..."
                                                    option-attribute="name"
                                                    trailing
                                                    size="sm"
                                                    multiple
                                                />
                                            </div>

                                            <!-- Date Range -->
                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Date Range
                                                </label>
                                                <div
                                                    class="flex items-center gap-2"
                                                >
                                                    <div
                                                        class="relative flex-1"
                                                    >
                                                        <DatePickerButton
                                                            v-model="startDate"
                                                            variant="outline"
                                                            color="blue"
                                                            placeholder="Start date"
                                                            size="sm"
                                                            :ui="{
                                                                container:
                                                                    'absolute z-[100] mt-1',
                                                                wrapper:
                                                                    'w-full',
                                                            }"
                                                        />
                                                    </div>
                                                    <span
                                                        class="text-gray-400 text-sm flex-shrink-0"
                                                        >to</span
                                                    >
                                                    <div
                                                        class="relative flex-1"
                                                    >
                                                        <DatePickerButton
                                                            v-model="endDate"
                                                            color="blue"
                                                            variant="outline"
                                                            placeholder="End date"
                                                            size="sm"
                                                            :ui="{
                                                                container:
                                                                    'absolute z-[100] mt-1',
                                                                wrapper:
                                                                    'w-full',
                                                            }"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </UPopover>

                            <UButton
                                v-show="hasActiveFilters"
                                icon="solar:filter-broken"
                                color="red"
                                variant="outline"
                                size="sm"
                                :disabled="!hasActiveFilters"
                                @click="clearFilters"
                            >
                                Clear
                            </UButton>

                            <!-- Refresh Button -->
                            <UButton
                                class="hover:bg-transparent hover:scale-110 rounded-full transition-all duration-300 p-1"
                                :style="`transform: rotate(${rotationRefetch}deg);`"
                                icon="solar:refresh-bold"
                                variant="ghost"
                                size="xl"
                                @click="handleRefetch"
                            />
                        </div>
                    </div>
                </div>
            </template>

            <!-- Table Section -->
            <div class="overflow-hidden">
                <UTable
                    v-model:expand="expand"
                    :rows="rows"
                    :columns="columns"
                    :ui="{
                        wrapper: 'min-w-full',
                        base: 'min-w-full table-auto',
                        thead: 'bg-gray-50 dark:bg-gray-800/50',
                        tbody: 'divide-y divide-gray-200 dark:divide-gray-700',
                        tr: {
                            base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                        },
                    }"
                    :loading="loading"
                >
                    <!-- Custom cell templates -->
                    <template #name-data="{ row }">
                        <div class="flex items-center gap-2">
                            <span class="font-medium">{{ row.name }}</span>
                        </div>
                    </template>

                    <template #hourly_rate-data="{ row }">
                        <span
                            class="text-blue-600 dark:text-blue-400 font-medium"
                        >
                            {{ row.hourly_rate }}
                        </span>
                    </template>

                    <template #salary-data="{ row }">
                        <span
                            class="text-green-600 dark:text-green-400 font-medium"
                        >
                            {{ row.salary }}
                        </span>
                    </template>

                    <template #total_hours-data="{ row }">
                        <span class="font-mono"
                            >{{ row.total_hours || "0.00" }} hrs</span
                        >
                    </template>

                    <template #total_working_days-data="{ row }">
                        <span class="font-mono"
                            >{{ row.total_working_days || "0" }} days</span
                        >
                    </template>

                    <template #actions-data="{ row }">
                        <div class="flex gap-2">
                            <UButton
                                icon="solar:eye-broken"
                                class="hover:scale-125 transition-all duration-300"
                                color="blue"
                                variant="ghost"
                                :ui="{ rounded: 'rounded-full' }"
                                title="View Attendance Details"
                                @click="openViewModal(row)"
                            />
                            <UButton
                                icon="solar:download-minimalistic-broken"
                                class="hover:scale-125 transition-all duration-300"
                                color="green"
                                variant="ghost"
                                :ui="{ rounded: 'rounded-full' }"
                                title="Download DTR as PDF"
                                @click="generateDTRPDF(row)"
                            />
                        </div>
                    </template>

                    <!-- Expanded row template showing detailed attendance -->
                    <template #expand="{ row }">
                        <div class="p-4 text-gray-500 dark:text-gray-400">
                            <div
                                v-if="getAttendanceForRow(row)"
                                class="space-y-4"
                            >
                                <div
                                    v-for="(
                                        attendance, index
                                    ) in getAttendanceForRow(row)"
                                    :key="index"
                                    class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                                >
                                    <h3
                                        class="font-medium text-gray-900 dark:text-white mb-2"
                                    >
                                        {{ getDateOnly(attendance.date) }}
                                    </h3>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4
                                                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Morning
                                            </h4>
                                            <p>
                                                In:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.am_time_in,
                                                    )
                                                }}
                                            </p>
                                            <p>
                                                Out:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.am_time_out,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div>
                                            <h4
                                                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Afternoon
                                            </h4>
                                            <p>
                                                In:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.pm_time_in,
                                                    )
                                                }}
                                            </p>
                                            <p>
                                                Out:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.pm_time_out,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div v-if="hasExtraTime(attendance)">
                                            <h4
                                                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Extra Time 1
                                            </h4>
                                            <p>
                                                In:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.extra_time_in_1,
                                                    )
                                                }}
                                            </p>
                                            <p>
                                                Out:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.extra_time_out_1,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div v-if="hasExtraTime2(attendance)">
                                            <h4
                                                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Extra Time 2
                                            </h4>
                                            <p>
                                                In:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.extra_time_in_2,
                                                    )
                                                }}
                                            </p>
                                            <p>
                                                Out:
                                                {{
                                                    getFriendlyTime(
                                                        attendance.extra_time_out_2,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>No attendance records found.</div>
                        </div>
                    </template>
                </UTable>
            </div>

            <!-- Footer with Pagination -->
            <template #footer>
                <div class="flex items-center justify-between">
                    <div
                        class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400"
                    >
                        <USelect
                            v-model="pageCount"
                            :options="[10, 20, 50, 100]"
                            class="me-2 w-20"
                            size="xs"
                        />
                        Showing {{ (page - 1) * pageCount + 1 }} to
                        {{ Math.min(page * pageCount, totalResults) }} of
                        {{ totalResults }}
                    </div>

                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="totalResults"
                        :ui="{
                            wrapper: 'flex items-center gap-1',
                            rounded:
                                '!rounded-full min-w-[32px] justify-center',
                            default: {
                                activeButton: {
                                    variant: 'outline',
                                },
                            },
                        }"
                    />
                </div>
            </template>
        </UCard>

        <AttendanceDetail
            v-model:is-open="isViewModalOpen"
            :employee-name="selectedRow?.name || ''"
            :start-date="formatDate(startDate)"
            :end-date="formatDate(endDate)"
            :attendances="selectedRowAttendances"
        />
    </div>
</template>

<script setup lang="ts">
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { DtrReport, User } from "~/types/codegen/graphql";

import { dailyTimeRecord } from "~/graphql/Attendance";
import { usersPaginate } from "~/graphql/User";

import AttendanceDetail from "../components/modal/AttendanceDetail.vue";
import { columns } from "../data/dtr_columns";
import {
    getAttendanceForRow,
    hasExtraTime,
    hasExtraTime2,
    calculateDailyHours,
    formatDate,
    formatTime,
} from "../utils/helpers";

const toast = useToast();
const selected = ref<User[]>([]);
const isLoading = ref(false);
const rotationRefetch = ref(0);

const page = ref(1);
const pageCount = ref(10);
const now = new Date();
const startDate = ref<Date>(new Date(now.getFullYear(), now.getMonth(), 1));
const endDate = ref<Date>(
    new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
);
const expand = ref({
    openedRows: [],
    row: {},
});
const isViewModalOpen = ref(false);
const selectedRow = ref(null);
const selectedRowAttendances = computed(() => {
    return selectedRow.value ? getAttendanceForRow(selectedRow.value) : null;
});

const openViewModal = (row: any) => {
    selectedRow.value = row;
    isViewModalOpen.value = true;
};

const queryVariables = computed(() => {
    const selectedIds = selected.value.map((user) => user.id);
    const filters =
        selectedIds.length > 0 ? [{ key: "user.id", value: selectedIds }] : [];

    return {
        end: formatDateTimeForGraphQL(endDate.value),
        filter: filters,
        first: Number(pageCount.value),
        page: page.value,
        start: formatDateTimeForGraphQL(startDate.value),
    };
});

const { loading, refetch, result } = useQuery(dailyTimeRecord, queryVariables);

const hasActiveFilters = computed(() => {
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const defaultEnd = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
    );

    const isStartChanged = startDate.value.getTime() !== defaultStart.getTime();
    const isEndChanged = endDate.value.getTime() !== defaultEnd.getTime();
    const hasSelectedUsers =
        Array.isArray(selected.value) && selected.value.length > 0;

    return isStartChanged || isEndChanged || hasSelectedUsers;
});

const clearFilters = () => {
    selected.value = [];
    startDate.value = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate.value = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
    );
    refetch({
        end: formatDateTimeForGraphQL(endDate.value),
        filter: [],
        first: 10,
        page: 1,
        start: formatDateTimeForGraphQL(startDate.value),
    });
};

const handleRefetch = async () => {
    rotationRefetch.value += 360;
    try {
        const selectedIds = selected.value.map((user) => user.id);
        const filters =
            selectedIds.length > 0
                ? [{ key: "user.id", value: selectedIds }]
                : [];
        await refetch({
            end: formatDateTimeForGraphQL(endDate.value),
            filter: filters as [],
            first: Number(pageCount.value),
            page: page.value,
            start: formatDateTimeForGraphQL(startDate.value),
        });
    } catch (error) {
        console.error(error);
    }
};

const mapReport = (report: DtrReport) => ({
    id: report.user.id,
    //
    name: report.user.name,
    salary: currencyFormat(report.salary),
    total_hours: report.total_hours,
    total_working_days: report.total_working_days,
    //
    attendances: report.attendances,
    hourly_rate: currencyFormat(report.user.hourly_rate),
});

const rows = computed(() => {
    if (!result.value?.dailyTimeRecord?.data) return [];
    return result.value.dailyTimeRecord.data.map(mapReport);
});

const totalResults = computed(
    () => result.value?.dailyTimeRecord?.paginatorInfo?.total || 0,
);

async function search(q: string) {
    isLoading.value = true;

    try {
        const { data } = await useAsyncQuery(usersPaginate, {
            first: 10,
            page: 1,
            search: q,
        });

        return data.value?.usersPaginate?.data ?? [];
    } catch (error) {
        console.error("Search error:", error);
        return [];
    } finally {
        isLoading.value = false;
    }
}

const generateDTRPDF = (row: any) => {
    try {
        const doc = new jsPDF();
        const attendanceData = getAttendanceForRow(row) || [];
        // const hasExtraTime1 = attendanceData.some(
        //     (att) => att.extra_time_in_1 && att.extra_time_out_1,
        // );
        // const hasExtraTime2 = attendanceData.some(
        //     (att) => att.extra_time_in_2 && att.extra_time_out_2,
        // );

        // table headers
        const headers = ["Date", "AM In", "AM Out", "PM In", "PM Out"];
        // if (hasExtraTime1) headers.push("Extra Time 1 In", "Extra Time 1 Out");
        // if (hasExtraTime2) headers.push("Extra Time 2 In", "Extra Time 2 Out");
        headers.push("Total Hours");

        // table rows
        const tableData = attendanceData.map((att) => {
            const date = new Date(att.date);
            const row = [
                formatDate(date),
                att.am_time_in ? formatTime(att.am_time_in) : "-",
                att.am_time_out ? formatTime(att.am_time_out) : "-",
                att.pm_time_in ? formatTime(att.pm_time_in) : "-",
                att.pm_time_out ? formatTime(att.pm_time_out) : "-",
            ];

            // if (hasExtraTime1) {
            //     row.push(
            //         att.extra_time_in_1 ? formatTime(att.extra_time_in_1) : "-",
            //         att.extra_time_out_1
            //             ? formatTime(att.extra_time_out_1)
            //             : "-",
            //     );
            // }
            // if (hasExtraTime2) {
            //     row.push(
            //         att.extra_time_in_2 ? formatTime(att.extra_time_in_2) : "-",
            //         att.extra_time_out_2
            //             ? formatTime(att.extra_time_out_2)
            //             : "-",
            //     );
            // }

            row.push(calculateDailyHours(att));
            return row;
        });

        // header
        doc.setFontSize(16);
        doc.text("DAILY TIME RECORD", 105, 15, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Employee: ${row.name}`, 14, 25);
        doc.text(
            `Period: ${formatDate(startDate.value)} to ${formatDate(endDate.value)}`,
            14,
            35,
        );

        // summary
        doc.setFontSize(12);
        const totalWorkingDays = attendanceData.length;
        const totalHours = attendanceData.reduce((sum, att) => {
            const hours = Number(calculateDailyHours(att));
            return sum + (isNaN(hours) ? 0 : hours);
        }, 0);
        doc.text(`Total Working Days: ${totalWorkingDays}`, 14, 45);
        doc.text(`Total Hours: ${totalHours.toFixed(2)}`, 14, 55);

        // table
        autoTable(doc, {
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
            body: tableData,
            head: [headers],
            headStyles: {
                fillColor: [46, 204, 113],
                fontStyle: "bold",
                textColor: 255,
            },
            margin: { top: 60 },
            startY: 60,
            theme: "grid",
        });

        // save PDF
        const fileName = `DTR_${row.name.replace(/\s+/g, "_")}_${formatDate(
            startDate.value,
        )}_to_${formatDate(endDate.value)}.pdf`.replace(/[/\\?%*:|"<>]/g, "");
        doc.save(fileName);

        toast.add({
            color: "green",
            icon: "solar:check-circle-broken",
            title: `PDF Downloaded.`,
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
</script>
