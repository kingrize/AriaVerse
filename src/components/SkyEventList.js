// src/components/SkyEventList.js
import React, { useState, useEffect } from 'react';
import getSortedAndGroupedEventData from '../lib/sky_event_utils/getSortedAndGroupedEventData';
import { ChevronDownIcon, ChevronUpIcon, BellIcon } from '@heroicons/react/24/outline';

// Komponen kecil untuk menampilkan waktu (format HH:MM)
const TimeDisplay = ({ eventDate }) => {
  if (!eventDate) return <span className="text-slate-500">N/A</span>;
  // Opsi untuk format waktu 24 jam
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  try {
    // Menggunakan 'en-GB' untuk format HH:MM yang lebih umum atau 'id-ID' jika preferensi lokal
    return <span>{new Date(eventDate).toLocaleTimeString('en-GB', options)}</span>;
  } catch (e) {
    console.error("Error formatting date:", eventDate, e);
    return <span className="text-red-500">Invalid Date</span>;
  }
};

// Komponen untuk satu baris event
const EventRow = ({ event }) => {
  if (!event || !event.offsetData) {
    return (
      <tr className="border-b border-slate-700 dark:border-slate-600">
        <td colSpan="4" className="p-3 text-slate-500 dark:text-slate-400 text-sm text-center">
          Data event tidak lengkap.
        </td>
      </tr>
    );
  }

  const { minutesToNextEvent, date: nextEventDate } = event.offsetData;
  let timeToNextDisplay = 'Berlangsung';

  if (minutesToNextEvent > 0) {
    const hours = Math.floor(minutesToNextEvent / 60);
    const minutes = minutesToNextEvent % 60;
    timeToNextDisplay = `${hours}j ${minutes}m`;
  } else if (minutesToNextEvent === 0) {
    timeToNextDisplay = 'Segera!';
  }
  
  // Menampilkan hari jika event lebih dari 24 jam lagi
  let nextEventTimeDisplay;
  if (minutesToNextEvent > 24 * 60) {
    const optionsDate = { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
    nextEventTimeDisplay = new Date(nextEventDate).toLocaleTimeString('id-ID', optionsDate);
  } else {
    nextEventTimeDisplay = <TimeDisplay eventDate={nextEventDate} />;
  }


  return (
    <tr className="border-b border-slate-700 dark:border-slate-800 hover:bg-slate-700/30 dark:hover:bg-slate-700/50 transition-colors duration-150">
      <td className="p-2 sm:p-3 text-center align-middle">
        <button 
          title="Aktifkan notifikasi (fitur belum ada)"
          className="text-slate-500 hover:text-pink-400 dark:text-slate-600 dark:hover:text-pink-500 transition-colors"
        >
          <BellIcon className="h-5 w-5" />
        </button>
      </td>
      <td className="p-2 sm:p-3 text-slate-200 dark:text-slate-100 text-sm align-middle">{event.name || 'Nama Event Tidak Ada'}</td>
      <td className="p-2 sm:p-3 text-slate-300 dark:text-slate-200 text-sm align-middle">
        {nextEventTimeDisplay}
      </td>
      <td className="p-2 sm:p-3 text-slate-300 dark:text-slate-200 text-sm align-middle">
        {timeToNextDisplay}
      </td>
    </tr>
  );
};

// Komponen Utama SkyEventList
export default function SkyEventList() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState(new Set());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000); // Update setiap 30 detik untuk sisa waktu yang lebih akurat
    
    // Pemanggilan awal
    try {
      const processedData = getSortedAndGroupedEventData(new Date());
      setEventData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Error initializing event data:", error);
      setEventData([]);
      setLoading(false);
    }
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // Hanya update data jika bukan pemanggilan awal (sudah ditangani di useEffect pertama)
    if (!loading) { 
      try {
        const processedData = getSortedAndGroupedEventData(new Date(currentDate));
        setEventData(processedData);
      } catch (error) {
        console.error("Error processing event data:", error);
        setEventData([]);
      }
    }
  }, [currentDate, loading]);

  const toggleGroupCollapse = (groupKey) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  if (loading) {
    return <p className="text-slate-400 text-center py-8">Memuat data event Sky, Master... (づ｡◕‿‿◕｡)づ</p>;
  }

  if (!eventData || eventData.length === 0) {
    return <p className="text-slate-400 text-center py-8">Tidak ada data event yang bisa ditampilkan saat ini, Master.</p>;
  }

  let currentGroupKeyForRender = null;

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-slate-800/50 dark:bg-slate-800/70 border border-slate-700 dark:border-slate-600 shadow-lg">
      <table className="min-w-full table-fixed"> {/* table-fixed untuk lebar kolom yang lebih konsisten */}
        <thead className="bg-slate-700/50 dark:bg-slate-700/80">
          <tr>
            <th scope="col" className="px-2 sm:px-3 py-3 text-center text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider w-12">
              {/* Notif */}
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider">
              Event
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider">
              Waktu Berikutnya (Lokal)
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider">
              Sisa Waktu
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/70 dark:divide-slate-600/50">
          {eventData.map((item, index) => {
            if (item.group) {
              currentGroupKeyForRender = item.key;
              const isCollapsed = collapsedGroups.has(item.key);
              return (
                <tr 
                  key={item.key || `group-${index}`} 
                  className="bg-slate-700/30 dark:bg-slate-700/60 hover:bg-slate-600/40 dark:hover:bg-slate-600/70 cursor-pointer"
                  onClick={() => toggleGroupCollapse(item.key)}
                >
                  <td colSpan="4" className="p-3 text-sm font-semibold text-pink-400 dark:text-pink-300 flex justify-between items-center">
                    <span>{item.group}</span>
                    {isCollapsed ? <ChevronDownIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" /> : <ChevronUpIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />}
                  </td>
                </tr>
              );
            }
            
            if (currentGroupKeyForRender && collapsedGroups.has(currentGroupKeyForRender)) {
              return null; 
            }
            
            if (!item.offsetData || !item.name) return null; 
            return <EventRow key={item.key || index} event={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
