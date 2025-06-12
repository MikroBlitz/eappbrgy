<template>
    <UModal v-model="isModalOpen" :transition="false">
        <UCard class="max-w-2xl">
            <template #header>
                <div class="flex items-center gap-3">
                    <UIcon
                        name="i-heroicons-eye"
                        class="text-primary text-lg"
                    />
                    <span
                        class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                        {{ title }}
                    </span>
                </div>
            </template>

            <!-- Simple key-value pairs display -->
            <div class="space-y-3">
                <template v-for="field in formSchema.fields" :key="field.name">
                    <div
                        v-if="shouldShowField(field.name)"
                        class="flex items-start justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                        <dt
                            class="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-0 flex-1 pr-4"
                        >
                            {{ field.label }}:
                        </dt>
                        <dd
                            class="text-sm text-gray-900 dark:text-gray-100 flex-1 text-right min-w-0"
                        >
                            <!-- Boolean/Status fields -->
                            <template
                                v-if="
                                    field.name.includes('is_') ||
                                    field.name.includes('has_') ||
                                    typeof state[field.name] === 'boolean'
                                "
                            >
                                <UBadge
                                    :color="state[field.name] ? 'green' : 'red'"
                                    :label="
                                        state[field.name]
                                            ? 'Active'
                                            : 'Inactive'
                                    "
                                    size="xs"
                                />
                            </template>

                            <!-- Date fields -->
                            <template
                                v-else-if="
                                    field.name.includes('_at') ||
                                    field.name.includes('date') ||
                                    field.type === 'date'
                                "
                            >
                                <span
                                    v-if="state[field.name]"
                                    class="text-gray-700 dark:text-gray-300"
                                >
                                    {{ formatDate(state[field.name]) }}
                                </span>
                                <span v-else class="text-gray-400 italic"
                                    >Not set</span
                                >
                            </template>

                            <!-- Email fields -->
                            <template v-else-if="field.type === 'email'">
                                <a
                                    v-if="state[field.name]"
                                    :href="`mailto:${state[field.name]}`"
                                    class="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    {{ state[field.name] }}
                                </a>
                                <span v-else class="text-gray-400 italic"
                                    >Not set</span
                                >
                            </template>

                            <!-- Phone fields -->
                            <template v-else-if="field.type === 'tel'">
                                <a
                                    v-if="state[field.name]"
                                    :href="`tel:${state[field.name]}`"
                                    class="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    {{ state[field.name] }}
                                </a>
                                <span v-else class="text-gray-400 italic"
                                    >Not set</span
                                >
                            </template>

                            <!-- Array fields -->
                            <template
                                v-else-if="Array.isArray(state[field.name])"
                            >
                                <div
                                    v-if="state[field.name]?.length > 0"
                                    class="flex flex-wrap gap-1 justify-end"
                                >
                                    <UBadge
                                        v-for="(item, index) in state[
                                            field.name
                                        ]"
                                        :key="index"
                                        :label="getArrayItemLabel(item)"
                                        color="gray"
                                        size="xs"
                                    />
                                </div>
                                <span v-else class="text-gray-400 italic"
                                    >None</span
                                >
                            </template>

                            <!-- Select/Combobox fields -->
                            <template
                                v-else-if="
                                    ['select', 'combobox'].includes(field.type)
                                "
                            >
                                <span
                                    v-if="
                                        getDisplayValue(
                                            field,
                                            state[field.name],
                                        )
                                    "
                                >
                                    {{
                                        getDisplayValue(
                                            field,
                                            state[field.name],
                                        )
                                    }}
                                </span>
                                <span v-else class="text-gray-400 italic"
                                    >Not selected</span
                                >
                            </template>

                            <!-- Password fields -->
                            <template v-else-if="field.type === 'password'">
                                <span class="text-gray-400 italic"
                                    >••••••••</span
                                >
                            </template>

                            <!-- Long text fields -->
                            <template
                                v-else-if="
                                    field.name.includes('description') ||
                                    field.name.includes('content') ||
                                    field.type === 'textarea'
                                "
                            >
                                <div
                                    v-if="state[field.name]"
                                    class="text-left max-w-xs"
                                >
                                    <p
                                        class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed truncate-lines"
                                    >
                                        {{ state[field.name] }}
                                    </p>
                                </div>
                                <span v-else class="text-gray-400 italic"
                                    >Empty</span
                                >
                            </template>

                            <!-- Default text display -->
                            <template v-else>
                                <span
                                    v-if="hasValue(state[field.name])"
                                    class="break-words"
                                >
                                    {{ state[field.name] }}
                                </span>
                                <span v-else class="text-gray-400 italic"
                                    >Empty</span
                                >
                            </template>
                        </dd>
                    </div>
                </template>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <UButton
                        color="gray"
                        variant="ghost"
                        @click="isModalOpen = false"
                    >
                        Close
                    </UButton>
                    <UButton
                        v-if="showEditButton"
                        color="blue"
                        @click="$emit('edit-clicked')"
                    >
                        Edit
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import type { FormSchema } from "~/types/fields";

const emit = defineEmits<{
    (e: "update:is-open", value: boolean): void;
    (e: "edit-clicked"): void;
}>();

type Props<T> = {
    isOpen: boolean;
    title?: string;
    formSchema: FormSchema;
    state: T;
    showEditButton?: boolean;
};

const props = withDefaults(defineProps<Props<unknown>>(), {
    showEditButton: true,
    title: "Modal View",
});

const isModalOpen = computed({
    get: () => props.isOpen,
    set: (value: boolean) => emit("update:is-open", value),
});

// Helper function to check if field should be shown (exclude internal fields)
function shouldShowField(fieldName: string): boolean {
    const excludeFields = ["id", "created_at", "updated_at"];
    return !excludeFields.includes(fieldName);
}

// Helper function to check if value exists
function hasValue(value: any): boolean {
    return value !== null && value !== undefined && value !== "";
}

// Helper function to get display value for select/combobox fields
function getDisplayValue(field: any, value: any): string {
    if (!value) return "";

    if (field.options && Array.isArray(field.options)) {
        const option = field.options.find((opt: any) => {
            const optValue = field.valueAttribute
                ? opt[field.valueAttribute]
                : opt.value;
            return optValue === value;
        });

        if (option) {
            return field.optionAttribute
                ? option[field.optionAttribute]
                : option.label;
        }
    }

    // If it's an object with common display properties
    if (typeof value === "object" && value !== null) {
        return value.label || value.name || value.title || value.toString();
    }

    return value.toString();
}

// Helper function to get array item labels
function getArrayItemLabel(item: any): string {
    if (typeof item === "object" && item !== null) {
        return item.label || item.name || item.value || item.toString();
    }
    return item.toString();
}

// Helper function to format dates
function formatDate(dateValue: any): string {
    if (!dateValue) return "";

    try {
        const date = new Date(dateValue);
        return date.toLocaleDateString();
    } catch {
        return dateValue.toString();
    }
}
</script>

<style scoped>
.truncate-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
