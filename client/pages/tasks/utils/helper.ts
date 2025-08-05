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
