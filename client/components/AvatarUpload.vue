<template>
    <div>
        <div class="flex items-center gap-4">
            <div class="relative">
                <img
                    :src="
                        previewUrl ||
                        user?.avatar_url ||
                        '/placeholder-avatar.png'
                    "
                    class="w-24 h-24 rounded-full object-cover border-2"
                    alt="Avatar"
                />
                <label
                    for="avatar-upload"
                    class="absolute bottom-0 right-0 bg-primary-500 text-white p-1 px-2 rounded-full cursor-pointer hover:bg-primary-600"
                >
                    <UIcon name="i-heroicons-camera" class="size-4" />
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleFileSelect"
                    />
                </label>
            </div>

            <div class="flex flex-col gap-2">
                <UButton
                    v-if="selectedFile"
                    color="primary"
                    :loading="uploading"
                    @click="uploadAvatar"
                >
                    Upload Avatar
                </UButton>
                <UButton
                    v-if="user?.avatar_url && !selectedFile"
                    color="red"
                    variant="outline"
                    :loading="uploading"
                    @click="removeAvatar"
                >
                    Remove Avatar
                </UButton>
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

import { upsertUserAvatarMutation } from "~/graphql/User";

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

const { mutate } = useMutation(upsertUserAvatarMutation);

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

const uploadAvatar = async () => {
    if (!selectedFile.value || !props.user?.id) return;

    console.log("Upload Avatar", selectedFile.value);

    uploading.value = true;

    try {
        await mutate({
            avatar: selectedFile.value,
            id: props.user.id,
        });

        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: "Avatar uploaded successfully!",
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
};

const removeAvatar = async () => {
    if (!props.user?.id) return;

    uploading.value = true;

    try {
        const blob = new Blob([""], { type: "image/png" });
        const emptyFile = new File([blob], "remove-avatar.png", {
            type: "image/png",
        });

        await mutate({
            avatar: emptyFile,
            id: props.user.id,
        });

        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: "Avatar removed successfully!",
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

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
