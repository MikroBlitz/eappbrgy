import type { BadgeColor } from "#ui/types";

import { defineStore } from "pinia";

import type { Task } from "~/types/codegen/graphql";

export const useTaskBoardStore = defineStore("taskBoard", () => {
    const columns = ref([
        {
            color: "gray" as BadgeColor,
            first: 10,
            hasMore: true,
            icon: "solar:server-minimalistic-broken",
            id: "TODO",
            isLoading: false,
            tasks: [] as Task[],
            title: "To Do",
        },
        {
            color: "yellow" as BadgeColor,
            first: 10,
            hasMore: true,
            icon: "solar:server-minimalistic-broken",
            id: "IN_PROGRESS",
            isLoading: false,
            tasks: [] as Task[],
            title: "In Progress",
        },
        {
            color: "emerald" as BadgeColor,
            first: 10,
            hasMore: true,
            icon: "solar:checklist-minimalistic-broken",
            id: "DONE",
            isLoading: false,
            tasks: [] as Task[],
            title: "Done",
        },
    ]);

    function setColumnTasks(columnId: string, tasks: Task[], append = false) {
        const column = columns.value.find((col) => col.id === columnId);
        if (!column) return;
        if (append) column.tasks.push(...tasks);
        else column.tasks = tasks;

        column.tasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    function setTasks(tasks: Task[]) {
        columns.value.forEach((col) => (col.tasks = []));

        tasks.forEach((task) => {
            const col = columns.value.find((c) => c.id === task.status);
            if (col) col.tasks.push(task);
        });

        // Sort by order
        columns.value.forEach((col) => {
            col.tasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        });
    }

    function updateTask(task: Task) {
        columns.value.forEach((col) => {
            col.tasks = col.tasks.filter((t) => t.id !== task.id);
        });

        const newCol = columns.value.find((col) => col.id === task.status);
        if (newCol) {
            const insertIndex = newCol.tasks.findIndex(
                (t) => (t.order ?? 0) > (task.order ?? 0),
            );
            if (insertIndex === -1) newCol.tasks.push(task);
            else newCol.tasks.splice(insertIndex, 0, task);
        }
    }

    function deleteTask(taskId: string) {
        columns.value.forEach((col) => {
            col.tasks = col.tasks.filter((t) => t.id !== taskId);
        });
    }

    return {
        columns,
        deleteTask,
        setColumnTasks,
        setTasks,
        updateTask,
    };
});
