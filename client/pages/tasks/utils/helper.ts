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

export function conditions(auth: any) {
    const isAdmin = auth.user?.roles?.some((role) => role?.name === "Admin");
    // const requiredPermissions = [
    //     "view task",
    //     "create task",
    //     "edit task",
    //     "delete task",
    // ];
    // const hasPermissions = requiredPermissions.every((perm) => auth.can(perm));

    if (isAdmin) return undefined;

    return {
        column: "CREATED_BY",
        operator: "EQ",
        value: auth.user?.id,
    };
}
