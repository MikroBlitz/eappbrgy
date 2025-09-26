import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    calculateDailyHours,
    formatDate,
    formatTime,
    getAttendanceForRow,
} from "~/pages/biometrics/utils/helpers";

export function useDTRGenerator(startDate: Date, endDate: Date) {
    const toast = useToast();

    const defaultFormat = (row: any) => {
        try {
            const doc = new jsPDF();
            const attendanceData = getAttendanceForRow(row) || [];
            // const hasExtraTime1 = attendanceData.some(
            //     (att) => att.extra_time_in_1 && att.extra_time_out_1,
            // );
            // const hasExtraTime2 = attendanceData.some(
            //     (att) => att.extra_time_in_2 && att.extra_time_out_2,
            // );

            // table headers
            const headers = ["Date", "AM In", "AM Out", "PM In", "PM Out"];
            // if (hasExtraTime1) headers.push("Extra Time 1 In", "Extra Time 1 Out");
            // if (hasExtraTime2) headers.push("Extra Time 2 In", "Extra Time 2 Out");
            headers.push("Total Hours");

            // table rows
            const tableData = attendanceData.map((att) => {
                const date = new Date(att.date);
                const row = [
                    formatDate(date),
                    att.am_time_in ? formatTime(att.am_time_in) : "-",
                    att.am_time_out ? formatTime(att.am_time_out) : "-",
                    att.pm_time_in ? formatTime(att.pm_time_in) : "-",
                    att.pm_time_out ? formatTime(att.pm_time_out) : "-",
                ];

                // if (hasExtraTime1) {
                //     row.push(
                //         att.extra_time_in_1 ? formatTime(att.extra_time_in_1) : "-",
                //         att.extra_time_out_1
                //             ? formatTime(att.extra_time_out_1)
                //             : "-",
                //     );
                // }
                // if (hasExtraTime2) {
                //     row.push(
                //         att.extra_time_in_2 ? formatTime(att.extra_time_in_2) : "-",
                //         att.extra_time_out_2
                //             ? formatTime(att.extra_time_out_2)
                //             : "-",
                //     );
                // }

                row.push(calculateDailyHours(att));
                return row;
            });

            // header
            doc.setFontSize(16);
            doc.text("DAILY TIME RECORD", 105, 15, { align: "center" });
            doc.setFontSize(12);
            doc.text(`Employee: ${row.name}`, 14, 25);
            doc.text(
                `Period: ${formatDate(startDate)} to ${formatDate(endDate)}`,
                14,
                35,
            );

            // summary
            doc.setFontSize(12);
            const totalWorkingDays = attendanceData.length;
            const totalHours = attendanceData.reduce(
                (sum: number, att: number) => {
                    const hours = Number(calculateDailyHours(att));
                    return sum + (isNaN(hours) ? 0 : hours);
                },
                0,
            );
            doc.text(`Total Working Days: ${totalWorkingDays}`, 14, 45);
            doc.text(`Total Hours: ${totalHours.toFixed(2)}`, 14, 55);

            // table
            autoTable(doc, {
                alternateRowStyles: {
                    fillColor: [240, 240, 240],
                },
                body: tableData,
                head: [headers],
                headStyles: {
                    fillColor: [46, 204, 113],
                    fontStyle: "bold",
                    textColor: 255,
                },
                margin: { top: 60 },
                startY: 60,
                theme: "grid",
            });

            // save PDF
            const fileName = `DTR_${row.name.replace(/\s+/g, "_")}_${formatDate(
                startDate,
            )}_to_${formatDate(endDate)}.pdf`.replace(/[/\\?%*:|"<>]/g, "");
            doc.save(fileName);

            toast.add({
                color: "green",
                icon: "solar:check-circle-broken",
                title: `PDF Downloaded.`,
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const cscFormat = (row: any) => {
        try {
            const doc = new jsPDF("p", "mm", "a4"); // portrait A4
            const attendanceData = getAttendanceForRow(row) || [];

            // CSC DTR headers
            const headers = [
                ["", "AM", "", "PM", "", "Undertime", "Remarks"],
                ["Date", "IN", "OUT", "IN", "OUT", "(min)", ""],
            ];

            // rows
            const tableData = attendanceData.map((att) => {
                const date = new Date(att.date);
                return [
                    formatDate(date),
                    att.am_time_in ? formatTime(att.am_time_in, false) : "",
                    att.am_time_out ? formatTime(att.am_time_out, false) : "",
                    att.pm_time_in ? formatTime(att.pm_time_in, false) : "",
                    att.pm_time_out ? formatTime(att.pm_time_out, false) : "",
                    att.undertime || "0",
                    att.remarks || "",
                ];
            });

            // function to render one column of DTR
            const renderDTRColumn = (xOffset: number) => {
                const y = 15;

                // --- HEADER ---
                doc.setFontSize(9);
                doc.text("Republic of the Philippines", xOffset + 55, y, {
                    align: "center",
                });
                doc.text("Department / Agency / Office", xOffset + 55, y + 5, {
                    align: "center",
                });

                doc.setFontSize(12);
                doc.text("DAILY TIME RECORD", xOffset + 55, y + 14, {
                    align: "center",
                });

                doc.setFontSize(9);
                doc.text("(CSC Form No. 48)", xOffset + 55, y + 20, {
                    align: "center",
                });

                // --- EMPLOYEE INFO ---
                doc.setFontSize(9);
                doc.text(`Name: ${row.name}`, xOffset + 5, y + 32);
                doc.text(
                    `Position: ${row.position || "-"}`,
                    xOffset + 5,
                    y + 38,
                );
                doc.text(`Office: ${row.office || "-"}`, xOffset + 5, y + 44);
                doc.text(`ID No.: ${row.id || "-"}`, xOffset + 5, y + 50);
                doc.text(
                    `For the period: ${formatDate(startDate)} to ${formatDate(endDate)}`,
                    xOffset + 5,
                    y + 56,
                );

                // --- TABLE ---
                autoTable(doc, {
                    body: tableData,
                    columnStyles: {
                        0: { halign: "left" }, // Date left aligned
                    },
                    head: headers,
                    headStyles: {
                        fillColor: [0, 0, 0],
                        fontStyle: "bold",
                        textColor: 255,
                    },
                    margin: { left: xOffset + 2 },
                    startY: y + 64,
                    styles: { fontSize: 8, halign: "center", valign: "middle" },
                    tableWidth: 100, // half page width
                    theme: "grid",
                });

                // --- FOOTER ---
                const finalY = (doc as any).lastAutoTable.finalY + 10;
                doc.setFontSize(8);
                doc.text(
                    "I certify on my honor that the above is a true and correct report",
                    xOffset + 3,
                    finalY,
                );
                doc.text(
                    "of the hours of work performed, record of which was made daily at the",
                    xOffset + 3,
                    finalY + 4,
                );
                doc.text(
                    "time of arrival and departure from office.",
                    xOffset + 3,
                    finalY + 8,
                );

                // signatures
                doc.text(
                    "_________________________",
                    xOffset + 25,
                    finalY + 20,
                    { align: "center" },
                );
                doc.text("Employee", xOffset + 25, finalY + 25, {
                    align: "center",
                });

                doc.text(
                    "_________________________",
                    xOffset + 75,
                    finalY + 20,
                    { align: "center" },
                );
                doc.text("Head of Office", xOffset + 75, finalY + 25, {
                    align: "center",
                });
            };

            // render left column
            renderDTRColumn(0);

            // render right column
            renderDTRColumn(105); // half of A4 width (210mm / 2)

            // save file
            const fileName = `DTR_${row.name.replace(/\s+/g, "_")}_${formatDate(
                startDate,
            )}_to_${formatDate(endDate)}.pdf`.replace(/[/\\?%*:|"<>]/g, "");
            doc.save(fileName);

            toast.add({
                color: "green",
                icon: "solar:check-circle-broken",
                title: `CSC DTR PDF Downloaded.`,
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return {
        cscFormat,
        defaultFormat,
    };
}
