<script setup lang="ts">
const props = defineProps({
    isOpen: Boolean,
    selectedRow: {
        required: true,
        type: Object,
    },
});

const emit = defineEmits(["update:isOpen"]);

const isViewModal = computed({
    get: () => props.isOpen,
    set: (value: boolean) => emit("update:isOpen", value),
});
</script>

<template>
    <UModal v-model="isViewModal">
        <UCard
            :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: { padding: '' },
            }"
        >
            <!-- Header -->
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <div
                                class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                            >
                                <Icon
                                    name="i-heroicons-document-text"
                                    class="w-5 h-5 text-blue-600 dark:text-blue-400"
                                />
                            </div>
                        </div>
                        <div>
                            <h2
                                class="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                {{ selectedRow?.case_no }}
                            </h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Blotter Case Details
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Content -->
            <div class="p-6 space-y-6">
                <!-- Case Information Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Left Column -->
                    <div class="space-y-4">
                        <!-- Complaint Section -->
                        <div
                            class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                        >
                            <div class="flex items-center space-x-2 mb-2">
                                <Icon
                                    name="i-heroicons-exclamation-triangle"
                                    class="w-4 h-4 text-amber-500"
                                />
                                <h3
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Complaint
                                </h3>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300">
                                {{
                                    selectedRow?.complaint ||
                                    "No complaint specified"
                                }}
                            </p>
                        </div>

                        <!-- Incident Date -->
                        <div class="flex items-center space-x-3">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                                >
                                    <Icon
                                        name="i-heroicons-calendar-days"
                                        class="w-4 h-4 text-green-600 dark:text-green-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Incident Date
                                </p>
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    {{
                                        getFriendlyDate(
                                            selectedRow?.incident_date,
                                        )
                                    }}
                                </p>
                            </div>
                        </div>

                        <!-- Barangay -->
                        <div class="flex items-center space-x-3">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                                >
                                    <Icon
                                        name="i-heroicons-map-pin"
                                        class="w-4 h-4 text-purple-600 dark:text-purple-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Barangay
                                </p>
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    {{
                                        selectedRow?.barangay?.name ||
                                        "Not specified"
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-4">
                        <!-- Parties Involved -->
                        <div
                            class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                        >
                            <h3
                                class="text-sm font-medium text-gray-900 dark:text-white mb-3"
                            >
                                Parties Involved
                            </h3>

                            <!-- Complainant -->
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                                    >
                                        <Icon
                                            name="i-heroicons-user"
                                            class="w-4 h-4 text-blue-600 dark:text-blue-400"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <p
                                        class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                                    >
                                        Complainant
                                    </p>
                                    <p
                                        class="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {{
                                            selectedRow?.complainant?.name ||
                                            "Not specified"
                                        }}
                                    </p>
                                </div>
                            </div>

                            <!-- Respondent -->
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center"
                                    >
                                        <Icon
                                            name="i-heroicons-user-minus"
                                            class="w-4 h-4 text-red-600 dark:text-red-400"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <p
                                        class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                                    >
                                        Respondent
                                    </p>
                                    <p
                                        class="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {{
                                            selectedRow?.respondent?.name ||
                                            "Not specified"
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Details Section -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div class="flex items-center space-x-2 mb-3">
                        <Icon
                            name="i-heroicons-document-text"
                            class="w-4 h-4 text-gray-500"
                        />
                        <h3
                            class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Case Details
                        </h3>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <p
                            class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                        >
                            {{
                                selectedRow?.details ||
                                "No additional details provided."
                            }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <template #footer>
                <div class="flex justify-end">
                    <UButton
                        color="gray"
                        variant="ghost"
                        @click="isViewModal = false"
                    >
                        Close
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>
