<script setup lang="ts">
const props = defineProps<{
    modelValue: Date | null;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Date | null): void;
    (e: "close"): void;
}>();

const inputValue = ref<string>("");

watch(
    () => props.modelValue,
    (newValue) => {
        if (!newValue) {
            inputValue.value = "";
        } else {
            const hours = newValue.getHours().toString().padStart(2, "0");
            const minutes = newValue.getMinutes().toString().padStart(2, "0");
            inputValue.value = `${hours}:${minutes}`;
        }
    },
    { immediate: true },
);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    if (!val || val === "" || !val.includes(":")) {
        emit("update:modelValue", null);
        return;
    }

    const [hours, minutes] = val.split(":").map(Number);

    if (isNaN(hours as number) || isNaN(minutes as number)) {
        emit("update:modelValue", null);
        return;
    }

    const date = props.modelValue ? new Date(props.modelValue) : new Date();
    date.setHours(hours as number);
    date.setMinutes(minutes as number);
    date.setSeconds(0);
    date.setMilliseconds(0);

    emit("update:modelValue", date);
};
</script>

<template>
    <div class="p-3">
        <UInput :model-value="inputValue" type="time" @input="handleInput" />
    </div>
</template>
