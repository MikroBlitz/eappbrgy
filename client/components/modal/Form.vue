<template>
    <UModal v-model="isModalOpen" :transition="false">
        <UCard
            :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
        >
            <div class="flex items-center mb-4">
                <UIcon
                    name="i-heroicons-pencil-square"
                    class="mr-3 text-emerald-500 text-xl"
                />
                <span
                    class="text-lg text-gray-900 dark:text-gray-100 font-medium"
                >
                    {{ title }}
                </span>
            </div>

            <UForm
                :schema="zodSchema"
                :state="state"
                class="space-y-4 gap-x-2 grid-cols-12 grid"
                @submit="onSubmit"
            >
                <template v-for="field in formSchema.fields" :key="field.name">
                    <UFormGroup
                        :label="field.label"
                        :name="field.name"
                        :class="field.class || 'col-span-full'"
                    >
                        <component
                            :is="resolveComponent(field.type)"
                            v-model="state[field.name]"
                            :type="field.type"
                            :options="field.options"
                            :multiple="field.multiple || false"
                            :placeholder="
                                field.placeholder || `Enter ${field.label}`
                            "
                            :searchable="field.searchable"
                            :value-attribute="
                                field.valueAttribute ||
                                (['select', 'combobox'].includes(field.type)
                                    ? 'value'
                                    : undefined)
                            "
                            :option-attribute="
                                field.optionAttribute ||
                                (['select', 'combobox'].includes(field.type)
                                    ? 'label'
                                    : undefined)
                            "
                            :loading="
                                ['select', 'combobox'].includes(field.type)
                                    ? optionLoading
                                    : undefined
                            "
                            @query-change="
                                (query: string) => field.onSearch?.(query)
                            "
                        >
                            <template
                                v-if="
                                    ['select', 'combobox'].includes(field.type)
                                "
                                #leading="{ optionsLoading }"
                            >
                                <UIcon
                                    v-if="optionsLoading"
                                    name="i-heroicons-arrow-path"
                                    class="animate-spin text-primary"
                                />
                                <UIcon
                                    v-else
                                    name="mdi:form-dropdown"
                                    class="text-primary"
                                />
                            </template>
                        </component>
                    </UFormGroup>
                </template>

                <div class="flex col-span-full justify-end gap-2 pt-4">
                    <UButton
                        color="gray"
                        variant="ghost"
                        @click="isModalOpen = false"
                        >Cancel</UButton
                    >
                    <UButton :loading="loading" type="submit" label="Submit" />
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { ZodSchema } from "zod";

import { UInput, USelectMenu } from "#components";

import type { FieldType, FormSchema } from "~/types/fields";

const emit = defineEmits<{
    (e: "update:is-open", value: boolean): void;
}>();

type Props<T> = {
    isOpen: boolean;
    title?: string;
    formSchema: FormSchema;
    zodSchema?: ZodSchema;
    state: T;
    loading: boolean;
    optionLoading?: Ref<boolean, boolean> | boolean;
    onSubmit: (event: FormSubmitEvent<T>) => void;
};

const props = defineProps<Props<unknown>>();

const isModalOpen = computed({
    get: () => props.isOpen,
    set: (value: boolean) => emit("update:is-open", value),
});

const componentMap: Record<FieldType, Component> = {
    combobox: USelectMenu,
    email: UInput,
    number: UInput,
    password: UInput,
    select: USelectMenu,
    tel: UInput,
    text: UInput,
};

function resolveComponent(type: FieldType): Component {
    return componentMap[type] || UInput;
}
</script>
