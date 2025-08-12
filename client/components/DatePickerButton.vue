<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
            :variant="variant || 'outline'"
            :color="color || 'green'"
            class="w-full flex items-center justify-center"
            icon="solar:calendar-search-broken"
            :label="date ? format(date, 'd MMM, yyyy') : 'Select date'"
        />

        <template #panel="{ close }">
            <DatePicker v-model="date" is-required @close="close" />
        </template>
    </UPopover>
</template>

<script setup lang="ts">
import type { ButtonColor, ButtonVariant } from "#ui/types";

import { format } from "date-fns";

import DatePicker from "./ui/DatePicker.vue";

const props = defineProps<{
    modelValue: Date | null;
    variant?: ButtonVariant;
    color?: ButtonColor;
}>();
const emit = defineEmits<{
    (e: "update:modelValue", value: Date | null): void;
}>();

const date = ref<Date | null>(props.modelValue || null);

watch(
    () => props.modelValue,
    (val) => {
        if (val !== date.value) {
            date.value = val ?? new Date();
        }
    },
);

watch(date, (val) => {
    if (val !== props.modelValue) {
        emit("update:modelValue", val);
    }
});
</script>
