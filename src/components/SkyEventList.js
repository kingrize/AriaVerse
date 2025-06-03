// src/components/SkyEventList.js
import React, { useState, useEffect } from 'react';
import getSortedAndGroupedEventData from '../lib/sky_event_utils/getSortedAndGroupedEventData';
import { ChevronDownIcon, ChevronUpIcon, BellIcon } from '@heroicons/react/24/outline';

// Komponen kecil untuk menampilkan waktu (format HH:MM)
const TimeDisplay = ({ eventDate }) => {
  if (!eventDate) return <span className="text-slate-500 dark:text-slate-400">N/A</span>;
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  try {
    return <span>{new Date(eventDate).toLocaleTimeString('en-GB', options)}</span>;
  } catch (e) {
    console.error("Error formatting date:", eventDate, e);
    return <span className="text-red-500 dark:text-red-400">Invalid Date</span>;
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
    const totalHours = Math.floor(minutesToNextEvent / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = minutesToNextEvent % 60;
    
    if (days > 0) {
        timeToNextDisplay = `${days}h ${hours}j ${minutes}m`;
    } else {
        timeToNextDisplay = `${hours}j ${minutes}m`;
    }

  } else if (minutesToNextEvent === 0) {
    timeToNextDisplay = <span className="text-pink-400 dark:text-pink-300 animate-pulse">Segera!</span>;
  }
  
  let nextEventTimeDisplay;
  if (nextEventDate && minutesToNextEvent > 24 * 60) { // Jika lebih dari sehari
    const optionsDate = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
    nextEventTimeDisplay = new Date(nextEventDate).toLocaleString('id-ID', optionsDate);
  } else {
    nextEventTimeDisplay = <TimeDisplay eventDate={nextEventDate} />;
  }


  return (
    <tr className="border-b border-slate-700 dark:border-slate-800 hover:bg-slate-700/30 dark:hover:bg-slate-700/50 transition-colors duration-150">
      <td className="p-2 sm:p-3 text-center align-middle">
        <button 
          title="Aktifkan notifikasi (fitur belum ada)"
          className="text-slate-500 hover:text-pink-400 dark:text-slate-600 dark:hover:text-pink-500 transition-colors"
          onClick={() => alert(`Notifikasi untuk ${event.name} belum tersedia, Master! (^_^;)`)}
        >
          <BellIcon className="h-5 w-5" />
        </button>
      </td>
      <td className="p-2 sm:p-3 text-slate-200 dark:text-slate-100 text-sm align-middle font-medium">{event.name || 'Nama Event Tidak Ada'}</td>
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
  const [error, setError] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState(new Set());

  useEffect(() => {
    const fetchAndSetData = () => {
      setLoading(true); // Set loading true saat mulai fetch
      try {
        const processedData = getSortedAndGroupedEventData(new Date());
        setEventData(processedData);
        setError(null);
      } catch (err) {
        console.error("Error initializing event data:", err);
        setError("Gagal memuat data event Sky, Master. (〒﹏〒)");
        setEventData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetData(); // Panggil saat komponen pertama kali dimuat

    const timerId = setInterval(() => {
      setCurrentDate(new Date()); 
    }, 30000); // Update setiap 30 detik

    return () => clearInterval(timerId);
  }, []); 

  useEffect(() => {
    if (!loading) { 
        try {
            const processedData = getSortedAndGroupedEventData(new Date(currentDate));
            setEventData(processedData);
            setError(null);
        } catch (err) {
            console.error("Error re-processing event data:", err);
            setError("Gagal memperbarui data event Sky, Master.");
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
    return <p className="text-slate-400 dark:text-slate-500 text-center py-10">Memuat data event Sky, Master... (づ｡◕‿‿◕｡)づ</p>;
  }

  if (error) {
    return <p className="text-red-500 dark:text-red-400 text-center py-10">{error}</p>;
  }

  if (!eventData || eventData.length === 0) {
    return <p className="text-slate-400 dark:text-slate-500 text-center py-10">Tidak ada data event yang bisa ditampilkan saat ini, Master.</p>;
  }

  let currentGroupKeyForRender = null;

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-slate-800/50 dark:bg-slate-800/70 border border-slate-700 dark:border-slate-600 shadow-xl">
      <table className="min-w-full table-auto">
        <thead className="bg-slate-700/50 dark:bg-slate-700/80 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-2 sm:px-3 py-3.5 text-center text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider w-12">
              {/* Kolom Notif */}
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3.5 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider">
              Event
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3.5 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider whitespace-nowrap">
              Waktu Berikutnya (Lokal)
            </th>
            <th scope="col" className="px-2 sm:px-3 py-3.5 text-left text-xs font-semibold text-slate-300 dark:text-slate-200 uppercase tracking-wider whitespace-nowrap">
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
                  className="bg-slate-700/40 dark:bg-slate-700/70 hover:bg-slate-600/50 dark:hover:bg-slate-600/80 cursor-pointer sticky z-[5]"
                  style={{ top: '3.2rem' }} // Sesuaikan dengan tinggi header tabel (sekitar 50px)
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
