<template>
    <div class="min-h-[calc(90vh-100px)] bg-gray-50 dark:bg-gray-900">
        <div class="max-w-[1600px] mx-auto p-6">
            <!-- Header Section -->
            <div class="mb-8">
                <h1
                    class="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                    Govana
                </h1>
                <p class="text-gray-600 dark:text-gray-400">
                    Welcome to the Govana
                </p>
            </div>

            <!-- Statistics Cards -->
            <div
                v-if="auth.user?.roles[0]?.name !== 'User'"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <!-- Total Residents -->
                <UCard class="hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                            >
                                Total Residents
                            </p>

                            <!-- Loading State -->
                            <div
                                v-if="residentCounterLoading"
                                class="mt-2 space-y-2"
                            >
                                <div
                                    class="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"
                                />
                                <div class="flex items-center space-x-2">
                                    <div
                                        class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"
                                    />
                                    <div
                                        class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"
                                    />
                                </div>
                            </div>

                            <!-- Loaded Content -->
                            <div v-else>
                                <p
                                    class="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                                >
                                    {{ residentCounter }}
                                </p>
                                <div class="flex items-center mt-2">
                                    <UBadge
                                        color="green"
                                        variant="subtle"
                                        size="sm"
                                    >
                                        +3.2%
                                    </UBadge>
                                    <span
                                        class="text-gray-500 dark:text-gray-400 text-sm ml-2"
                                    >
                                        from last month
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Icon with loading state -->
                        <div class="flex-shrink-0">
                            <div
                                v-if="residentCounterLoading"
                                class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-users"
                                class="w-8 h-8 text-blue-500"
                            />
                        </div>
                    </div>
                </UCard>

                <!-- Pending Documents -->
                <UCard class="hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                            >
                                Pending Documents
                            </p>

                            <!-- Loading State -->
                            <div
                                v-if="pendingDocsLoading"
                                class="mt-2 space-y-2"
                            >
                                <div
                                    class="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"
                                />
                                <div class="flex items-center space-x-2">
                                    <div
                                        class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"
                                    />
                                    <div
                                        class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"
                                    />
                                </div>
                            </div>

                            <!-- Loaded Content -->
                            <div v-else>
                                <p
                                    class="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                                >
                                    {{ totalPendingDocs }}
                                </p>
                                <div class="flex items-center mt-2">
                                    <UBadge
                                        color="yellow"
                                        variant="subtle"
                                        size="sm"
                                    >
                                        {{ totalPendingDocsToday }}
                                    </UBadge>
                                    <span
                                        class="text-gray-500 dark:text-gray-400 text-sm ml-2"
                                    >
                                        new today
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Icon with loading state -->
                        <div class="flex-shrink-0">
                            <div
                                v-if="pendingDocsLoading"
                                class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-document-text"
                                class="w-8 h-8 text-yellow-500"
                            />
                        </div>
                    </div>
                </UCard>

                <!-- Active Cases -->
                <UCard class="hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                            >
                                Active Cases
                            </p>

                            <!-- Loading State -->
                            <div
                                v-if="blotterCounterLoading"
                                class="mt-2 space-y-2"
                            >
                                <div
                                    class="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"
                                />
                                <div class="flex items-center space-x-2">
                                    <div
                                        class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"
                                    />
                                    <div
                                        class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"
                                    />
                                </div>
                            </div>

                            <div v-else>
                                <p
                                    class="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                                >
                                    {{ blotterCounter }}
                                </p>
                                <div class="flex items-center mt-2">
                                    <UBadge
                                        :color="
                                            blotterResolvedCounter > 0
                                                ? 'green'
                                                : 'red'
                                        "
                                        variant="subtle"
                                        size="sm"
                                    >
                                        {{ blotterResolvedCounter }}
                                    </UBadge>
                                    <span
                                        class="text-gray-500 dark:text-gray-400 text-sm ml-2"
                                    >
                                        resolved this week
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Icon with loading state -->
                        <div class="flex-shrink-0">
                            <div
                                v-if="blotterCounterLoading"
                                class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-exclamation-triangle"
                                class="w-8 h-8 text-red-500"
                            />
                        </div>
                    </div>
                </UCard>

                <!-- Monthly Revenue -->
                <UCard class="hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                            >
                                Monthly Revenue
                            </p>
                            <p
                                class="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                            >
                                ₱ -----
                            </p>
                            <div class="flex items-center mt-2">
                                <UBadge
                                    color="green"
                                    variant="subtle"
                                    size="sm"
                                >
                                    +0%
                                </UBadge>
                                <span
                                    class="text-gray-500 dark:text-gray-400 text-sm ml-2"
                                >
                                    from last month
                                </span>
                            </div>
                        </div>
                        <UIcon
                            name="i-heroicons-currency-dollar"
                            class="w-8 h-8 text-green-500"
                        />
                    </div>
                </UCard>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                <UCard
                    v-if="auth.user?.roles[0]?.name !== 'User'"
                    class="col-span-12 lg:col-span-3"
                >
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Quick Actions
                            </h3>
                            <UIcon
                                name="i-heroicons-cog-6-tooth"
                                class="w-5 h-5 text-gray-400"
                            />
                        </div>
                    </template>

                    <div class="space-y-3">
                        <UButton
                            block
                            color="blue"
                            variant="soft"
                            icon="i-heroicons-plus"
                            @click="navigateTo('/residents')"
                        >
                            Add New Resident
                        </UButton>
                        <UButton
                            block
                            color="green"
                            variant="soft"
                            icon="i-heroicons-document-plus"
                            @click="navigateTo('/documents')"
                        >
                            Issue Certificate
                        </UButton>
                        <UButton
                            block
                            color="yellow"
                            variant="soft"
                            icon="i-heroicons-megaphone"
                        >
                            Create Announcement
                        </UButton>
                        <UButton
                            block
                            color="purple"
                            variant="soft"
                            icon="i-heroicons-calendar-days"
                        >
                            Schedule Event
                        </UButton>
                    </div>
                </UCard>

                <!-- Recent Documents -->
                <UCard
                    v-if="auth.user?.roles[0]?.name !== 'User'"
                    class="col-span-12 lg:col-span-5"
                >
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Recent Document Updates
                            </h3>
                            <UButton
                                color="gray"
                                variant="ghost"
                                size="sm"
                                @click="navigateTo('/documents')"
                            >
                                View All
                            </UButton>
                        </div>
                    </template>

                    <div class="overflow-x-auto overflow-y-auto max-h-[300px]">
                        <table
                            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <thead class="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th
                                        class="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        #
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Resident
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Document
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                <!-- Skeleton Loading State -->
                                <template v-if="documentsLoading">
                                    <tr v-for="n in 5" :key="`skeleton-${n}`">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <USkeleton class="h-4 w-32" />
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <USkeleton class="h-4 w-24" />
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <USkeleton
                                                class="h-6 w-20 rounded-full"
                                            />
                                        </td>
                                    </tr>
                                </template>

                                <!-- Empty State -->
                                <tr v-else-if="recentDocs.length === 0">
                                    <td colspan="3" class="text-center py-8">
                                        <div
                                            class="flex flex-col items-center justify-center space-y-3"
                                        >
                                            <UIcon
                                                name="i-heroicons-document-text"
                                                class="w-12 h-12 text-gray-400 dark:text-gray-500"
                                            />
                                            <div
                                                class="text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                No recent document requests
                                                found.
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Data Rows -->
                                <tr
                                    v-for="doc in recentDocs"
                                    v-else
                                    :key="doc.id"
                                    class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td class="px-2 py-3">
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <span
                                                class="text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                <UButton
                                                    variant="ghost"
                                                    @click="
                                                        copyClipboard(doc.id)
                                                    "
                                                >
                                                    {{ doc.id }}
                                                </UButton>
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 whitespace-nowrap">
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div>
                                                <div
                                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    {{
                                                        doc.resident?.name ||
                                                        "Unknown"
                                                    }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500 dark:text-gray-400"
                                                >
                                                    {{ doc.created_at }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 whitespace-nowrap">
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <span
                                                class="text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                {{ toTitleCase(doc.type) }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 whitespace-nowrap">
                                        <UBadge
                                            :color="
                                                getDocumentStatusColor(
                                                    doc.status,
                                                ).color
                                            "
                                            variant="subtle"
                                            size="sm"
                                        >
                                            {{ toTitleCase(doc.status) }}
                                        </UBadge>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </UCard>

                <!-- Announcements -->
                <UCard class="col-span-12 lg:col-span-4">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Latest Announcements
                            </h3>
                            <UIcon
                                name="i-heroicons-megaphone"
                                class="w-5 h-5 text-gray-400"
                            />
                        </div>
                    </template>

                    <div class="space-y-4">
                        <UAlert
                            color="blue"
                            variant="soft"
                            title="Community Meeting"
                            description="Monthly barangay meeting scheduled for next Friday at 7:00 PM"
                            icon="i-heroicons-information-circle"
                        />

                        <UAlert
                            color="yellow"
                            variant="soft"
                            title="Water Interruption"
                            description="Scheduled water maintenance on Sunday, 6:00 AM - 12:00 PM"
                            icon="i-heroicons-exclamation-triangle"
                        />

                        <UAlert
                            color="green"
                            variant="soft"
                            title="New Health Program"
                            description="Free health checkup program starts next month"
                            icon="i-heroicons-heart"
                        />
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Document } from "~/types/codegen/graphql";

import { blottersCount, blottersThisWeekCount } from "~/graphql/Blotter";
import {
    recentDocuments,
    totalPendingDocuments,
    totalPendingNewToday,
} from "~/graphql/Document";
import { residentsCount } from "~/graphql/Resident";
import { getDocumentStatusColor } from "~/utils/helpers";

const auth = useAuthStore();
const residentCounter = ref(0);
const blotterCounter = ref(0);
const blotterResolvedCounter = ref(0);
const recentDocs: Ref<Document[]> = ref([]);
const totalPendingDocs = ref(0);
const totalPendingDocsToday = ref(0);

const {
    loading: residentCounterLoading,
    refetch: refetchResident,
    result: residentResults,
} = useQuery(residentsCount);
const {
    loading: blotterCounterLoading,
    refetch: refetchBlotter,
    result: blotterResults,
} = useQuery(blottersCount);
const { refetch: refetchblottersThisWeek, result: blottersThisWeekResults } =
    useQuery(blottersThisWeekCount);
const {
    loading: documentsLoading,
    refetch: refetchDocuments,
    result: documentsResult,
} = useQuery(recentDocuments);
const {
    loading: pendingDocsLoading,
    refetch: refetchDocsPending,
    result: docsPendingResult,
} = useQuery(totalPendingDocuments);
const { refetch: refetchPendingDocsToday, result: pendingDocsTodayResult } =
    useQuery(totalPendingNewToday);

onMounted(async () => {
    await Promise.all([
        refetchResident(),
        refetchBlotter(),
        refetchblottersThisWeek(),
        refetchDocuments(),
        refetchDocsPending(),
        refetchPendingDocsToday(),
    ]);
    if (residentResults.value)
        residentCounter.value = residentResults.value.residentsCount;
    if (blotterResults.value)
        blotterCounter.value = blotterResults.value.blottersCount;
    if (blottersThisWeekResults.value)
        blotterResolvedCounter.value =
            blottersThisWeekResults.value.blottersThisWeekCount;
    if (documentsResult.value)
        recentDocs.value = documentsResult.value.documentsPaginate.data;
    if (docsPendingResult.value)
        totalPendingDocs.value = docsPendingResult.value.totalPendingDocuments;
    if (pendingDocsTodayResult.value)
        totalPendingDocsToday.value =
            pendingDocsTodayResult.value.totalPendingNewToday;
});

const copyClipboard = (id: string) => copyToClipboard("Doc Id", id);

definePageMeta({ layout: "app-layout", permission: "view dashboard" });
useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Dashboard",
});
</script>
