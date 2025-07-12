<template>
    <UModal
        :model-value="isOpen"
        :prevent-close="loading"
        @update:model-value="emitClose"
    >
        <div class="p-6 space-y-6">
            <!-- Header -->
            <div class="text-center space-y-2">
                <div
                    class="mx-auto w-16 h-16 dark:bg-primary-900 bg-primary-100 rounded-full flex items-center justify-center"
                >
                    <Icon
                        name="solar:shield-check-broken"
                        class="w-8 h-8 text-primary"
                    />
                </div>
                <h3 class="text-xl font-bold text-primary">
                    Enter Verification Code
                </h3>
                <p class="text-sm text-gray-600">
                    We've sent a 6-digit code to your email
                </p>
            </div>

            <!-- Pin Input -->
            <div class="space-y-4">
                <div class="flex justify-center gap-3">
                    <input
                        v-for="(digit, index) in otpDigits"
                        :key="index"
                        :ref="(el) => setInputRef(el, index)"
                        v-model="otpDigits[index]"
                        type="text"
                        inputmode="numeric"
                        pattern="[0-9]"
                        maxlength="1"
                        class="w-12 h-12 text-center text-lg text-primary font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        :class="{
                            'border-red-500 focus:ring-red-500 focus:border-red-500':
                                hasError,
                            'border-green-500 bg-green-50 dark:bg-green-900':
                                digit && !hasError,
                            'bg-gray-50': loading,
                        }"
                        :disabled="loading"
                        @input="handleInput(index, $event)"
                        @keydown="handleKeydown(index, $event)"
                        @paste="handlePaste"
                    />>
                </div>

                <!-- Error message -->
                <div v-if="hasError" class="text-center">
                    <p class="text-sm text-red-600">{{ errorMessage }}</p>
                </div>

                <!-- Timer -->
                <div v-if="showTimer" class="text-center">
                    <p class="text-sm text-gray-500">
                        Code expires in
                        <span class="font-mono font-bold text-green-600">{{
                            formatTime(timeLeft)
                        }}</span>
                    </p>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3">
                <UButton
                    :loading="loading"
                    :disabled="!isOtpComplete || loading"
                    size="lg"
                    class="justify-center"
                    @click="submitOtp"
                >
                    {{ loading ? "Verifying..." : "Verify Code" }}
                </UButton>

                <div class="flex justify-between items-center">
                    <UButton
                        color="gray"
                        variant="ghost"
                        :disabled="loading"
                        @click="emitClose(false)"
                    >
                        Cancel
                    </UButton>

                    <UButton
                        color="gray"
                        variant="ghost"
                        :disabled="loading || !canResend"
                        size="sm"
                        @click="resendOtp"
                    >
                        {{
                            canResend
                                ? "Resend Code"
                                : `Resend in ${resendTimer}s`
                        }}
                    </UButton>
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
    isOpen: boolean;
    loading: boolean;
    onConfirm: (otp: string) => void;
    onResend?: () => void;
    expiryTime?: number; // in seconds, default 300 (5 minutes)
    resendDelay?: number; // in seconds, default 60
}>();

const emit = defineEmits<{
    (e: "update:isOpen", value: boolean): void;
}>();

// Reactive state
const otpDigits = ref<string[]>(Array(6).fill(""));
const inputRefs = ref<HTMLInputElement[]>([]);
const hasError = ref(false);
const errorMessage = ref("");
const timeLeft = ref(props.expiryTime || 300);
const resendTimer = ref(props.resendDelay || 60);
const canResend = ref(false);

// Computed
const isOtpComplete = computed(
    () =>
        otpDigits.value.every((digit) => digit !== "") &&
        otpDigits.value.length === 6,
);

const showTimer = computed(() => timeLeft.value > 0);

const otpValue = computed(() => otpDigits.value.join(""));

// Set input ref
function setInputRef(el: HTMLInputElement | null, index: number) {
    if (el) {
        inputRefs.value[index] = el;
    }
}

// Handle input
function handleInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) {
        target.value = otpDigits.value[index];
        return;
    }

    // Update the digit
    otpDigits.value[index] = value;

    // Clear error when user starts typing
    if (hasError.value) {
        hasError.value = false;
        errorMessage.value = "";
    }

    // Move to next input if current is filled
    if (value && index < 5) {
        inputRefs.value[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (isOtpComplete.value && !props.loading) {
        // Small delay to allow user to see the completed input
        setTimeout(() => {
            if (isOtpComplete.value) {
                submitOtp();
            }
        }, 100);
    }
}

// Handle keydown
function handleKeydown(index: number, event: KeyboardEvent) {
    if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.value[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
        inputRefs.value[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
        inputRefs.value[index + 1]?.focus();
    }
}

// Handle paste
function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text") || "";
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length > 0) {
        // Fill the digits
        for (let i = 0; i < 6; i++) {
            otpDigits.value[i] = digits[i] || "";
        }

        // Focus the next empty input or the last one
        const nextEmptyIndex = otpDigits.value.findIndex(
            (digit) => digit === "",
        );
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.value[focusIndex]?.focus();

        // Auto-submit if complete
        if (digits.length === 6) {
            setTimeout(() => {
                if (isOtpComplete.value) {
                    submitOtp();
                }
            }, 100);
        }
    }
}

// Submit OTP
function submitOtp() {
    if (!isOtpComplete.value) {
        showError("Please enter all 6 digits");
        return;
    }

    props.onConfirm(otpValue.value);
}

// Show error
function showError(message: string) {
    hasError.value = true;
    errorMessage.value = message;

    // Focus first empty input
    const firstEmptyIndex = otpDigits.value.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1) {
        inputRefs.value[firstEmptyIndex]?.focus();
    }

    setTimeout(() => {
        emitClose(false);
    }, 2000);
}

// Resend OTP
function resendOtp() {
    if (props.onResend && canResend.value) {
        props.onResend();
        startResendTimer();
        resetTimer();
    }
}

// Format time
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Start expiry timer
function startExpiryTimer() {
    const timer = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
            clearInterval(timer);
            showError("Code has expired. Please request a new one.");
        }
    }, 1000);

    // Clear timer when modal closes
    watch(
        () => props.isOpen,
        (isOpen) => {
            if (!isOpen) {
                clearInterval(timer);
            }
        },
    );
}

// Start resend timer
function startResendTimer() {
    canResend.value = false;
    resendTimer.value = props.resendDelay || 60;

    const timer = setInterval(() => {
        resendTimer.value--;
        if (resendTimer.value <= 0) {
            canResend.value = true;
            clearInterval(timer);
        }
    }, 1000);
}

// Reset timer
function resetTimer() {
    timeLeft.value = props.expiryTime || 300;
}

// Clear OTP
function clearOtp() {
    otpDigits.value = Array(6).fill("");
    hasError.value = false;
    errorMessage.value = "";
}

// Emit close
function emitClose(value: boolean) {
    if (!props.loading) {
        emit("update:isOpen", value);
        if (!value) {
            clearOtp();
        }
    }
}

// Watch for external error handling
watch(
    () => props.loading,
    (loading, wasLoading) => {
        if (wasLoading && !loading) {
            // If loading just finished, check if we need to show an error
            // This would be handled by parent component calling a method or prop
        }
    },
);

// Initialize when modal opens
watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen) {
            clearOtp();
            resetTimer();
            startExpiryTimer();
            startResendTimer();

            nextTick(() => {
                inputRefs.value[0]?.focus();
            });
        } else {
            resetTimer();
        }
    },
);

// Expose methods for parent component
defineExpose({
    clearOtp,
    showError,
});
</script>
