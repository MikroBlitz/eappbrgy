export function formatAttendanceLabel(type: string, updated: boolean) {
    const label = type.includes("in") ? "Timed In" : "Timed Out";
    return `Successfully ${label}${updated ? " (Updated)" : ""}`;
}
