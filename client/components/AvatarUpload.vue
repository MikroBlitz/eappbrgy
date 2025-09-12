<template>
    <div>
        <div class="flex items-center gap-4">
            <div class="relative">
                <img
                    :src="
                        previewUrl || currentAvatarUrl || '/images/avatar.png'
                    "
                    class="w-24 h-24 rounded-full object-cover border"
                    alt="Avatar"
                />
                <label
                    for="avatar-upload"
                    class="absolute -bottom-2 -left-1 text-primary p-1 px-2 rounded-xl cursor-pointer transition duration-300 hover:scale-110"
                >
                    <UIcon name="solar:camera-bold" class="size-6 mt-1" />
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleFileSelect"
                    />
                </label>

                <div class="absolute -top-1 -right-4">
                    <UButton
                        v-if="currentAvatarUrl && !selectedFile"
                        color="red"
                        variant="link"
                        :loading="uploading"
                        icon="solar:trash-bin-minimalistic-bold"
                        class="transition duration-300 hover:scale-110"
                        @click="removeAvatar"
                    />
                </div>
            </div>
        </div>

        <p v-if="selectedFile" class="text-sm text-gray-500 mt-2">
            Selected: {{ selectedFile.name }} ({{
                formatFileSize(selectedFile.size)
            }})
        </p>

        <p class="text-xs text-gray-400 mt-1">
            Supported formats: JPEG, PNG, GIF, WEBP. Max size: 2MB
        </p>
    </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/codegen/graphql";

import { formatFileSize } from "~/utils/helpers";

const props = defineProps<{
    user?: User;
}>();

const emit = defineEmits<{
    (e: "avatar-updated"): void;
}>();

const toast = useToast();
const uploading = ref(false);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const currentAvatarUrl = ref<string | null>(props.user?.avatar_url || null);
const config = useRuntimeConfig();

const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];

        // Validate file size
        if (file.size > 2 * 1024 * 1024) {
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: "File size must be less than 2MB",
            });
            return;
        }

        // Validate file type
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: "Please select a valid image file (JPEG, PNG, GIF, WEBP)",
            });
            return;
        }

        selectedFile.value = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile.value);
    }
};

async function uploadAvatar(userId?: string) {
    if (!selectedFile.value || !(userId || props.user?.id)) return;

    uploading.value = true;

    try {
        const form = new FormData();
        form.append("avatar", selectedFile.value);
        const auth = useAuthStore();
        const base = config.public.API_URL?.replace(/\/?$/, "");
        const id = userId || props.user?.id;
        await $fetch(`/api/users/${id}/avatar`, {
            baseURL: base,
            body: form,
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            method: "POST",
        });

        selectedFile.value = null;
        previewUrl.value = null;
        emit("avatar-updated");
    } catch (error) {
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: "Failed to upload avatar",
        });
        console.error("Avatar upload error:", error);
    } finally {
        uploading.value = false;
    }
}

const removeAvatar = async () => {
    if (!props.user?.id) return;

    uploading.value = true;
    selectedFile.value = null;
    previewUrl.value = null;

    try {
        const auth = useAuthStore();
        const base = config.public.API_URL?.replace(/\/?$/, "");
        await $fetch(`/api/users/${props.user.id}/avatar`, {
            baseURL: base,
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        });
        currentAvatarUrl.value = null;

        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: "Avatar removed!",
        });

        emit("avatar-updated");
    } catch (error) {
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: "Failed to remove avatar",
        });
        console.error("Avatar removal error:", error);
    } finally {
        uploading.value = false;
    }
};

// Expose methods for parent components
function hasPendingFile() {
    return !!selectedFile.value;
}

async function uploadIfNeeded(userId?: string) {
    if (selectedFile.value) {
        await uploadAvatar(userId);
    }
}

defineExpose({ hasPendingFile, uploadIfNeeded });

watch(
    () => props.user?.avatar_url,
    (newUrl) => {
        currentAvatarUrl.value = newUrl || null;
    },
);
</script>
