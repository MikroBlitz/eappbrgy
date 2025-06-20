<template>
    <UCard class="h-full bg-white dark:bg-gray-900">
        <div class="flex items-start justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-50">
                    {{ title }}
                </p>
                <h3
                    class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-2"
                >
                    {{ value }}
                </h3>
                <div class="flex items-center mt-2">
                    <UIcon
                        :name="
                            trend > 0
                                ? 'i-heroicons-arrow-trending-up'
                                : 'i-heroicons-arrow-trending-down'
                        "
                        :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
                        class="mr-1"
                    />
                    <span
                        :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
                    >
                        {{ Math.abs(trend) }}%
                        {{ trend > 0 ? "increase" : "decrease" }}
                    </span>
                </div>
            </div>
            <UIcon
                :name="icon"
                class="text-gray-400 p-2 bg-gray-100 rounded-lg"
                size="lg"
            />
        </div>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
    icon: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    trend: {
        default: 0,
        type: Number,
    },
    value: {
        required: true,
        type: String,
    },
});
</script>
