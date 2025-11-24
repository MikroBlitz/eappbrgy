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
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg"
            >
                {{ unreadCount > 99 ? "99+" : unreadCount }}
            </div>
        </div>

        <template #panel>
            <div
                class="w-96 max-h-screen overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            >
                <!-- Header -->
                <div
                    class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                >
                    <div class="flex items-center space-x-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white">
                            Announcements
                        </h3>
                        <span
                            v-if="unreadCount > 0"
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                            {{ unreadCount }} new
                        </span>
                    </div>
                    <UButton
                        v-if="unreadCount > 0"
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
                        v-if="loading"
                        class="flex flex-col h-full justify-center items-center text-center text-gray-500 dark:text-gray-400"
                    >
                        <Icon
                            name="svg-spinners:ring-resize"
                            class="h-8 w-8 mb-2"
                        />
                        <p>Loading announcements...</p>
                    </div>

                    <div
                        v-else-if="announcements.length === 0"
                        class="flex flex-col h-full justify-center items-center text-center text-gray-500 dark:text-gray-400 p-8"
                    >
                        <Icon
                            name="solar:megaphone-outline"
                            class="mx-auto h-16 w-16 mb-3 opacity-50"
                        />
                        <p class="font-medium mb-1">No announcements yet</p>
                        <p class="text-xs">Check back later for updates</p>
                    </div>

                    <div v-else>
                        <div
                            v-for="announcement in announcements"
                            :key="announcement.id"
                            class="relative flex items-start p-4 hover:bg-blue-50 dark:hover:bg-blue-900/10 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-all duration-200"
                            :class="{
                                'bg-blue-50/50 dark:bg-blue-900/5':
                                    !announcement.read,
                            }"
                            @click="openAnnouncementModal(announcement)"
                        >
                            <!-- Icon -->
                            <div class="flex-shrink-0 mr-3">
                                <div
                                    class="h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                                    :class="
                                        !announcement.read
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                    "
                                >
                                    <Icon
                                        name="solar:document-text-bold"
                                        class="h-5 w-5"
                                    />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 min-w-0">
                                <div
                                    class="flex items-start justify-between mb-1"
                                >
                                    <p
                                        class="text-sm font-semibold text-gray-900 dark:text-white pr-2"
                                        :class="{
                                            'font-bold': !announcement.read,
                                        }"
                                    >
                                        {{ announcement.title }}
                                    </p>
                                    <!-- Unread indicator -->
                                    <div
                                        v-if="!announcement.read"
                                        class="flex-shrink-0 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"
                                    />
                                </div>
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed"
                                >
                                    {{ announcement.content }}
                                </p>
                                <div
                                    class="flex items-center justify-between mt-2"
                                >
                                    <p
                                        class="text-xs text-gray-500 dark:text-gray-500 flex items-center"
                                    >
                                        <Icon
                                            name="solar:clock-circle-outline"
                                            class="h-3 w-3 mr-1"
                                        />
                                        {{
                                            formatDateAgo(
                                                announcement.publish_date,
                                            )
                                        }}
                                    </p>
                                    <span
                                        v-if="isNew(announcement.created_at)"
                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white shadow-sm"
                                    >
                                        New
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div
                    v-if="auth.can('create announcement')"
                    class="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                >
                    <UButton
                        variant="ghost"
                        size="sm"
                        color="blue"
                        icon="solar:add-circle-bold"
                        class="w-full justify-center font-medium"
                        @click="isOpen = true"
                    >
                        Create Announcement
                    </UButton>
                </div>
            </div>
        </template>
    </UPopover>

    <ModalForm
        ref="modalFormRef"
        v-model:is-open="isOpen"
        title="Create New Announcement"
        :form-schema="formSchema"
        :zod-schema="zodSchema"
        :state="formState"
        :on-submit="onSubmit"
        :loading="modalLoading"
    />

    <!-- Announcement Detail Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'w-full max-w-3xl' }">
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
                        <div
                            class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                            <span class="flex items-center">
                                <Icon
                                    name="solar:calendar-bold"
                                    class="h-4 w-4 mr-1.5"
                                />
                                Published
                                {{
                                    formatDateAgo(
                                        selectedAnnouncement.publish_date,
                                    )
                                }}
                            </span>
                            <span
                                v-if="isNew(selectedAnnouncement.created_at)"
                                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-sm"
                            >
                                New
                            </span>
                        </div>
                    </div>
                </div>
                <UButton
                    variant="ghost"
                    color="gray"
                    size="sm"
                    icon="solar:close-circle-bold"
                    class="flex-shrink-0"
                    @click="isModalOpen = false"
                />
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
                    <span class="flex items-center">
                        <Icon
                            name="solar:clock-circle-outline"
                            class="h-3.5 w-3.5 mr-1"
                        />
                        Created
                        {{ formatDateAgo(selectedAnnouncement.created_at) }}
                        <span
                            v-if="
                                selectedAnnouncement.updated_at !==
                                selectedAnnouncement.created_at
                            "
                        >
                            · Updated
                            {{ formatDateAgo(selectedAnnouncement.updated_at) }}
                        </span>
                    </span>
                </div>
                <UButton
                    variant="soft"
                    color="blue"
                    size="sm"
                    @click="isModalOpen = false"
                >
                    Close
                </UButton>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import type { Announcement } from "~/types/codegen/graphql";

import {
    announcementPaginate,
    upsertAnnouncement,
} from "~/graphql/Announcement";
import { notificationSchema } from "~/pages/dashboard/data/notificationSchema";

// Local storage key for read announcements
const READ_ANNOUNCEMENTS_KEY = "read_announcements";

const toast = useToast();
const auth = useAuthStore();

// Modal state
const isModalOpen = ref(false);
const modalLoading = ref(false);
const selectedAnnouncement: Ref<Announcement | null> = ref(null);
const loading = ref(true);

const announcements: Ref<Announcement[]> = ref([]);
const isOpen = ref(false);
const formSchema = computed(() => notificationSchema());
const zodSchema = computed(() => formZodSchema(formSchema.value));
const formState = reactive({
    content: "",
    id: "",
    publish_date: "",
    title: "",
});

// Get read announcements from localStorage
const getReadAnnouncements = (): Set<string> => {
    if (import.meta.client) {
        const stored = localStorage.getItem(READ_ANNOUNCEMENTS_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    }
    return new Set();
};

// Save read announcements to localStorage
const saveReadAnnouncements = (readIds: Set<string>) => {
    if (import.meta.client) {
        localStorage.setItem(
            READ_ANNOUNCEMENTS_KEY,
            JSON.stringify([...readIds]),
        );
    }
};

// Check if announcement is older than 3 days
const isOlderThan3Days = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays > 3;
};

const unreadCount = computed(() => {
    return announcements.value.filter((a) => !a.read).length;
});

const { refetch, result } = useQuery(announcementPaginate, {
    first: 10,
});

const loadAnnouncements = async () => {
    loading.value = true;
    try {
        await refetch();
        const data = result.value?.announcementPaginate?.data || [];
        const readIds = getReadAnnouncements();

        // Map announcements and determine read status
        announcements.value = data.map((announcement) => ({
            ...announcement,
            read:
                readIds.has(announcement.id) ||
                isOlderThan3Days(announcement.created_at),
        }));
    } catch (error) {
        console.error("Error loading announcements:", error);
    } finally {
        loading.value = false;
    }
};

const onSubmit = async () => {
    modalLoading.value = true;
    try {
        const { mutate } = useMutation(upsertAnnouncement);
        await mutate({
            input: {
                ...formState,
                createdBy: { connect: auth.user?.id },
                publish_date: formatDateTimeForGraphQL(formState.publish_date),
            },
        });

        Object.assign(formState, {
            content: "",
            id: "",
            publish_date: "",
            title: "",
        });

        isOpen.value = false;
        await loadAnnouncements();

        toast.add({
            color: "green",
            description: "Announcement created successfully",
            title: "Success",
        });
    } catch (error) {
        console.error("Error creating announcement:", error);
        toast.add({
            color: "red",
            description: "Failed to create announcement",
            title: "Error",
        });
    } finally {
        modalLoading.value = false;
    }
};

const isNew = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
};

const openAnnouncementModal = (announcement: Announcement | null) => {
    selectedAnnouncement.value = announcement;
    isModalOpen.value = true;

    if (!announcement.read) {
        markAsRead(announcement.id);
    }
};

const markAsRead = (id: string) => {
    const announcement = announcements.value.find((a) => a.id === id);
    if (announcement) {
        announcement.read = true;
    }

    const readIds = getReadAnnouncements();
    readIds.add(id);
    saveReadAnnouncements(readIds);
};

const markAllAsRead = () => {
    const readIds = getReadAnnouncements();
    announcements.value.forEach((announcement) => {
        announcement.read = true;
        readIds.add(announcement.id);
    });

    saveReadAnnouncements(readIds);
};

onMounted(async () => {
    await loadAnnouncements();
});

onMounted(() => {
    const interval = setInterval(async () => {
        await loadAnnouncements();
    }, 60000);

    onBeforeUnmount(() => {
        clearInterval(interval);
    });
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
