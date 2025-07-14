<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto p-6">
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
                            <p
                                class="text-3xl font-bold text-gray-900 dark:text-white mt-2"
                            >
                                0
                            </p>
                            <div class="flex items-center mt-2">
                                <UBadge
                                    color="yellow"
                                    variant="subtle"
                                    size="sm"
                                >
                                    0
                                </UBadge>
                                <span
                                    class="text-gray-500 dark:text-gray-400 text-sm ml-2"
                                >
                                    new today
                                </span>
                            </div>
                        </div>
                        <UIcon
                            name="i-heroicons-document-text"
                            class="w-8 h-8 text-yellow-500"
                        />
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
                                        color="red"
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
                                ₱145,230
                            </p>
                            <div class="flex items-center mt-2">
                                <UBadge
                                    color="green"
                                    variant="subtle"
                                    size="sm"
                                >
                                    +8.5%
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
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <UCard>
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

                <!-- Recent Activities -->
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Recent Activities
                            </h3>
                            <UIcon
                                name="i-heroicons-clock"
                                class="w-5 h-5 text-gray-400"
                            />
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <UAvatar
                                size="sm"
                                src="/api/placeholder/32/32"
                                alt="User"
                            />
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm text-gray-900 dark:text-white"
                                >
                                    <span class="font-medium"
                                        >Juan Dela Cruz</span
                                    >
                                    requested a barangay certificate
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    2 hours ago
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <UAvatar
                                size="sm"
                                src="/api/placeholder/32/32"
                                alt="User"
                            />
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm text-gray-900 dark:text-white"
                                >
                                    <span class="font-medium"
                                        >Maria Santos</span
                                    >
                                    submitted a complaint
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    4 hours ago
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <UAvatar
                                size="sm"
                                src="/api/placeholder/32/32"
                                alt="User"
                            />
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm text-gray-900 dark:text-white"
                                >
                                    <span class="font-medium">Admin</span>
                                    published new announcement
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    1 day ago
                                </p>
                            </div>
                        </div>
                    </div>
                </UCard>

                <!-- Announcements -->
                <UCard>
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

            <!-- Data Tables -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Recent Documents -->
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Recent Document Requests
                            </h3>
                            <UButton color="gray" variant="ghost" size="sm">
                                View All
                            </UButton>
                        </div>
                    </template>

                    <div class="overflow-x-auto">
                        <table
                            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <thead class="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Resident
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Document
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                    >
                                        Juan Dela Cruz
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        Barangay Certificate
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <UBadge color="yellow" variant="subtle"
                                            >Pending</UBadge
                                        >
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                    >
                                        Maria Santos
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        Clearance
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <UBadge color="green" variant="subtle"
                                            >Approved</UBadge
                                        >
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                    >
                                        Pedro Garcia
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        Residency Certificate
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <UBadge color="blue" variant="subtle"
                                            >Processing</UBadge
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </UCard>

                <!-- Upcoming Events -->
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                Upcoming Events
                            </h3>
                            <UButton color="gray" variant="ghost" size="sm">
                                View Calendar
                            </UButton>
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div
                            class="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg"
                        >
                            <div class="flex-shrink-0">
                                <div
                                    class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
                                >
                                    <span class="text-white font-bold">25</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Monthly Barangay Meeting
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    June 25, 2025 at 7:00 PM
                                </p>
                            </div>
                        </div>

                        <div
                            class="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg"
                        >
                            <div class="flex-shrink-0">
                                <div
                                    class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"
                                >
                                    <span class="text-white font-bold">28</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Community Clean-up Drive
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    June 28, 2025 at 6:00 AM
                                </p>
                            </div>
                        </div>

                        <div
                            class="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg"
                        >
                            <div class="flex-shrink-0">
                                <div
                                    class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center"
                                >
                                    <span class="text-white font-bold">30</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Health and Wellness Program
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    June 30, 2025 at 9:00 AM
                                </p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { blottersCount, blottersThisWeekCount } from "~/graphql/Blotter.js";
import { residentsCount } from "~/graphql/Resident.js";

const residentCounter = ref(0);
const blotterCounter = ref(0);
const blotterResolvedCounter = ref(0);

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

onMounted(async () => {
    await Promise.all([
        refetchResident(),
        refetchBlotter(),
        refetchblottersThisWeek(),
    ]);
    if (residentResults.value)
        residentCounter.value = residentResults.value.residentsCount;
    if (blotterResults.value)
        blotterCounter.value = blotterResults.value.blottersCount;
    if (blottersThisWeekResults.value)
        blotterResolvedCounter.value =
            blottersThisWeekResults.value.blottersThisWeekCount;
});

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
