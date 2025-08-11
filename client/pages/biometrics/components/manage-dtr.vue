<template>
    <div class="p-6 max-w-[1600px] mx-auto">
        <UCard class="shadow-sm">
            <!-- Header Section -->
            <template #header>
                <div class="flex flex-col gap-4">
                    <h2
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        Daily Time Record
                    </h2>

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
                                placeholder="Start date"
                                size="sm"
                            />
                            <span class="text-gray-400">to</span>
                            <DatePickerButton
                                v-model="endDate"
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
                    :rows="rows"
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
                />
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
    </div>
</template>

<script setup lang="ts">
import type { DtrReport, User } from "~/types/codegen/graphql";

import { dailyTimeRecord } from "~/graphql/Attendance";
import { usersPaginate } from "~/graphql/User";

const selected = ref<User[]>([]);
const isLoading = ref(false);

const page = ref(1);
const pageCount = 5;
const now = new Date();
const startDate = ref<Date>(new Date(now.getFullYear(), now.getMonth(), 1));
const endDate = ref<Date>(
    new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
);

const { loading, refetch, result } = useQuery(dailyTimeRecord, {
    end: formatDateTimeForGraphQL(endDate.value),
    filter: [],
    start: formatDateTimeForGraphQL(startDate.value),
});

const applyFilters = async () => {
    isLoading.value = true;

    const selectedIds = selected.value.map((user) => user.id);

    const { data } = await refetch({
        end: formatDateTimeForGraphQL(endDate.value) as string,
        filter: [{ key: "user.id", value: selectedIds }],
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
    date: getDateOnly(report.attendances?.[0]?.date) || "",
    name: report.user.name,
    salary: currencyFormat(report.salary),
    total_hours: report.total_hours,
    total_working_days: report.total_working_days,
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
</script>
