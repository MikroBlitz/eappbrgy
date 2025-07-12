<template>
    <div
        class="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900"
    >
        <UCard class="w-full max-w-md">
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
                <UFormGroup label="First Name" name="first_name">
                    <UInput
                        v-model="formState.first_name"
                        placeholder="Enter first name"
                        type="text"
                        autocomplete="first_name"
                        icon="line-md:account"
                    />
                </UFormGroup>

                <UFormGroup label="Middle Name" name="middle_name">
                    <UInput
                        v-model="formState.middle_name"
                        placeholder="Enter middle name"
                        type="text"
                        autocomplete="middle_name"
                        icon="line-md:account"
                    />
                </UFormGroup>

                <UFormGroup label="Last Name" name="last_name">
                    <UInput
                        v-model="formState.last_name"
                        placeholder="Enter last name"
                        type="text"
                        autocomplete="last_name"
                        icon="line-md:account"
                    />
                </UFormGroup>

                <UFormGroup label="Phone" name="phone">
                    <UInput
                        v-model="formState.phone"
                        placeholder="Enter your phone"
                        type="phone"
                        autocomplete="phone"
                        icon="i-heroicons-phone"
                    />
                </UFormGroup>

                <UFormGroup label="Email" name="email">
                    <UInput
                        v-model="formState.email"
                        placeholder="Enter your email"
                        type="email"
                        autocomplete="email"
                        icon="i-heroicons-envelope"
                    />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput
                        v-model="formState.password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="current-password"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>

                <UButton
                    type="submit"
                    block
                    color="primary"
                    class="mt-3 py-2"
                    :loading="isLoading"
                    :disabled="!formState.email || !formState.password"
                >
                    Create Account
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
    title: "BarangayConnect - Register",
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
            color: "green",
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
