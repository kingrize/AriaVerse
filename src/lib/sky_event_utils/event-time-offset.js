// src/lib/sky_event_utils/event-time-offset.js
import { add } from 'date-fns'; // Menggunakan import
import { getLocalTime, getSkyTime } from "./regional-time.js"; // Path disesuaikan

export function getMinutesToNextEvent(eventData, currentDate) {
    const { day, hour, minute } = getSkyTime(currentDate);

    const dayOffset = eventData.days ? eventData.days(day) : 0;
    const hourOffset = eventData.hour(hour);
    const minuteOffset = eventData.minute(minute);

    if (eventData.period > 24 * 60) { // Untuk event yang periodenya lebih dari sehari (e.g. mingguan)
        return (dayOffset * 24 * 60) + (hourOffset * 60) + minuteOffset;
    } else if (eventData.period === 24 * 60) { // Untuk event harian
        return (hourOffset * 60) + minuteOffset;
    } else if (hourOffset > 0 || (hourOffset === 0 && minuteOffset > 0)) { // Untuk event yang periodenya < 24 jam dan belum lewat
         return (hourOffset * 60) + minuteOffset;
    } else { // Untuk event yang periodenya < 24 jam dan sudah lewat hari ini, hitung ke periode berikutnya
        return eventData.period + (hourOffset * 60) + minuteOffset;
    }
}

export function getEventOffset(eventData, currentDate) {
    const minutesToNextEvent = getMinutesToNextEvent(eventData, currentDate);

    const daysOffsetCalc = Math.floor(minutesToNextEvent / (24 * 60));
    const hoursOffsetCalc = Math.floor(minutesToNextEvent / 60); // Total jam ke event
    const minutesOffsetCalc = minutesToNextEvent % 60;

    const nextEventDate = add(currentDate, { minutes: minutesToNextEvent });
    const { day, hour, minute } = getLocalTime(nextEventDate); // Waktu lokal dari nextEventDate

    return {
        date: nextEventDate, // Waktu pasti event berikutnya dalam zona waktu lokal user
        minutesToNextEvent,  // Total menit dari sekarang ke event berikutnya
        daysOffset: daysOffsetCalc, // Sisa hari (untuk tampilan)
        hoursOffset: hoursOffsetCalc % 24, // Sisa jam dalam hari itu (untuk tampilan)
        minutesOffset: minutesOffsetCalc, // Sisa menit (untuk tampilan)
        // Informasi waktu lokal dari nextEventDate (bukan sisa waktu)
        eventLocalDay: day,
        eventLocalHour: hour,
        eventLocalMinute: minute,
    };
}