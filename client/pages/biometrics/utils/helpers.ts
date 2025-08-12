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

export const getAttendanceForRow = (row: any) => {
    return row.attendances;
};

export const hasExtraTime = (attendance: any) => {
    return (
        attendance.extra_time_in_1 &&
        !attendance.extra_time_in_1.includes("00:00:00")
    );
};

export const hasExtraTime2 = (attendance: any) => {
    return (
        attendance.extra_time_in_2 &&
        !attendance.extra_time_in_2.includes("00:00:00")
    );
};

export const calculateDailyHours = (attendance: any) => {
    try {
        let total = 0;

        if (attendance.am_time_in && attendance.am_time_out) {
            const amIn = new Date(attendance.am_time_in);
            const amOut = new Date(attendance.am_time_out);
            if (!isNaN(amIn.getTime()) && !isNaN(amOut.getTime())) {
                total += (amOut.getTime() - amIn.getTime()) / (1000 * 60 * 60);
            }
        }

        if (attendance.pm_time_in && attendance.pm_time_out) {
            const pmIn = new Date(attendance.pm_time_in);
            const pmOut = new Date(attendance.pm_time_out);
            if (!isNaN(pmIn.getTime()) && !isNaN(pmOut.getTime())) {
                total += (pmOut.getTime() - pmIn.getTime()) / (1000 * 60 * 60);
            }
        }

        if (attendance.extra_time_in_1 && attendance.extra_time_out_1) {
            const extraIn1 = new Date(attendance.extra_time_in_1);
            const extraOut1 = new Date(attendance.extra_time_out_1);
            if (!isNaN(extraIn1.getTime()) && !isNaN(extraOut1.getTime())) {
                total +=
                    (extraOut1.getTime() - extraIn1.getTime()) /
                    (1000 * 60 * 60);
            }
        }

        if (attendance.extra_time_in_2 && attendance.extra_time_out_2) {
            const extraIn2 = new Date(attendance.extra_time_in_2);
            const extraOut2 = new Date(attendance.extra_time_out_2);
            if (!isNaN(extraIn2.getTime()) && !isNaN(extraOut2.getTime())) {
                total +=
                    (extraOut2.getTime() - extraIn2.getTime()) /
                    (1000 * 60 * 60);
            }
        }

        const totalHours = total.toFixed(2);
        return totalHours;
    } catch (error) {
        console.error("Error calculating daily hours:", error);
        return "0.00";
    }
};

export const formatTime = (dateTime: string | Date) => {
    if (!dateTime) return "N/A";

    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return "Invalid Time";

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
    });
};

export const formatDate = (dateInput: Date | string | null | undefined) => {
    if (!dateInput) return "N/A";

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
