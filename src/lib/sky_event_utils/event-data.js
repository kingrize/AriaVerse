// src/lib/sky_event_utils/event-data.js
import { getFormattedSkyTime } from "./regional-time.js"; // Path disesuaikan

const getCurrentCalendarDate = (currentDate) => new Date(getFormattedSkyTime(currentDate, 'yyyy-MM-dd'))
const getCurrentDay = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'i'));
const getDayOfTheMonth = (currentDate) => parseInt(getFormattedSkyTime(currentDate, 'd'));
const getHours = (hourCount) => hourCount * 60;

const getNextWeeklyEventDay = (dayOfTheWeek) => getCurrentDay(Date.now()) <= (dayOfTheWeek % 7) ? dayOfTheWeek : dayOfTheWeek + 6;

// Tanggal referensi untuk Traveling Spirit mungkin perlu disesuaikan atau divalidasi jika data eventnya mau akurat
const travelingSpiritComparisonDate = new Date('2024-08-29'); // Contoh dari file asli

export const eventNames = {
    GEYSER: 'geyser',
    GRANDMA: 'grandma',
    TURTLE: 'turtle',
    DREAMS_SKATER: 'dreamsSkater',
    NEST_SUNSET: 'nestSunset',
    PASSAGE_QUESTS: 'passageQuests',
    DAILY_RESET: 'dailyReset',
    AURORA_CONCERT: 'auroraConcertStarts',
    FIREWORKS_FESTIVAL: 'fireworksFestival',
    WEEKLY_RESET: 'weeklyReset',
    ITEM_ROTATION: 'itemRotation',
    SPELL_SHOP_EXPANDED: 'spellShopExpanded',
    SPELL_SHOP_STANDARD: 'spellShopStandard',
    WIREFRAME_GALLERIES: 'wireframeGalleries', // Dari Anniversary_5
    BALL_GAME: 'ballGame',                   // Dari Anniversary_5
    OREO_PARTY: 'oreoParty',                 // Dari Anniversary_5
    SPIRITS_PARADE: 'spiritsParade',         // Dari Anniversary_5
    FESTIVAL_FIREWORKS: 'festivalFireworks', // Dari Anniversary_5
    TRAVELING_SPIRIT_VISIT: 'travelingSpiritVisit', // Tambahkan ini dari eventDefinitionsBase
    TRAVELING_SPIRIT_LEAVE: 'travelingSpiritLeave', // Tambahkan ini dari eventDefinitionsBase
};

export const eventTypes = {
    WAX: { position: 0, name: 'Wax' },
    QUESTS: { position: 1, name: 'Quests' },
    SHOPS: { position: 2, name: 'Shops and Spirits' },
    RESET: { position: 3, name: 'Reset' },
    CONCERT: { position: 4, name: 'Concerts and Shows' },
    ANNIVERSARY_5: { position: 5, name: 'Fifth Anniversary Events' }, // Ini dari file asli, mungkin bisa disesuaikan namanya
    ENVIRONMENT: { position: 6, name: 'Environment' },
};

const eventDefinitionsBase = {
    [eventNames.GEYSER]: {
        name: 'Geyser', key: eventNames.GEYSER, type: eventTypes.WAX, period: getHours(2),
        hour: (hour) => hour % 2, minute: (minute) => 5 - minute,
        // notification: { body: 'Geyser erupts in {t} minutes!', image: '/images/events/geyser.jpg' } // Path gambar mungkin belum ada
    },
    [eventNames.GRANDMA]: {
        name: 'Grandma', key: eventNames.GRANDMA, type: eventTypes.WAX, period: getHours(2),
        hour: (hour) => hour % 2, minute: (minute) => 35 - minute,
        // notification: { body: 'Grandma is visiting in {t} minutes!', image: '/images/events/grandma.jpg' }
    },
    [eventNames.TURTLE]: {
        name: 'Turtle', key: eventNames.TURTLE, type: eventTypes.WAX, period: getHours(2),
        hour: (hour) => hour % 2, minute: (minute) => 50 - minute,
        // notification: { body: 'Sanctuary turtle is visiting in {t} minutes!' }
    },
    [eventNames.DREAMS_SKATER]: {
        name: 'Dreams Skater', key: eventNames.DREAMS_SKATER, type: eventTypes.WAX, period: getHours(2),
        isToday: () => [5, 6, 7].includes(getCurrentDay(Date.now())), hour: (hour) => (hour + 1) % 2, minute: (minute) => 0 - minute,
        // notification: { body: 'Dreams skater will begin skating in {t} minutes!' }
    },
    [eventNames.NEST_SUNSET]: {
        name: 'Nest Sunset', key: eventNames.NEST_SUNSET, type: eventTypes.QUESTS, period: getHours(1),
        hour: (hour) => 0, minute: (minute) => 40 - minute
    },
    [eventNames.PASSAGE_QUESTS]: {
        name: 'Passage Quests', key: eventNames.PASSAGE_QUESTS, type: eventTypes.QUESTS, period: 15,
        hour: () => 0, minute: (minute) => 15 - (minute % 15)
    },
    [eventNames.WIREFRAME_GALLERIES]: {
        name: 'Wireframe Galleries', key: eventNames.WIREFRAME_GALLERIES, type: eventTypes.ANNIVERSARY_5, period: getHours(2),
        hour: (hour) => hour % 2, minute: (minute) => 0 - minute
    },
    [eventNames.BALL_GAME]: {
        name: 'Ball Game', key: eventNames.BALL_GAME, type: eventTypes.ANNIVERSARY_5, period: getHours(2),
        hour: (hour) => (hour + 1) % 2, minute: (minute) => 0 - minute
    },
    [eventNames.OREO_PARTY]: {
        name: 'Oreo Party', key: eventNames.OREO_PARTY, type: eventTypes.ANNIVERSARY_5, period: getHours(2),
        hour: (hour) => (hour + 1) % 2, minute: (minute) => 15 - minute
    },
    [eventNames.SPIRITS_PARADE]: {
        name: 'Spirits Parade', key: eventNames.SPIRITS_PARADE, type: eventTypes.ANNIVERSARY_5, period: getHours(2),
        hour: (hour) => (hour + 1) % 2, minute: (minute) => 30 - minute
    },
    [eventNames.FESTIVAL_FIREWORKS]: {
        name: 'Festival Fireworks', key: eventNames.FESTIVAL_FIREWORKS, type: eventTypes.ANNIVERSARY_5, period: getHours(2),
        hour: (hour) => (hour + 1) % 2, minute: (minute) => 46 - minute
    },
    [eventNames.DAILY_RESET]: {
        name: 'Daily Reset', key: eventNames.DAILY_RESET, type: eventTypes.RESET, period: getHours(24),
        hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
    [eventNames.AURORA_CONCERT]: {
        name: 'Aurora Concert', key: eventNames.AURORA_CONCERT, type: eventTypes.CONCERT, period: getHours(2),
        hour: (hour) => (2 + hour) % 2, minute: (minute) => 10 - minute,
    },
    [eventNames.FIREWORKS_FESTIVAL]: {
        name: 'Fireworks Festival', key: eventNames.FIREWORKS_FESTIVAL, type: eventTypes.CONCERT, period: getHours(4),
        isToday: () => getDayOfTheMonth(new Date()) === 1, hour: (hour) => (hour + 1) % 2, minute: (minute) => 0 - minute
    },
    [eventNames.WEEKLY_RESET]: {
        name: 'Weekly Reset', key: eventNames.WEEKLY_RESET, type: eventTypes.RESET, period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(6) - day, hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
    [eventNames.ITEM_ROTATION]: {
        name: 'Store Item Rotation', key: eventNames.ITEM_ROTATION, type: eventTypes.SHOPS, period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(1) - day, hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
    [eventNames.SPELL_SHOP_EXPANDED]: {
        name: 'Spell Shop Expanded Selection', key: eventNames.SPELL_SHOP_EXPANDED, type: eventTypes.SHOPS,
        showInClock: () => [1, 2, 3, 4].includes(getCurrentDay(Date.now())), period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(5) - (day+1), hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
    [eventNames.SPELL_SHOP_STANDARD]: {
        name: 'Spell Shop Regular Selection', key: eventNames.SPELL_SHOP_STANDARD, type: eventTypes.SHOPS,
        showInClock: () => [5, 6, 7].includes(getCurrentDay(Date.now())), period: getHours(7 * 24),
        days: (day) => getNextWeeklyEventDay(1) - day, hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
    [eventNames.TRAVELING_SPIRIT_VISIT]: { // Definisi dari file asli
        name: 'Next Traveling Spirit', key: eventNames.TRAVELING_SPIRIT_VISIT, type: eventTypes.SHOPS,
        showInClock: () => (getCurrentCalendarDate(Date.now()) - travelingSpiritComparisonDate) / (1000 * 60 * 60 * 24) % 14 > 3, // Disesuaikan agar modulo bekerja
        period: getHours(14 * 24), days: (day) => getNextWeeklyEventDay(4) - day, // Hari ke-4 (Kamis)
        hour: (hour) => 24 - hour,  minute: (minute) => 0 - minute
    },
    [eventNames.TRAVELING_SPIRIT_LEAVE]: { // Definisi dari file asli
        name: 'Traveling Spirit Leaves', key: eventNames.TRAVELING_SPIRIT_LEAVE, type: eventTypes.SHOPS,
        showInClock: () => (getCurrentCalendarDate(Date.now()) - travelingSpiritComparisonDate) / (1000 * 60 * 60 * 24) % 14 < 3, // Disesuaikan agar modulo bekerja
        period: getHours(14 * 24), days: (day) => getNextWeeklyEventDay(1) - day, // Hari ke-1 (Senin berikutnya)
        hour: (hour) => 24 - hour, minute: (minute) => 0 - minute
    },
};

// Memastikan semua event punya default function jika tidak didefinisikan
const eventDefinitions = Object.keys(eventDefinitionsBase).reduce((definitions, eventKey) => {
    definitions[eventKey] = {
        isToday: () => true,
        showInClock: () => true,
        days: () => 0,
        notification: null, // Default notification null jika tidak ada
        ...eventDefinitionsBase[eventKey]
    };
    return definitions;
}, {});

export { eventDefinitions };

// weeklyReset object tidak perlu diexport lagi jika sudah ada di eventDefinitions
// export const weeklyReset = { ... };