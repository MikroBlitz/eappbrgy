<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <div class="relative">
            <UButton
                icon="solar:bell-broken"
                variant="ghost"
                :trailing="false"
                class="hover:bg-transparent hover:scale-110 transition-all duration-300 p-1"
                size="xl"
            />

            <!-- Announcement Badge -->
            <div
                v-if="announcements.length > 0"
                class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
            >
                {{ announcements.length > 99 ? "99+" : announcements.length }}
            </div>
        </div>

        <template #panel>
            <div class="w-96 max-h-screen overflow-hidden">
                <!-- Header -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
                >
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                        Announcements
                    </h3>
                    <UButton
                        v-if="announcements.length > 0"
                        variant="ghost"
                        size="xs"
                        color="blue"
                        @click="markAllAsRead"
                    >
                        Mark all read
                    </UButton>
                </div>

                <!-- Announcements List -->
                <div class="h-[calc(85vh-100px)] overflow-y-auto">
                    <div
                        v-if="announcements.length === 0"
                        class="flex flex-col h-full justify-center items-center text-center text-gray-500 dark:text-gray-400"
                    >
                        <Icon
                            name="solar:megaphone-outline"
                            class="mx-auto h-12 w-12 mb-2 opacity-50"
                        />
                        <p>No announcements available</p>
                    </div>

                    <div v-else>
                        <div
                            v-for="announcement in announcements"
                            :key="announcement.id"
                            class="flex items-start p-4 hover:bg-primary/30 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-colors"
                            @click="openAnnouncementModal(announcement)"
                        >
                            <!-- Icon -->
                            <div class="shrink-0 mr-3">
                                <div
                                    class="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                >
                                    <Icon
                                        name="solar:document-text-outline"
                                        class="h-4 w-4"
                                    />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white mb-1"
                                >
                                    {{ announcement.title }}
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2"
                                >
                                    {{ announcement.content }}
                                </p>
                                <div
                                    class="flex items-center justify-between mt-2"
                                >
                                    <p
                                        class="text-xs text-gray-400 dark:text-gray-500"
                                    >
                                        {{
                                            formatDateAgo(
                                                announcement.publish_date,
                                            )
                                        }}
                                    </p>
                                    <span
                                        v-if="isNew(announcement.created_at)"
                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                    >
                                        New
                                    </span>
                                </div>
                            </div>

                            <!-- Unread indicator -->
                            <div
                                v-if="!announcement.read"
                                class="shrink-0 w-2 h-2 bg-blue-500 rounded-full ml-2"
                            />
                        </div>
                    </div>
                </div>

                <!--                &lt;!&ndash; Footer &ndash;&gt;-->
                <!--                <div-->
                <!--                    v-if="announcements.length > 0"-->
                <!--                    class="p-3 border-t border-gray-200 dark:border-gray-700"-->
                <!--                >-->
                <!--                    <UButton-->
                <!--                        variant="ghost"-->
                <!--                        size="sm"-->
                <!--                        color="blue"-->
                <!--                        class="w-full justify-center"-->
                <!--                        @click="viewAllAnnouncements"-->
                <!--                    >-->
                <!--                        View all announcements-->
                <!--                    </UButton>-->
                <!--                </div>-->
            </div>
        </template>
    </UPopover>

    <!-- Announcement Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'w-full max-w-2xl' }">
        <div v-if="selectedAnnouncement" class="p-6">
            <!-- Modal Header -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div
                        class="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                        <Icon
                            name="solar:document-text-outline"
                            class="h-5 w-5"
                        />
                    </div>
                    <div>
                        <h2
                            class="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                            {{ selectedAnnouncement.title }}
                        </h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Published
                            {{
                                formatDateAgo(selectedAnnouncement.publish_date)
                            }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span
                        v-if="isNew(selectedAnnouncement.created_at)"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                        New
                    </span>
                    <UButton
                        variant="ghost"
                        color="red"
                        size="sm"
                        icon="solar:close-circle-outline"
                        @click="isModalOpen = false"
                    />
                </div>
            </div>

            <!-- Modal Content -->
            <div class="prose prose-sm max-w-none dark:prose-invert">
                <div
                    class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
                >
                    {{ selectedAnnouncement.content }}
                </div>
            </div>

            <!-- Modal Footer -->
            <div
                class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
                <div class="text-xs text-gray-500 dark:text-gray-400">
                    Created {{ formatDateAgo(selectedAnnouncement.created_at) }}
                    <span
                        v-if="
                            selectedAnnouncement.updated_at !==
                            selectedAnnouncement.created_at
                        "
                    >
                        · Updated
                        {{ formatDateAgo(selectedAnnouncement.updated_at) }}
                    </span>
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup>
import { ref } from "vue";

// Modal state
const isModalOpen = ref(false);
const selectedAnnouncement = ref(null);

const announcements = ref([
    {
        content:
            "Inaanyayahan po ang lahat ng residente na magpunta sa barangay hall para sa libreng medical check-up sa Enero 15, 8:00 AM - 3:00 PM. Dalhin ang inyong barangay ID.",
        created_at: "2025-01-05T09:00:00Z",
        id: 1,
        publish_date: "2025-01-05",
        read: false,
        title: "Libreng Medical Check-Up",
        updated_at: "2025-01-05T09:00:00Z",
    },
    {
        content:
            "Magsasagawa ng pagkukumpuni ng kalsada sa Purok 3 simula Enero 8 hanggang Enero 12. Asahan ang pansamantalang abala sa trapiko.",
        created_at: "2025-01-03T14:00:00Z",
        id: 2,
        publish_date: "2025-01-03",
        read: false,
        title: "Pagkukumpuni ng Kalsada",
        updated_at: "2025-01-03T14:00:00Z",
    },
    {
        content:
            "Magkakaroon tayo ng barangay clean-up drive sa Enero 20, 7:00 AM. Kita-kits po sa covered court. Magdala ng walis, dustpan, at iba pang kagamitan.",
        created_at: "2024-12-30T08:00:00Z",
        id: 3,
        publish_date: "2024-12-30",
        read: true,
        title: "Clean-up Drive",
        updated_at: "2024-12-30T08:00:00Z",
    },
    {
        content:
            "Pinapaalalahanan ang lahat ng residente na siguraduhing naka-lock ang mga pinto sa gabi. Mag-ingat sa mga kahina-hinalang tao at agad ipagbigay-alam sa tanod.",
        created_at: "2024-12-28T18:00:00Z",
        id: 4,
        publish_date: "2024-12-28",
        read: false,
        title: "Paalala sa Seguridad",
        updated_at: "2024-12-28T18:00:00Z",
    },
    {
        content:
            "Inaanyayahan ang lahat sa Barangay General Assembly sa Enero 25, 2:00 PM sa barangay hall. Tatalakayin ang mga plano at proyekto para sa 2025.",
        created_at: "2024-12-25T10:00:00Z",
        id: 5,
        publish_date: "2024-12-25",
        read: true,
        title: "Pagpupulong ng Barangay",
        updated_at: "2024-12-25T10:00:00Z",
    },
]);

const isNew = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInHours = (now - created) / (1000 * 60 * 60);
    return diffInHours <= 24; // Consider "new" if created within last 24 hours
};

const openAnnouncementModal = (announcement) => {
    selectedAnnouncement.value = announcement;
    isModalOpen.value = true;
    markAsRead(announcement.id);
};

const markAsRead = (id) => {
    const announcement = announcements.value.find((a) => a.id === id);
    if (announcement) {
        announcement.read = true;
    }
};

const markAllAsRead = () => {
    announcements.value.forEach((announcement) => {
        announcement.read = true;
    });
};

const viewAllAnnouncements = () => {
    // Navigate to announcements page
    // This would typically use your router
    console.log("Navigate to announcements page");
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
