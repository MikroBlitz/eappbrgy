<template>
    <div class="px-2 md:px-0">
        <div class="flex gap-1 w-full mb-2 mt-1">
            <UButton
                icon="solar:add-square-broken"
                size="sm"
                color="emerald"
                variant="ghost"
                @click="addTask('TODO')"
            >
                New Task
            </UButton>
            <UButton
                icon="solar:refresh-bold"
                size="sm"
                color="yellow"
                variant="ghost"
                @click="manualRefetchTasks()"
            >
                Refetch
            </UButton>
        </div>
        <div class="flex space-x-4 overflow-x-auto pb-4">
            <div
                v-for="column in columns"
                :key="column.id"
                class="flex-shrink-0 w-96 max-h-[calc(90vh-80px)]"
            >
                <div
                    class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full overflow-auto"
                    @scroll.passive="onScroll($event, column.id)"
                >
                    <!-- Column Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <UIcon
                                :name="column.icon"
                                class="w-5 h-5"
                                :class="`text-${column.color}-500`"
                            />
                            <h3
                                class="font-semibold text-gray-900 dark:text-gray-100"
                            >
                                {{ column.title }}
                            </h3>
                            <UBadge
                                v-if="!column.isLoading && !isLoading"
                                :color="column.color"
                                variant="solid"
                                class="font-bold rounded-full px-2.5"
                                size="sm"
                            >
                                {{ column.tasks.length }}
                            </UBadge>
                        </div>
                    </div>

                    <div v-if="isLoading" class="space-y-3 mt-3">
                        <div
                            v-for="n in 3"
                            :key="`skeleton-${n}`"
                            class="animate-pulse"
                        >
                            <UCard class="opacity-60">
                                <div class="space-y-3">
                                    <div
                                        class="flex items-center justify-between"
                                    >
                                        <div
                                            class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"
                                        />
                                        <div
                                            class="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                                        />
                                    </div>
                                    <div
                                        class="flex items-center justify-between pt-2"
                                    >
                                        <div
                                            class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"
                                        />
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"
                                        />
                                    </div>
                                </div>
                            </UCard>
                        </div>
                    </div>

                    <!-- Draggable Task List -->
                    <VueDraggable
                        v-if="!isLoading"
                        v-model="column.tasks"
                        :group="{ name: 'tasks', pull: true, put: true }"
                        :animation="200"
                        item-key="id"
                        ghost-class="ghost-card"
                        class="space-y-3"
                        :data-column-id="column.id"
                        @start="onDragStart($event)"
                        @end="onTaskDrop(column.id)"
                    >
                        <template v-for="task in column.tasks" :key="task.id">
                            <KanbanCard
                                :task="task"
                                :task-actions="getTaskActions(task)"
                            />
                        </template>
                    </VueDraggable>

                    <!-- Empty State -->
                    <div
                        v-if="!column.tasks.length && !isLoading"
                        class="flex flex-col items-center justify-center py-12 text-center text-gray-500"
                    >
                        <Icon :name="column.icon" size="40" class="mb-2" />
                        <p class="text-lg font-semibold">
                            {{ emptyStateTitle(column.id) }}
                        </p>
                        <p class="text-sm">
                            {{ emptyStateMessage(column.id) }}
                        </p>
                    </div>

                    <!-- Skeleton Loading State -->
                    <div v-if="column.isLoading" class="space-y-3 mt-3">
                        <div
                            v-for="n in 3"
                            :key="`skeleton-${n}`"
                            class="animate-pulse"
                        >
                            <UCard class="opacity-60">
                                <div class="space-y-3">
                                    <div
                                        class="flex items-center justify-between"
                                    >
                                        <div
                                            class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"
                                        />
                                        <div
                                            class="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                                        />
                                    </div>
                                    <div
                                        class="flex items-center justify-between pt-2"
                                    >
                                        <div
                                            class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"
                                        />
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"
                                        />
                                    </div>
                                </div>
                            </UCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Task Modal -->
        <UModal v-model="isModalOpen">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold text-primary">
                        {{ newTask.id ? "Edit Task" : "Add New Task" }}
                    </h3>
                </template>

                <UForm
                    :state="newTask"
                    :schema="taskSchema"
                    class="space-y-4"
                    @submit="submitTask"
                >
                    <UFormGroup label="Title" name="title">
                        <UInput
                            v-model="newTask.title"
                            placeholder="Enter task title"
                        />
                    </UFormGroup>

                    <UFormGroup label="Description" name="description">
                        <UTextarea
                            v-model="newTask.description"
                            placeholder="Enter task description"
                        />
                    </UFormGroup>

                    <UFormGroup label="Priority" name="priority">
                        <USelect
                            v-model="newTask.priority"
                            :options="priorityOptions"
                            placeholder="Select priority"
                            class="bg-card"
                        />
                    </UFormGroup>

                    <div class="flex justify-end gap-2">
                        <UButton
                            color="gray"
                            variant="ghost"
                            @click="isModalOpen = false"
                        >
                            Cancel
                        </UButton>
                        <UButton type="submit" :loading="isSubmitting">
                            {{ newTask.id ? "Update" : "Add" }} Task
                        </UButton>
                    </div>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/shared";
import { useToast } from "#ui/composables/useToast";
import { VueDraggable } from "vue-draggable-plus";
import { z } from "zod";

import type { Task, TaskStatus } from "~/types/codegen/graphql";
import type { TaskUpdatedEvent } from "~/types/global";

import { deleteTask, tasksPaginate, upsertTask } from "~/graphql/Task";
import KanbanCard from "~/pages/tasks/components/ui/KanbanCard.vue";
import { useBoardActions } from "~/pages/tasks/composables/useBoardActions";

import {
    emptyStateMessage,
    emptyStateTitle,
    priorityOptions,
    taskPermissions,
} from "../utils/helper";

const taskSchema = z.object({
    description: z.string().min(1, "Description is required"),
    priority: z.string().min(1, "Priority is required"),
    title: z.string().min(1, "Title is required"),
});

const toast = useToast();
const auth = useAuthStore();
const taskBoard = useTaskBoardStore();
const columns = computed(() => taskBoard.columns);
const { onDragStart, onScroll, onTaskDrop, taskQueries } = useBoardActions();

const isLoading = ref(false);
const isModalOpen: Ref<boolean> = ref(false);
const isSubmitting: Ref<boolean> = ref(false);
const selectedColumnId: Ref<string | undefined> = ref("");
const newTask: Ref<Partial<Task>> = ref({
    description: "",
    id: "",
    priority: undefined,
    status: undefined,
    title: "",
});

const manualRefetchTasks = () => {
    isLoading.value = true;
    try {
        Object.values(taskQueries).forEach((query) => {
            query?.refetch?.();
        });
    } catch (e) {
        console.error(e);
    } finally {
        useTimeoutFn(() => {
            isLoading.value = false;
        }, 1000);
    }
};

const refetchTasks = () => {
    Object.values(taskQueries).forEach((query) => {
        query?.refetch?.();
    });
};

const addTask = (columnId: string) => {
    selectedColumnId.value = columnId;
    newTask.value = {
        description: "",
        id: "",
        priority: undefined,
        status: undefined,
        title: "",
    };
    isModalOpen.value = true;
};

const submitTask = async () => {
    const { mutate: saveTask } = useMutation(upsertTask);
    isSubmitting.value = true;

    try {
        const isNew = !newTask.value.id;
        const status = isNew ? selectedColumnId.value : newTask.value.status;
        const tasksInColumn =
            columns.value.find((col) => col.id === status)?.tasks ?? [];

        const input = {
            description: newTask.value.description,
            priority: newTask.value.priority,
            status: status as TaskStatus,
            title: newTask.value.title,
            updatedBy: { connect: auth.user?.id },
            ...(isNew && { order: tasksInColumn.length + 1 }),
            ...(isNew && { createdBy: { connect: auth.user?.id } }),
            ...(newTask.value.id && { id: newTask.value.id }),
        };

        await saveTask({ input });

        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: `Task ${isNew ? "created" : "updated"} successfully`,
        });
        resetForm();
    } catch (e) {
        console.error("Error saving task:", e);
    } finally {
        isSubmitting.value = false;
    }
};

const getTaskActions = (task: Task) => [
    [
        {
            click: () => editTask(task),
            icon: "solar:pen-2-outline",
            label: "Edit",
        },
    ],
    [
        ...(auth.can("delete task")
            ? [
                  {
                      click: () => deleteTaskHandler(task.id),
                      icon: "solar:trash-bin-minimalistic-broken",
                      label: "Delete",
                  },
              ]
            : []),
    ],
];

const editTask = (task: Task) => {
    newTask.value = { ...task };
    selectedColumnId.value = task.status as string;
    isModalOpen.value = true;
};

const deleteTaskHandler = async (taskId: string) => {
    const { mutate: removeTask } = useMutation(deleteTask);

    try {
        await removeTask({ id: [taskId] });
        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: "Task deleted successfully",
        });
    } catch (e) {
        console.error("Error deleting task:", e);
    }
};

const resetForm = () => {
    newTask.value = {
        description: "",
        id: "",
        priority: undefined,
        status: undefined,
        title: "",
    };
    isModalOpen.value = false;
};

onMounted(() => {
    columns.value.forEach((col) => {
        const columnVariables = computed(() => ({
            first: col.first,
            whereConditions: {
                AND: [
                    { column: "STATUS", operator: "EQ", value: col.id },
                    ...(conditions(taskPermissions)
                        ? [conditions(taskPermissions)]
                        : []),
                ],
            },
        }));

        const query = useQuery(tasksPaginate, columnVariables);

        taskQueries[col.id] = query;

        const column = columns.value.find((c) => c.id === col.id);
        if (!column) return;

        watch(
            () => query.result.value?.tasksPaginate,
            (val) => {
                const data = val?.data;
                // console.log("Watcher data:", col.id, data);
                taskBoard.setColumnTasks(col.id, data ?? []);
                column.hasMore = val?.paginatorInfo?.hasMorePages ?? false;
            },
            { immediate: true },
        );
    });
});

const { $echo } = useNuxtApp();
onMounted(() => {
    $echo.channel("tasks").listen(".TaskUpdated", (e: TaskUpdatedEvent) => {
        // console.log("Broadcast Event:", e.task);
        taskBoard.updateTask(e.task);
        refetchTasks();
    });
});
</script>
