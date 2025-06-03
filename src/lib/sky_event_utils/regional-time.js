// src/lib/sky_event_utils/regional-time.js
import * as dateFnsTz from 'date-fns-tz'; // Menggunakan import
import * as dateFns from 'date-fns';     // Menggunakan import

const US_PACIFIC_TIME_ZONE = 'America/Los_Angeles';
const TIME_PATTERN = 'i:HH:mm:ss'; // Format: hariKeBerapaDalamMinggu:Jam:Menit:Detik (ISO weekday)

function getTimeTokens(formattedTime) {
    const [day, hour, minute, second] = formattedTime.split(':');
    return {
        day: parseInt(day),
        hour: parseInt(hour),
        minute: parseInt(minute),
        second: parseInt(second)
    };
}

export function getLocalTime(date) {
    const formattedTime = dateFns.format(date, TIME_PATTERN);
    return getTimeTokens(formattedTime);
}

export function getFormattedSkyTime(date, formatString) {
    return dateFnsTz.formatInTimeZone(date, US_PACIFIC_TIME_ZONE, formatString);
}

export function getSkyTime(date) {
    const formattedTime = dateFnsTz.formatInTimeZone(date, US_PACIFIC_TIME_ZONE, TIME_PATTERN);
    return getTimeTokens(formattedTime);
}