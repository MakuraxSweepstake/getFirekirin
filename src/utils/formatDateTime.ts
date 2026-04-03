// src/utils/formatDateTime.ts
export function formatDateTime(dateString: string | null | undefined) {
    if (!dateString) return { date: "", time: "" };

    const dateObj = new Date(dateString);

    return {
        date: dateObj.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}

// const NY_TZ = "America/New_York";

// function hasTimezoneInfo(dateString: string): boolean {
//     // Ends with Z, or has +HH:MM / -HH:MM offset
//     return /Z$|[+-]\d{2}:\d{2}$/.test(dateString);
// }

// function parseAsNYTime(dateString: string): Date {
//     // Get current NY UTC offset (handles DST automatically)
//     const nowInNY = new Date().toLocaleString("en-US", { timeZone: NY_TZ, timeZoneName: "shortOffset" });
//     const offsetMatch = nowInNY.match(/GMT([+-]\d+(?::\d+)?)/);
//     const offset = offsetMatch ? offsetMatch[1].padEnd(6, ":00").replace(/^([+-]\d)$/, "$10:00") : "-05:00";
//     return new Date(`${dateString}${offset}`);
// }

// export function formatDateTime(dateString: string | null | undefined): { date: string; time: string } {
//     if (!dateString) return { date: "", time: "" };

//     let dateObj: Date;

//     if (hasTimezoneInfo(dateString)) {
//         dateObj = new Date(dateString);
//     } else {

//         dateObj = parseAsNYTime(dateString);
//         if (process.env.NODE_ENV === "development") {
//             console.warn(
//                 `[formatDateTime] Naive date string detected: "${dateString}". ` +
//                 `Treating as NY time. If backend sends UTC, strings should end with "Z".`
//             );
//         }
//     }

//     if (isNaN(dateObj.getTime())) {
//         if (process.env.NODE_ENV === "development") {
//             console.error(`[formatDateTime] Invalid date string: "${dateString}"`);
//         }
//         return { date: "", time: "" };
//     }

//     const date = dateObj.toLocaleDateString("en-US", {
//         timeZone: NY_TZ,
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });

//     const time = dateObj.toLocaleTimeString("en-US", {
//         timeZone: NY_TZ,
//         hour: "2-digit",
//         minute: "2-digit",
//     });

//     return { date, time };
// }

