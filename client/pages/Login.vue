<template>
    <div
        class="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900"
    >
        <UCard class="w-full max-w-md">
            <template #header>
                <div class="text-center mb-4">
                    <h1
                        class="text-2xl font-bold text-slate-800 dark:text-slate-200"
                    >
                        Welcome to <span class="text-primary">MarketHub</span>
                    </h1>
                    <p class="text-slate-800 dark:text-slate-200 mt-2">
                        Sign in to your account
                    </p>
                </div>
            </template>

            <UForm :validate="validate" :state="formState" @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput
                        v-model="formState.email"
                        placeholder="Enter your email"
                        type="email"
                        autocomplete="email"
                        icon="i-heroicons-envelope"
                        required
                    />
                </UFormGroup>

                <UFormGroup label="Password" name="password" class="mt-4">
                    <UInput
                        v-model="formState.password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="current-password"
                        icon="i-heroicons-lock-closed"
                        required
                    />
                </UFormGroup>

                <div class="flex items-center justify-between mt-4">
                    <UCheckbox
                        v-model="formState.rememberMe"
                        label="Remember me"
                        name="remember"
                    />
                    <UButton
                        to="/forgot-password"
                        variant="link"
                        color="primary"
                    >
                        Forgot password?
                    </UButton>
                </div>

                <UButton
                    type="submit"
                    block
                    color="primary"
                    class="mt-6"
                    :loading="isLoading"
                    :disabled="!formState.email || !formState.password"
                >
                    Sign in
                </UButton>
            </UForm>

            <template #footer>
                <div class="text-center">
                    <p class="text-gray-600 text-sm">
                        Don't have an account?
                        <UButton to="/register" variant="link" color="primary">
                            Create an account
                        </UButton>
                    </p>

                    <UDivider label="Or continue with" class="my-4" />

                    <div class="flex justify-center space-x-4 mt-4">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-google"
                            aria-label="Continue with Google"
                        />
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-facebook"
                            aria-label="Continue with Facebook"
                        />
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-mdi-apple"
                            aria-label="Continue with Apple"
                        />
                    </div>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTimeoutFn } from "@vueuse/shared";

import type { FormState } from "~/types/global";

useHead({
    meta: [
        {
            content:
                "Login to your account. Sign in to your account and start trading with MarketHub.",
            name: "Login",
        },
    ],
    title: "MarketHub - Login",
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
});

const formState = reactive<FormState>({
    email: "admin@mail.com",
    password: "admin1234",
    rememberMe: false,
});

const validate = (state: FormState) => {
    const result = loginSchema.safeParse(state);
    if (result.success) return [];

    return result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path.join("."),
    }));
};

const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const toast = useToast();

const onSubmit = async () => {
    const validationErrors = validate(formState);

    if (validationErrors.length > 0) return;
    isLoading.value = true;

    try {
        await authStore.login(formState);
    } catch (e) {
        toast.add({
            color: "red",
            description: e.message,
            icon: "i-mdi-alert-circle-outline",
            title: "Authentication failed",
        });
    } finally {
        useTimeoutFn(() => {
            isLoading.value = false;
        }, 1000);
    }
};
</script>
