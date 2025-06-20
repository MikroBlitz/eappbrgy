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
                        Register in to your account
                    </p>
                </div>
            </template>

            <UForm :validate="validate" :state="formState" @submit="onSubmit">
                <UFormGroup label="Name" name="name">
                    <UInput
                        v-model="formState.name"
                        placeholder="Enter your name"
                        type="text"
                        autocomplete="name"
                        icon="line-md:account"
                        required
                    />
                </UFormGroup>

                <UFormGroup label="Email" name="email" class="mt-4">
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

                <UButton
                    type="submit"
                    block
                    color="primary"
                    class="mt-6"
                    :loading="isLoading"
                    :disabled="!formState.email || !formState.password"
                >
                    Sign up
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

import type { FormStateRegister } from "~/types/global";

import { upsertUser } from "~/graphql/User";
const isLoading = ref<boolean>(false);
const toast = useToast();

useHead({
    meta: [
        {
            content:
                "Login to your account. Sign in to your account and start trading with MarketHub.",
            name: "Login",
        },
    ],
    title: "MarketHub - Register",
});

const { mutate: registerUser } = useMutation(upsertUser);

const formState = reactive({
    email: "",
    name: "",
    password: "",
});

const onSubmit = async () => {
    const validationErrors = validate(formState);

    if (validationErrors.length > 0) return;
    try {
        const variables = {
            email: formState.email,
            name: formState.name,
            password: formState.password,
            roles: {
                sync: 3, // default user role on sign up
            },
        };

        const response = await registerUser({ input: variables });

        console.log(response);
        toast.add({
            color: "green",
            description: "Successfully registered",
            icon: "i-mdi-check-circle-outline",
            title: "Success",
        });
        navigateTo("/login");
    } catch (error) {
        console.error(error);
    }
};

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z
        .string()
        .regex(/^[a-z\s-]+$/i, "Only contain letters, spaces, and hyphens."),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const validate = (state: FormStateRegister) => {
    const result = loginSchema.safeParse(state);
    if (result.success) return [];

    return result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path.join("."),
    }));
};
</script>
