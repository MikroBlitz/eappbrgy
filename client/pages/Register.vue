<template>
    <div
        class="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5 dark:opacity-10">
            <div
                class="absolute top-0 left-0 w-full h-full bg-repeat pattern-bg"
            />
        </div>

        <!-- Geometric Shapes -->
        <div class="absolute inset-0 overflow-hidden">
            <!-- Top left circle -->
            <div
                class="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"
            />

            <!-- Top right triangle -->
            <div
                class="absolute -top-10 -right-10 w-60 h-60 bg-indigo-200 dark:bg-indigo-900 opacity-15 blur-2xl transform rotate-45"
            />

            <!-- Bottom left hexagon -->
            <div
                class="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-200 dark:bg-slate-700 opacity-10 blur-2xl transform rotate-12"
            />

            <!-- Bottom right circle -->
            <div
                class="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full opacity-15 blur-2xl"
            />

            <!-- Center accent -->
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full opacity-10 blur-3xl"
            />
        </div>

        <!-- Subtle Grid Lines -->
        <div class="absolute inset-0 opacity-5 dark:opacity-10">
            <div
                class="w-full h-full"
                style="
                    background-image:
                        linear-gradient(
                            rgba(0, 0, 0, 0.1) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.1) 1px,
                            transparent 1px
                        );
                    background-size: 50px 50px;
                "
            />
        </div>

        <!-- Government-themed floating elements -->
        <div class="absolute inset-0 pointer-events-none">
            <!-- Floating shield icons -->
            <div
                class="absolute top-1/4 left-1/4 w-8 h-8 text-blue-200 dark:text-blue-800 opacity-20 animate-pulse"
            >
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C14.8,12.4 14.4,13.2 13.7,13.7V16.5C13.7,17.3 13.1,18 12.2,18H11.8C10.9,18 10.3,17.3 10.3,16.5V13.8C9.6,13.3 9.2,12.5 9.2,11.6V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V10.5C10.5,11.3 11.2,11.8 12,11.8C12.8,11.8 13.5,11.3 13.5,10.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"
                    />
                </svg>
            </div>

            <div
                class="absolute top-3/4 right-1/4 w-6 h-6 text-indigo-200 dark:text-indigo-800 opacity-20 animate-pulse animation-delay-1000"
            >
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z"
                    />
                </svg>
            </div>

            <div
                class="absolute top-1/2 left-1/6 w-5 h-5 text-slate-300 dark:text-slate-700 opacity-20 animate-bounce animation-delay-2000"
            >
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.6,4 4,7.6 4,12C4,16.4 7.6,20 12,20C16.4,20 20,16.4 20,12C20,7.6 16.4,4 12,4M12,6C15.3,6 18,8.7 18,12C18,15.3 15.3,18 12,18C8.7,18 6,15.3 6,12C6,8.7 8.7,6 12,6Z"
                    />
                </svg>
            </div>
        </div>

        <UCard
            class="w-full max-w-md relative z-10 backdrop-blur-xs bg-white/80 dark:bg-slate-800/80 shadow-xl border-0 ring-1 ring-slate-200/50 dark:ring-slate-700/50"
        >
            <template #header>
                <div class="text-center">
                    <h1
                        class="text-2xl font-bold text-slate-800 dark:text-slate-200"
                    >
                        Welcome to
                        <span class="text-primary">{{ appTitle }}</span>
                    </h1>
                    <p class="text-slate-800 dark:text-slate-200 mt-2">
                        Register in to your account
                    </p>
                </div>
            </template>

            <UForm
                :validate="validate"
                :state="formState"
                class="gap-y-2 flex flex-col"
                @submit="onSubmit"
            >
                <UFormField label="First Name" name="first_name" class="w-full">
                    <UInput
                        v-model="formState.first_name"
                        placeholder="Enter first name"
                        type="text"
                        autocomplete="first_name"
                        icon="line-md:account"
                        class="w-full"
                    />
                </UFormField>

                <UFormField
                    label="Middle Name"
                    name="middle_name"
                    class="w-full"
                >
                    <UInput
                        v-model="formState.middle_name"
                        placeholder="Enter middle name"
                        type="text"
                        autocomplete="middle_name"
                        icon="line-md:account"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Last Name" name="last_name" class="w-full">
                    <UInput
                        v-model="formState.last_name"
                        placeholder="Enter last name"
                        type="text"
                        autocomplete="last_name"
                        icon="line-md:account"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Phone" name="phone" class="w-full">
                    <UInput
                        v-model="formState.phone"
                        placeholder="Enter your phone"
                        type="phone"
                        autocomplete="phone"
                        icon="i-heroicons-phone"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Email" name="email" class="w-full">
                    <UInput
                        v-model="formState.email"
                        placeholder="Enter your email"
                        type="email"
                        autocomplete="email"
                        icon="i-heroicons-envelope"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Password" name="password" class="w-full">
                    <UInput
                        v-model="formState.password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="current-password"
                        icon="i-heroicons-lock-closed"
                        class="w-full"
                    />
                </UFormField>

                <UButton
                    type="submit"
                    block
                    color="primary"
                    class="mt-4 py-2"
                    :loading="isLoading"
                    :disabled="!formState.email || !formState.password"
                >
                    <span v-if="isLoading" class="animate-pulse"
                        >Creating Account...</span
                    >
                    <span v-else>Create Account</span>
                </UButton>
            </UForm>

            <template #footer>
                <div class="text-center">
                    <p class="text-gray-600 text-sm">
                        Already have an account?
                        <UButton to="/login" variant="link" color="primary">
                            Login
                        </UButton>
                    </p>

                    <USeparator label="Or continue with" class="my-4" />

                    <div class="flex justify-center space-x-4 mt-4">
                        <UButton
                            color="neutral"
                            variant="ghost"
                            icon="i-mdi-google"
                            aria-label="Continue with Google"
                        />
                        <UButton
                            color="neutral"
                            variant="ghost"
                            icon="i-mdi-facebook"
                            aria-label="Continue with Facebook"
                        />
                        <UButton
                            color="neutral"
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
import { useTimeoutFn } from "@vueuse/shared";
import { ref, reactive } from "vue";
import { z } from "zod";

import type { FormStateRegister } from "~/types/global";

import { registerUser } from "~/graphql/User";
import { phoneRegex } from "~/utils/helpers";
const isLoading = ref<boolean>(false);
const toast = useToast();

useHead({
    meta: [
        {
            content:
                "Access barangay services online. Apply for certificates, stay updated with announcements, and connect with your local government digitally.",
            name: "description",
        },
    ],
    title: "Govana - Register",
});

const { appTitle } = useConstants();

const formState = reactive({
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    password: "",
    phone: "",
});

const onSubmit = async () => {
    const validationErrors = validate(formState);
    const { mutate: register } = useMutation(registerUser);

    if (validationErrors.length > 0) return;
    isLoading.value = true;
    try {
        const variables = {
            email: formState.email,
            first_name: formState.first_name,
            last_name: formState.last_name,
            middle_name: formState.middle_name,
            password: formState.password,
            phone: formState.phone,
        };

        const response = await register({ input: variables });

        console.log(response);
        toast.add({
            color: "success",
            description: "Successfully registered",
            icon: "solar:check-circle-broken",
            title: "Success",
        });
    } catch (error) {
        console.error(error);
    } finally {
        useTimeoutFn(() => {
            isLoading.value = false;
        }, 1000);
        navigateTo("/login");
    }
};

const schema = z.object({
    email: z.string().email("Invalid email address"),
    first_name: z
        .string()
        .regex(/^[a-z\s-]+$/i, "Only contain letters, spaces, and hyphens."),
    last_name: z
        .string()
        .regex(/^[a-z\s-]+$/i, "Only contain letters, spaces, and hyphens."),
    middle_name: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || phoneRegex.test(val),
            "Invalid Philippine phone number",
        ),
});

const validate = (state: FormStateRegister) => {
    const result = schema.safeParse(state);
    if (result.success) return [];

    return result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path.join("."),
    }));
};
</script>

<style scoped>
.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.pattern-bg {
    background-image: url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23000000' fill-opacity='0.1'><path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></g></g></svg>");
}
</style>
