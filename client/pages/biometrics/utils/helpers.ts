export function formatAttendanceLabel(type: string, updated: boolean) {
    const label = type.includes("in") ? "Timed In" : "Timed Out";
    return `Successfully ${label}${updated ? "" : ""}`;
}

export function isBetween(start: string, end: string): boolean {
    const current = new Date();
    const startTime = new Date(current);
    const endTime = new Date(current);

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    startTime.setHours(sh, sm, 0, 0);
    endTime.setHours(eh, em, 59, 999);

    return current >= startTime && current <= endTime;
}
