// src/lib/sky_event_utils/getSortedAndGroupedEventData.js
import { eventNames, eventDefinitions } from "./event-data.js"; // Path disesuaikan
import { getEventOffset } from "./event-time-offset.js";   // Path disesuaikan

function buildEventRecords(currentDate) {
    return Object.values(eventNames)
        .map((eventKeyName) => {
            const eventData = eventDefinitions[eventKeyName];
            if (!eventData) {
                // console.warn(`Event definition not found for key: ${eventKeyName}`);
                return null; // Atau handle error/skip
            }
            return {
                offsetData: getEventOffset(eventData, currentDate),
                ...eventData
            };
        }).filter(record => record !== null); // Filter event yang tidak terdefinisi
}

function sortEventRecords(eventRecords) {
    eventRecords.sort((eventRecord1, eventRecord2) => {
        const timeOffset1 = eventRecord1.offsetData.minutesToNextEvent;
        const timeOffset2 = eventRecord2.offsetData.minutesToNextEvent;

        const offsetsAreEqual = timeOffset1 === timeOffset2;
        const offset1IsGreater = timeOffset1 > timeOffset2;

        const position1 = eventRecord1.type.position;
        const position2 = eventRecord2.type.position;

        const positionsAreEqual = position1 === position2;
        const position1IsGreater = position1 > position2;

        // isToday() mungkin tidak selalu ada, gunakan showInClock() sebagai gantinya atau pastikan ada default
        const noEventToday1 = eventRecord1.showInClock && !eventRecord1.showInClock(); 

        if (position1IsGreater || (positionsAreEqual && (noEventToday1 || offset1IsGreater))) {
            return 1;
        } else if (positionsAreEqual && offsetsAreEqual) {
            // Jika waktu dan posisi sama, urutkan berdasarkan nama untuk konsistensi
            return eventRecord1.name.localeCompare(eventRecord2.name);
        } else {
            return -1;
        }
    });
}

function buildEventDataForDisplay(eventRecords) {
    let lastTypePosition = -1; // Gunakan position untuk konsistensi
    const finalEventRecordset = [];

    eventRecords.forEach((eventRecord) => {
        if (eventRecord.type.position !== lastTypePosition) {
            finalEventRecordset.push({ group: eventRecord.type.name, key: `group-${eventRecord.type.name}` }); // Tambah key unik
        }
        finalEventRecordset.push(eventRecord);
        lastTypePosition = eventRecord.type.position;
    });
    return finalEventRecordset;
}

export default function getSortedAndGroupedEventData(currentDate) {
    const eventRecords = buildEventRecords(currentDate);
    sortEventRecords(eventRecords);
    return buildEventDataForDisplay(eventRecords);
}