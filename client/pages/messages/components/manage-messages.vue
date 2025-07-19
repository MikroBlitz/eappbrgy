<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Sidebar - Contacts (Desktop only) -->
        <div
            class="hidden lg:flex lg:w-80 xl:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col"
        >
            <!-- Sidebar Header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center justify-center gap-1">
                        <UButton
                            size="2xs"
                            class="rounded-full p-1 mr-2"
                            color="red"
                            variant="outline"
                            @click="router.back()"
                        >
                            <Icon name="mdi:arrow-left" size="20" />
                        </UButton>
                        <h2
                            class="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                            Messages
                        </h2>
                    </div>
                    <UButton
                        icon="i-heroicons-pencil-square"
                        variant="ghost"
                        size="sm"
                        @click="startNewChat"
                    />
                </div>

                <!-- Search -->
                <UInput
                    v-model="searchQuery"
                    placeholder="Search conversations..."
                    icon="i-heroicons-magnifying-glass"
                    size="sm"
                />
            </div>

            <!-- Contacts List -->
            <div class="flex-1 overflow-y-auto">
                <div
                    v-for="contact in filteredContacts"
                    :key="contact.id"
                    class="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors"
                    :class="{
                        'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-l-primary-500':
                            selectedContactId === contact.id,
                    }"
                    @click="selectContact(contact)"
                >
                    <div class="relative">
                        <UAvatar
                            :alt="contact.name"
                            :src="contact.avatar"
                            size="md"
                        />
                        <div
                            v-if="contact.isOnline"
                            class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
                        />
                    </div>

                    <div class="ml-3 flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <p
                                class="text-sm font-medium text-gray-900 dark:text-white truncate"
                            >
                                {{ contact.name }}
                            </p>
                            <span
                                class="text-xs text-gray-500 dark:text-gray-400"
                            >
                                {{ formatContactTime(contact.lastMessageTime) }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between mt-1">
                            <p
                                class="text-sm text-gray-500 dark:text-gray-400 truncate"
                            >
                                {{ contact.lastMessage }}
                            </p>
                            <div class="flex items-center space-x-1">
                                <UBadge
                                    v-if="contact.unreadCount > 0"
                                    :label="contact.unreadCount"
                                    color="primary"
                                    size="xs"
                                />
                                <UIcon
                                    v-if="contact.isTyping"
                                    name="i-heroicons-ellipsis-horizontal"
                                    class="text-primary-500 animate-pulse"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
            <!-- Mobile Header (shows contact info) / Desktop Header -->
            <div
                class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-xs"
            >
                <div class="flex items-center space-x-3">
                    <!-- Mobile: Back to contacts, Desktop: Contact info -->
                    <UButton
                        icon="i-heroicons-bars-3"
                        variant="ghost"
                        size="sm"
                        class="lg:hidden"
                        @click="showMobileContacts = true"
                    />

                    <UAvatar
                        :alt="selectedContact?.name || 'Select a contact'"
                        :src="selectedContact?.avatar"
                        size="sm"
                        class="ring-2 ring-primary-500/20"
                    />

                    <div v-if="selectedContact">
                        <h1
                            class="font-semibold text-gray-900 dark:text-white text-lg"
                        >
                            {{ selectedContact.name }}
                        </h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {{
                                selectedContact.isOnline
                                    ? "Online"
                                    : "Last seen recently"
                            }}
                        </p>
                    </div>
                    <div v-else class="hidden lg:block">
                        <h1
                            class="font-semibold text-gray-900 dark:text-white text-lg"
                        >
                            Select a conversation
                        </h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Choose a contact to start messaging
                        </p>
                    </div>
                </div>

                <div v-if="selectedContact" class="flex items-center space-x-2">
                    <UButton
                        icon="i-heroicons-phone"
                        variant="ghost"
                        size="sm"
                        class="hidden sm:flex"
                    />
                    <UButton
                        icon="i-heroicons-video-camera"
                        variant="ghost"
                        size="sm"
                        class="hidden sm:flex"
                    />
                    <UDropdown
                        :items="dropdownItems"
                        :popper="{ placement: 'bottom-end' }"
                    >
                        <UButton
                            icon="i-heroicons-ellipsis-vertical"
                            variant="ghost"
                            size="sm"
                        />
                    </UDropdown>
                </div>
            </div>

            <!-- Chat Content or Empty State -->
            <div
                v-if="!selectedContact"
                class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
            >
                <div class="text-center">
                    <UIcon
                        name="i-heroicons-chat-bubble-left-right"
                        class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                    />
                    <h3
                        class="mt-4 text-lg font-medium text-gray-900 dark:text-white"
                    >
                        No conversation selected
                    </h3>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Choose a contact from the sidebar to start messaging
                    </p>
                </div>
            </div>

            <!-- Messages Container -->
            <div
                v-else
                ref="messagesContainer"
                class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
                @scroll="handleScroll"
            >
                <!-- Loading indicator for pagination -->
                <div v-if="loading" class="flex justify-center py-4">
                    <UIcon
                        name="i-heroicons-arrow-path"
                        class="animate-spin text-primary-500"
                    />
                </div>

                <!-- Messages -->
                <div
                    v-for="message in currentMessages"
                    :key="message.id"
                    class="flex"
                    :class="
                        isCurrentUser(message.sender.name)
                            ? 'justify-end'
                            : 'justify-start'
                    "
                >
                    <div
                        class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-2 shadow-xs"
                        :class="getMessageClasses(message.sender.name)"
                    >
                        <!-- Sender name (only for received messages in group chats) -->
                        <div
                            v-if="
                                !isCurrentUser(message.sender.name) &&
                                showSenderName
                            "
                            class="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                        >
                            {{ message.sender.name }}
                        </div>

                        <!-- Message content -->
                        <p class="text-sm leading-relaxed break-words">
                            {{ message.message }}
                        </p>

                        <!-- Message time -->
                        <div
                            class="text-xs mt-1 opacity-70"
                            :class="
                                isCurrentUser(message.sender.name)
                                    ? 'text-right text-white'
                                    : 'text-gray-500 dark:text-gray-400'
                            "
                        >
                            {{ formatTime(message.created_at) }}
                        </div>
                    </div>
                </div>

                <!-- Typing indicator -->
                <div
                    v-if="selectedContact?.isTyping"
                    class="flex justify-start"
                >
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-xs border border-gray-200 dark:border-gray-700"
                    >
                        <div class="flex space-x-1">
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            />
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style="animation-delay: 0.1s"
                            />
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style="animation-delay: 0.2s"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message Input -->
            <div
                v-if="selectedContact"
                class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
                <div class="flex items-end space-x-3">
                    <!-- Attachment button -->
                    <UButton
                        icon="i-heroicons-paper-clip"
                        variant="ghost"
                        size="sm"
                        class="shrink-0 self-end mb-1"
                        @click="handleAttachment"
                    />

                    <!-- Message input -->
                    <div class="flex-1 relative">
                        <UTextarea
                            v-model="newMessage"
                            placeholder="Type a message..."
                            :rows="1"
                            autoresize
                            :maxrows="4"
                            class="resize-none"
                            @keydown="handleKeyDown"
                            @input="handleTyping"
                        />

                        <!-- Emoji button -->
                        <UButton
                            icon="i-heroicons-face-smile"
                            variant="ghost"
                            size="xs"
                            class="absolute right-2 bottom-2"
                            @click="toggleEmojiPicker"
                        />
                    </div>

                    <!-- Send button -->
                    <UButton
                        :icon="
                            newMessage.trim()
                                ? 'i-heroicons-paper-airplane'
                                : 'i-heroicons-microphone'
                        "
                        :disabled="!newMessage.trim() && !isRecording"
                        :loading="sending"
                        size="sm"
                        class="shrink-0 self-end mb-1"
                        :class="
                            newMessage.trim() || isRecording
                                ? 'bg-primary-500 hover:bg-primary-600'
                                : ''
                        "
                        @click="
                            newMessage.trim()
                                ? sendMessage()
                                : toggleVoiceRecording()
                        "
                    />
                </div>

                <!-- Voice recording indicator -->
                <div
                    v-if="isRecording"
                    class="mt-2 flex items-center space-x-2 text-red-500"
                >
                    <UIcon
                        name="i-heroicons-microphone"
                        class="animate-pulse"
                    />
                    <span class="text-sm"
                        >Recording... {{ recordingTime }}s</span
                    >
                    <UButton variant="ghost" size="xs" @click="cancelRecording">
                        Cancel
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Mobile Contacts Overlay -->
        <USlideover v-model="showMobileContacts" side="left">
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <UButton
                        size="2xs"
                        class="rounded-full p-1 mr-2"
                        variant="ghost"
                        @click="showMobileContacts = false"
                    >
                        <Icon name="mdi:arrow-left" size="20" />
                    </UButton>
                    <h2
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        Contacts
                    </h2>
                    <UButton
                        icon="i-heroicons-x-mark"
                        color="red"
                        variant="outline"
                        size="sm"
                        @click="router.back()"
                    />
                </div>

                <!-- Mobile Search -->
                <UInput
                    v-model="searchQuery"
                    placeholder="Search conversations..."
                    icon="i-heroicons-magnifying-glass"
                    size="sm"
                    class="mb-4"
                />

                <!-- Mobile Contacts List -->
                <div class="space-y-2">
                    <div
                        v-for="contact in filteredContacts"
                        :key="contact.id"
                        class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors"
                        @click="selectContact(contact, true)"
                    >
                        <div class="relative">
                            <UAvatar
                                :alt="contact.name"
                                :src="contact.avatar"
                                size="md"
                            />
                            <div
                                v-if="contact.isOnline"
                                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
                            />
                        </div>

                        <div class="ml-3 flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white truncate"
                                >
                                    {{ contact.name }}
                                </p>
                                <UBadge
                                    v-if="contact.unreadCount > 0"
                                    :label="contact.unreadCount"
                                    color="primary"
                                    size="xs"
                                />
                            </div>
                            <p
                                class="text-sm text-gray-500 dark:text-gray-400 truncate mt-1"
                            >
                                {{ contact.lastMessage }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const router = useRouter();

// Contacts data
const contacts = ref([
    {
        avatar: "",
        id: "1",
        isOnline: true,
        isTyping: false,
        lastMessage: "Hello manager from Admin",
        lastMessageTime: new Date(Date.now() - 1000000),
        name: "Super Admin",
        unreadCount: 2,
    },
    {
        avatar: "",
        id: "2",
        isOnline: false,
        isTyping: false,
        lastMessage: "See you tomorrow!",
        lastMessageTime: new Date(Date.now() - 3600000),
        name: "John Doe",
        unreadCount: 0,
    },
    {
        avatar: "",
        id: "3",
        isOnline: true,
        isTyping: true,
        lastMessage: "Thanks for the update",
        lastMessageTime: new Date(Date.now() - 7200000),
        name: "Jane Smith",
        unreadCount: 1,
    },
    {
        avatar: "",
        id: "4",
        isOnline: true,
        isTyping: false,
        lastMessage: "Meeting at 3 PM",
        lastMessageTime: new Date(Date.now() - 10800000),
        name: "Team Lead",
        unreadCount: 0,
    },
]);

// Messages data (organized by contact)
const messagesByContact = ref({
    "1": [
        {
            created_at: new Date(Date.now() - 3600000),
            id: "1",
            message: "Hello manager from Admin",
            receiver: { name: "Manager Mans" },
            sender: { name: "Super Admin" },
        },
        {
            created_at: new Date(Date.now() - 3500000),
            id: "2",
            message: "Hello manager from Admin",
            receiver: { name: "Manager Mans" },
            sender: { name: "Super Admin" },
        },
        {
            created_at: new Date(Date.now() - 3000000),
            id: "3",
            message: "Hello manager from Admin",
            receiver: { name: "Manager Mans" },
            sender: { name: "Super Admin" },
        },
        {
            created_at: new Date(Date.now() - 2000000),
            id: "4",
            message: "Hello admin from manager",
            receiver: { name: "Super Admin" },
            sender: { name: "Manager Mans" },
        },
        {
            created_at: new Date(Date.now() - 1000000),
            id: "5",
            message: "Hello admin from manager",
            receiver: { name: "Super Admin" },
            sender: { name: "Manager Mans" },
        },
    ],
    "2": [
        {
            created_at: new Date(Date.now() - 4000000),
            id: "6",
            message: "Hey there!",
            receiver: { name: "Manager Mans" },
            sender: { name: "John Doe" },
        },
    ],
});

// Reactive state
const selectedContactId = ref("1"); // Default selection
const newMessage = ref("");
const loading = ref(false);
const sending = ref(false);
const isRecording = ref(false);
const recordingTime = ref(0);
const messagesContainer = ref<HTMLElement>();
const showMobileContacts = ref(false);
const isMobileDevice = useMediaQuery("(max-width: 768px)");
onBeforeMount(() => {
    if (isMobileDevice.value) showMobileContacts.value = true;
});
const searchQuery = ref("");

// Mock data
const currentUser = ref("Manager Mans");
const showSenderName = ref(false);

// Computed properties
const selectedContact = computed(() => {
    return contacts.value.find((c) => c.id === selectedContactId.value);
});

const currentMessages = computed(() => {
    return messagesByContact.value[selectedContactId.value] || [];
});

const filteredContacts = computed(() => {
    if (!searchQuery.value) return contacts.value;
    return contacts.value.filter(
        (contact) =>
            contact.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            contact.lastMessage
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()),
    );
});

// Dropdown menu items
const dropdownItems = [
    [
        { icon: "i-heroicons-user", label: "View Profile" },
        { icon: "i-heroicons-magnifying-glass", label: "Search Messages" },
    ],
    [
        { icon: "i-heroicons-bell-slash", label: "Mute Notifications" },
        {
            click: () => clearChat(),
            icon: "i-heroicons-trash",
            label: "Clear Chat",
        },
    ],
];

// Helper functions
const isCurrentUser = (senderName: string) => {
    return senderName === currentUser.value;
};

const getMessageClasses = (senderName: string) => {
    if (isCurrentUser(senderName)) {
        return "bg-primary-500 text-white ml-4";
    }
    return "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 mr-4";
};

const formatTime = (date: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

const formatContactTime = (date: Date) => {
    if (!date) return "";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return formatTime(date);
    } else if (days === 1) {
        return "Yesterday";
    } else if (days < 7) {
        return `${days}d ago`;
    } else {
        return date.toLocaleDateString();
    }
};

// Contact selection
const selectContact = (contact: any, closeMobile = false) => {
    selectedContactId.value = contact.id;
    if (closeMobile) {
        showMobileContacts.value = false;
    }
    // Mark messages as read
    contact.unreadCount = 0;
    nextTick(() => {
        scrollToBottom();
    });
};

const startNewChat = () => {
    // Implement new chat logic
    console.log("Start new chat");
};

// Message handling
const sendMessage = async () => {
    if (!newMessage.value.trim() || sending.value || !selectedContactId.value)
        return;

    sending.value = true;

    try {
        const message = {
            created_at: new Date(),
            id: String(Date.now()),
            message: newMessage.value.trim(),
            receiver: { name: selectedContact.value?.name || "" },
            sender: { name: currentUser.value },
        };

        // Add to messages
        if (!messagesByContact.value[selectedContactId.value]) {
            messagesByContact.value[selectedContactId.value] = [];
        }
        messagesByContact.value[selectedContactId.value].push(message);

        // Update contact's last message
        const contact = contacts.value.find(
            (c) => c.id === selectedContactId.value,
        );
        if (contact) {
            contact.lastMessage = message.message;
            contact.lastMessageTime = message.created_at;
        }

        newMessage.value = "";
        await nextTick();
        scrollToBottom();
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        sending.value = false;
    }
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
};

const handleTyping = () => {
    // Implement typing indicator logic
};

// Voice recording
let recordingInterval: NodeJS.Timeout | null = null;

const toggleVoiceRecording = () => {
    if (isRecording.value) {
        stopRecording();
    } else {
        startRecording();
    }
};

const startRecording = () => {
    isRecording.value = true;
    recordingTime.value = 0;
    recordingInterval = setInterval(() => {
        recordingTime.value++;
    }, 1000);
};

const stopRecording = () => {
    isRecording.value = false;
    recordingTime.value = 0;
    if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
    }
};

const cancelRecording = () => {
    isRecording.value = false;
    recordingTime.value = 0;
    if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
    }
};

// Other handlers
const handleAttachment = () => {
    console.log("Handle attachment");
};

const toggleEmojiPicker = () => {
    console.log("Toggle emoji picker");
};

const clearChat = () => {
    if (selectedContactId.value) {
        messagesByContact.value[selectedContactId.value] = [];
    }
};

// Scrolling and pagination
const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
    }
};

const handleScroll = () => {
    if (!messagesContainer.value) return;

    const { scrollTop } = messagesContainer.value;
    if (scrollTop === 0 && !loading.value) {
        loadMoreMessages();
    }
};

const loadMoreMessages = async () => {
    loading.value = true;
    try {
        // GraphQL pagination logic here
    } catch (error) {
        console.error("Error loading more messages:", error);
    } finally {
        loading.value = false;
    }
};

// Lifecycle
onMounted(() => {
    scrollToBottom();
});

onUnmounted(() => {
    if (recordingInterval) {
        clearInterval(recordingInterval);
    }
});
</script>
