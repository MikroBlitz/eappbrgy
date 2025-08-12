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

                        <UButton
                            class="hover:bg-transparent hover:scale-110 rounded-full transition-all duration-300 p-1"
                            :style="`transform: rotate(${rotationRefetch}deg);`"
                            icon="solar:refresh-bold"
                            variant="ghost"
                            size="xl"
                            @click="handleRefetch"
                        />
                    </div>

                    <!-- Filters Row -->
                    <div class="flex flex-wrap items-center gap-3">
                        <div class="flex-1 min-w-[200px] max-w-sm">
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

                        <div class="flex items-center gap-2">
                            <DatePickerButton
                                v-model="startDate"
                                variant="ghost"
                                color="blue"
                                placeholder="Start date"
                                size="sm"
                            />
                            <span class="text-gray-400">to</span>
                            <DatePickerButton
                                v-model="endDate"
                                color="blue"
                                variant="ghost"
                                placeholder="End date"
                                size="sm"
                            />
                        </div>

                        <div class="flex gap-2 ml-auto">
                            <UButton
                                v-show="selected.length > 0"
                                icon="solar:filter-broken"
                                color="red"
                                variant="outline"
                                size="xs"
                                :disabled="!hasActiveFilters"
                                @click="clearFilters"
                            >
                                Clear
                            </UButton>
                            <UButton
                                size="sm"
                                variant="outline"
                                color="green"
                                :disabled="!hasActiveFilters"
                                :loading="isLoading"
                                @click="applyFilters"
                            >
                                Apply Filters
                            </UButton>
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
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Showing {{ (page - 1) * pageCount + 1 }} to
                        {{ Math.min(page * pageCount, rows.length) }} of
                        {{ rows.length }} results
                    </div>

                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="rows.length"
                        :ui="{
                            wrapper: 'flex items-center gap-1',
                            rounded:
                                '!rounded-full min-w-[32px] justify-center',
                            default: {
                                size: 'sm',
                                activeButton: {
                                    variant: 'solid',
                                },
                                inactiveButton: {
                                    variant: 'ghost',
                                },
                            },
                        }"
                        show-last
                        show-first
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

const handleRefetch = async () => {
    rotationRefetch.value += 360;
    try {
        await refetch();
    } catch (error) {
        console.error(error);
    }
};

const page = ref(1);
const pageCount = 5;
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
const selectedRow = ref<any>(null);
const selectedRowAttendances = computed(() => {
    return selectedRow.value ? getAttendanceForRow(selectedRow.value) : null;
});

// Add this new method
const openViewModal = (row: any) => {
    selectedRow.value = row;
    isViewModalOpen.value = true;
};

const { loading, refetch, result } = useQuery(dailyTimeRecord, {
    end: formatDateTimeForGraphQL(endDate.value),
    filter: [],
    start: formatDateTimeForGraphQL(startDate.value),
});

const applyFilters = async () => {
    isLoading.value = true;
    const selectedIds = selected.value.map((user) => user.id);
    const filters =
        selectedIds.length > 0 ? [{ key: "user.id", value: selectedIds }] : [];

    await refetch({
        end: formatDateTimeForGraphQL(endDate.value) as string,
        filter: filters as [],
        start: formatDateTimeForGraphQL(startDate.value) as string,
    });
    isLoading.value = false;
};

const hasActiveFilters = computed(() => {
    return (
        startDate.value !== null ||
        endDate.value !== null ||
        selected.value !== null
    );
});

const clearFilters = () => {
    selected.value = [];
    refetch({
        end: formatDateTimeForGraphQL(endDate.value),
        filter: [],
        start: formatDateTimeForGraphQL(startDate.value),
    });
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
    if (!result.value) return [];

    const reportsArray = Array.isArray(result.value)
        ? result.value
        : Array.isArray(result.value.dailyTimeRecord)
          ? result.value.dailyTimeRecord
          : [];

    return reportsArray.map(mapReport);
});

async function search(q: string) {
    isLoading.value = true;

    try {
        const { data } = await useAsyncQuery(usersPaginate, {
            first: 10,
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
        const hasExtraTime1 = attendanceData.some(
            (att) => att.extra_time_in_1 && att.extra_time_out_1,
        );
        const hasExtraTime2 = attendanceData.some(
            (att) => att.extra_time_in_2 && att.extra_time_out_2,
        );

        // table headers
        const headers = ["Date", "AM In", "AM Out", "PM In", "PM Out"];
        if (hasExtraTime1) headers.push("Extra Time 1 In", "Extra Time 1 Out");
        if (hasExtraTime2) headers.push("Extra Time 2 In", "Extra Time 2 Out");
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

            if (hasExtraTime1) {
                row.push(
                    att.extra_time_in_1 ? formatTime(att.extra_time_in_1) : "-",
                    att.extra_time_out_1
                        ? formatTime(att.extra_time_out_1)
                        : "-",
                );
            }
            if (hasExtraTime2) {
                row.push(
                    att.extra_time_in_2 ? formatTime(att.extra_time_in_2) : "-",
                    att.extra_time_out_2
                        ? formatTime(att.extra_time_out_2)
                        : "-",
                );
            }

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
