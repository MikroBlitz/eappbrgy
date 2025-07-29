<template>
    <div class="min-h-[calc(90vh-100px)] bg-gray-50 dark:bg-gray-900">
        <div class="max-w-[1200px] mx-auto p-6">
            <!-- Header Section -->
            <div class="mb-8">
                <h1
                    class="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                    Settings
                </h1>
                <p class="text-gray-600 dark:text-gray-400">
                    Manage your system preferences and configurations
                </p>
            </div>

            <!-- Settings Tabs -->
            <UTabs :items="settingsCategories" class="w-full">
                <!-- General Settings Tab -->
                <template #general="{ item }">
                    <UCard class="mt-6">
                        <template #header>
                            <div class="flex items-center space-x-2">
                                <UIcon :name="item.icon" class="w-5 h-5" />
                                <h3
                                    class="text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    General Settings
                                </h3>
                            </div>
                        </template>

                        <div class="space-y-6">
                            <!-- System Name -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    System Name
                                </label>
                                <UInput
                                    v-model="settings.systemName"
                                    placeholder="Govana"
                                    icon="i-heroicons-building-office"
                                />
                            </div>

                            <!-- Contact Information -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Contact Number
                                    </label>
                                    <UInput
                                        v-model="settings.contactNumber"
                                        placeholder="+63 XXX XXX XXXX"
                                        icon="i-heroicons-phone"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <UInput
                                        v-model="settings.emailAddress"
                                        placeholder="barangay@example.com"
                                        icon="i-heroicons-envelope"
                                    />
                                </div>
                            </div>

                            <!-- Timezone -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Timezone
                                </label>
                                <USelect
                                    v-model="settings.timezone"
                                    :options="timezoneOptions"
                                    placeholder="Select timezone"
                                />
                            </div>
                        </div>
                    </UCard>
                </template>

                <!-- Documents Settings Tab -->
                <template #documents="{ item }">
                    <UCard class="mt-6">
                        <template #header>
                            <div class="flex items-center space-x-2">
                                <UIcon :name="item.icon" class="w-5 h-5" />
                                <h3
                                    class="text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    Document Settings
                                </h3>
                            </div>
                        </template>

                        <div class="space-y-6">
                            <!-- Document Processing -->
                            <div>
                                <h4
                                    class="text-md font-medium text-gray-900 dark:text-white mb-4"
                                >
                                    Processing Configuration
                                </h4>
                                <div class="space-y-4">
                                    <div
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            <p
                                                class="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Auto-approve certificates
                                            </p>
                                            <p
                                                class="text-xs text-gray-500 dark:text-gray-400"
                                            >
                                                Automatically approve certain
                                                certificate types
                                            </p>
                                        </div>
                                        <UToggle
                                            v-model="settings.autoApprove"
                                        />
                                    </div>
                                    <div
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            <p
                                                class="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Email notifications
                                            </p>
                                            <p
                                                class="text-xs text-gray-500 dark:text-gray-400"
                                            >
                                                Send email updates for document
                                                status changes
                                            </p>
                                        </div>
                                        <UToggle
                                            v-model="
                                                settings.emailNotifications
                                            "
                                        />
                                    </div>
                                    <div
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            <p
                                                class="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                SMS notifications
                                            </p>
                                            <p
                                                class="text-xs text-gray-500 dark:text-gray-400"
                                            >
                                                Send SMS updates for important
                                                document updates
                                            </p>
                                        </div>
                                        <UToggle
                                            v-model="settings.smsNotifications"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Document Fees -->
                            <div>
                                <h4
                                    class="text-md font-medium text-gray-900 dark:text-white mb-4"
                                >
                                    Document Fees
                                </h4>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Barangay Clearance
                                        </label>
                                        <UInput
                                            v-model="settings.fees.clearance"
                                            placeholder="0.00"
                                            icon="i-heroicons-banknotes"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Certificate of Residency
                                        </label>
                                        <UInput
                                            v-model="settings.fees.residency"
                                            placeholder="0.00"
                                            icon="i-heroicons-banknotes"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Business Permit
                                        </label>
                                        <UInput
                                            v-model="settings.fees.business"
                                            placeholder="0.00"
                                            icon="i-heroicons-banknotes"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Indigency Certificate
                                        </label>
                                        <UInput
                                            v-model="settings.fees.indigency"
                                            placeholder="0.00"
                                            icon="i-heroicons-banknotes"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </template>
            </UTabs>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 pt-8">
                <UButton color="gray" variant="outline" @click="resetSettings">
                    Reset to Default
                </UButton>
                <UButton :loading="saveLoading" @click="saveSettings">
                    Save Changes
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const saveLoading = ref(false);
const settingsCategories = [
    {
        icon: "i-heroicons-cog-6-tooth",
        label: "General",
        slot: "general",
    },
    {
        icon: "i-heroicons-document-text",
        label: "Documents",
        slot: "documents",
    },
];

const timezoneOptions = [
    { label: "Asia/Manila (GMT+8)", value: "Asia/Manila" },
    { label: "Asia/Tokyo (GMT+9)", value: "Asia/Tokyo" },
    { label: "UTC (GMT+0)", value: "UTC" },
];

// Reactive settings object
const settings = ref({
    autoApprove: false,
    backup: {
        enabled: true,
        frequency: "weekly",
        retentionDays: 30,
    },
    barangayName: "",
    contactNumber: "",
    emailAddress: "",
    emailNotifications: true,
    fees: {
        business: "100.00",
        clearance: "50.00",
        indigency: "0.00",
        residency: "30.00",
    },
    municipality: "",
    security: {
        maxLoginAttempts: 5,
        minPasswordLength: 8,
        requireNumbers: true,
        requireSpecialChars: true,
        requireUppercase: true,
        sessionTimeout: 30,
    },
    smsNotifications: false,
    systemName: "Govana",
    timezone: "Asia/Manila",
});

// Function to save settings
const saveSettings = async () => {
    saveLoading.value = true;
    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Settings saved successfully:", settings.value);
    } catch (error) {
        console.error("Failed to save settings:", error);
    } finally {
        saveLoading.value = false;
    }
};

// Function to reset settings to their default values
const resetSettings = () => {
    settings.value = {
        autoApprove: false,
        backup: {
            enabled: true,
            frequency: "weekly",
            retentionDays: 30,
        },
        barangayName: "",
        contactNumber: "",
        emailAddress: "",
        emailNotifications: true,
        fees: {
            business: "100.00",
            clearance: "50.00",
            indigency: "0.00",
            residency: "30.00",
        },
        municipality: "",
        security: {
            maxLoginAttempts: 5,
            minPasswordLength: 8,
            requireNumbers: true,
            requireSpecialChars: true,
            requireUppercase: true,
            sessionTimeout: 30,
        },
        smsNotifications: false,
        systemName: "Govana",
        timezone: "Asia/Manila",
    };
    console.log("Settings have been reset to default.");
};

definePageMeta({ layout: "app-layout", permission: "view settings" });

const route = useRoute();
const routeName = computed(() => route.name ?? "Page");
const { appTitle, metaDescription } = useConstants();
useHead({
    meta: [
        {
            content: metaDescription,
            name: "description",
        },
    ],
    title: `${appTitle} - ${toTitleCase(String(routeName.value))}`,
});
</script>
