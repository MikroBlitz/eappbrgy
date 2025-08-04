import { useToast } from "#ui/composables/useToast";

import type { Task } from "~/types/codegen/graphql";

import { upsertTask } from "~/graphql/Task";
import { conditions } from "~/pages/tasks/utils/helper";

export const useBoardActions = () => {
    const auth = useAuthStore();
    const toast = useToast();
    const taskBoard = useTaskBoardStore();
    const columns = computed(() => taskBoard.columns);
    const draggedTask = ref<Task | null>(null);
    const taskQueries = reactive<Record<string, ReturnType<typeof useQuery>>>(
        {},
    );

    const onDragStart = (ev) => {
        const id = ev?.item?.dataset?.id;
        if (!id) return;

        for (const col of columns.value) {
            const found = col.tasks.find((t) => t.id === id);
            if (found) {
                // Create a deep copy to preserve the original state before UI updates
                draggedTask.value = JSON.parse(JSON.stringify(found));
                break;
            }
        }
    };

    const onTaskDrop = async (targetColumnId: string) => {
        const { mutate } = useMutation(upsertTask);

        if (!draggedTask.value) return;
        const task = draggedTask.value;
        draggedTask.value = null; // reset
        const sourceColumn = columns.value.find((col) =>
            col.tasks.find((t) => t.id === task.id),
        );
        const targetColumn = columns.value.find(
            (col) => col.id === targetColumnId,
        );
        if (!targetColumn || !sourceColumn) return;
        const newIndex = targetColumn.tasks.findIndex((t) => t.id === task.id);
        const isDifferentColumn = task.status !== sourceColumn.id;

        try {
            const input = {
                id: task.id,
                order: newIndex,
                status: sourceColumn.id,
                updatedBy: { connect: auth.user?.id },
            };
            await mutate({ input });
            // Reorder other tasks in target column
            const tasksToUpdate = targetColumn.tasks
                .filter((t) => t.id !== task.id)
                .map((t, index) => ({
                    ...t,
                    order: index >= newIndex ? index + 1 : index,
                }));

            for (const t of tasksToUpdate) {
                await mutate({
                    input: {
                        id: t.id,
                        order: t.order,
                        updatedBy: { connect: auth.user?.id },
                    },
                });
            }

            toast.add({
                color: "green",
                icon: "i-heroicons-check-circle",
                title: isDifferentColumn ? "Task moved" : "Task reordered",
            });
        } catch (error) {
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: `Error updating task: ${error.message}`,
            });
        }
    };

    const onScroll = async (e: Event, columnId: string) => {
        const column = columns.value.find((c) => c.id === columnId);
        if (!column || column.isLoading || !column.hasMore) return;

        const el = e.target as HTMLElement;
        const nearBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
        if (!nearBottom) return;

        column.isLoading = true;
        column.first += 10;

        const variables = {
            first: column.first,
            whereConditions: {
                AND: [
                    { column: "STATUS", operator: "EQ", value: column.id },
                    ...(conditions(auth) ? [conditions(auth)] : []),
                ],
            },
        };

        try {
            // Use refetch with new first value
            const { data } = await taskQueries[columnId]?.refetch(variables);

            // Replace tasks with the updated full list
            taskBoard.setColumnTasks(
                columnId,
                data?.tasksPaginate?.data ?? [],
                false,
            );

            column.hasMore =
                data?.tasksPaginate?.paginatorInfo?.hasMorePages ?? false;
        } catch (error) {
            console.error("Error loading tasks:", error);
            column.hasMore = false;
        } finally {
            column.isLoading = false;
        }
    };

    return {
        taskQueries,

        // actions
        onDragStart,
        onScroll,
        onTaskDrop,
    };
};
