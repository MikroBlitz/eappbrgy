<script setup lang="ts">
import { format } from "date-fns";

import TimePicker from "./ui/TimePicker.vue";

const props = defineProps<{
    modelValue: Date | string | null;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Date | null): void;
}>();

function toValidDate(value: unknown): Date | null {
    if (value === null || value === undefined || value === "") return null;
    if (value instanceof Date && !isNaN(value.getTime())) return value;
    const parsed = new Date(value as string);

    return isNaN(parsed.getTime()) ? null : parsed;
}

const time = ref<Date | null>(toValidDate(props.modelValue));

watch(
    () => props.modelValue,
    (val) => {
        const newDate = toValidDate(val);
        if (
            (newDate === null && time.value !== null) ||
            (newDate !== null && time.value === null) ||
            (newDate &&
                time.value &&
                newDate.getTime() !== time.value.getTime())
        ) {
            time.value = newDate;
        }
    },
    { immediate: true },
);

watch(time, (val) => {
    emit("update:modelValue", val);
});
</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
            variant="outline"
            class="w-full flex items-center justify-center"
            icon="solar:clock-circle"
            :label="time ? format(time, 'hh:mm a') : 'Select time'"
        />

        <template #panel="{ close }">
            <div class="p-2 flex items-center">
                <TimePicker v-model="time" />

                <div class="pr-2">
                    <UButton
                        color="red"
                        variant="soft"
                        class="w-full"
                        label="Clear"
                        @click="
                            () => {
                                time = null;
                                close();
                            }
                        "
                    />
                </div>
            </div>
        </template>
    </UPopover>
</template>
