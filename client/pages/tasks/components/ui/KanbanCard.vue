<template>
    <UCard
        class="group cursor-move hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-white dark:bg-gray-900"
        :data-id="task.id"
    >
        <div class="relative">
            <UDropdown
                v-if="auth.can('edit task')"
                class="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                :items="taskActions"
                :popper="{
                    placement: 'bottom-end',
                }"
            >
                <UButton
                    icon="solar:menu-dots-bold-duotone"
                    color="gray"
                    variant="ghost"
                    size="xs"
                    class="hover:bg-gray-100 dark:hover:bg-gray-700"
                />
            </UDropdown>

            <!-- Task Content -->
            <div class="space-y-2">
                <div>
                    <h3
                        class="text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight"
                    >
                        <UBadge
                            v-if="task.priority"
                            :color="getPriorityColor(task.priority)"
                            variant="soft"
                            size="xs"
                            class="font-medium"
                        >
                            {{ task.priority }}
                        </UBadge>
                    </h3>
                    <div class="flex items-center mt-1">
                        <span
                            class="text-sm font-semibold text-gray-700 dark:text-gray-400"
                        >
                            {{ task.title }}
                        </span>
                    </div>
                </div>

                <p
                    v-if="task.description"
                    class="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed bg-gray-50 dark:bg-gray-800/50 rounded p-1.5"
                >
                    {{ task.description }}
                </p>
            </div>

            <!-- Footer -->
            <div
                class="flex items-center justify-between pt-0.5 mt-1 border-t border-gray-100 dark:border-gray-700"
            >
                <div
                    class="flex text-xs items-center gap-2 text-gray-500 dark:text-gray-400"
                >
                    {{ task.createdBy.name }}
                </div>

                <div v-if="task.created_at" class="flex items-center gap-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ getDateOnly(task.created_at) }}
                    </span>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { Task } from "~/types/codegen/graphql";

import { getDateOnly } from "~/utils/helpers";

import { getPriorityColor } from "../../utils/helper";

interface TaskAction {
    click: () => void;
    icon: string;
    label: string;
}

interface KanbanCard {
    task: Task;
    taskActions: TaskAction[][];
}

const auth = useAuthStore();

defineProps<KanbanCard>();
</script>
