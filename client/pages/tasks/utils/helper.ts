import type { BadgeColor } from "#ui/types";

export const getPriorityColor = (priority: string): BadgeColor => {
    switch (priority?.toUpperCase()) {
        case "HIGH":
            return "red";
        case "MEDIUM":
            return "yellow";
        case "LOW":
            return "green";
        default:
            return "gray";
    }
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });
};

export const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
];

export const taskPermissions = [
    "view task",
    "view all task",
    "create task",
    "edit task",
    "delete task",
];

export function emptyStateTitle(id: string) {
    switch (id) {
        case "TODO":
            return "No tasks yet";
        case "IN_PROGRESS":
            return "Nothing in progress";
        case "DONE":
            return "No completed tasks";
        default:
            return "No tasks available";
    }
}

export function emptyStateMessage(id: string) {
    switch (id) {
        case "TODO":
            return "Add a new task to get started.";
        case "IN_PROGRESS":
            return "Tasks in progress will appear here.";
        case "DONE":
            return "Finished tasks will be listed here.";
        default:
            return "Add tasks to populate your board.";
    }
}
