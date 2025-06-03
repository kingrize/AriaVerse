// src/pages/sky-events.js (Menampilkan Daftar Event Sky)

import Head from 'next/head';
import Navbar from '../components/Navbar'; // Pastikan path ini benar
import SkyEventList from '../components/SkyEventList'; // Impor komponen SkyEventList
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function SkyEventsPage() {
  return (
    <>
      <Head>
        <title>Jadwal Event Sky | AriaSpace</title>
        <meta name="description" content="Informasi jadwal event terbaru untuk game Sky: Children of the Light di AriaSpace." />
        {/* <link rel="icon" href="/images/favicon-aria.png" /> */}
      </Head>
      <Navbar />

      {/* Kontainer utama halaman */}
      <div className="bg-gradient-to-br from-slate-900 via-black to-indigo-900 text-slate-100 min-h-screen pt-20 sm:pt-24 px-2 sm:px-4 lg:px-6">
        <div className="container mx-auto max-w-5xl py-8 sm:py-12"> {/* Kontainer untuk membatasi lebar dan memberi padding */}
          
          {/* Header Halaman */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-pink-500/20 rounded-full mb-4 sm:mb-6">
              <CalendarDaysIcon className="h-10 w-10 sm:h-12 sm:w-12 text-pink-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400">
              Jadwal Event Sky
            </h1>
            <p className="text-slate-300/90 text-md sm:text-lg mt-2">
              Informasi event terkini untuk Sky: Children of the Light.
            </p>
          </div>
          
          {/* Komponen Daftar Event */}
          <div className="bg-slate-800/60 dark:bg-slate-800/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-700 dark:border-slate-600">
            <SkyEventList /> {/* Komponen daftar event dipanggil di sini */}
          </div>

          {/* Catatan Tambahan */}
          <footer className="pt-8 mt-8 text-center text-xs sm:text-sm text-slate-400/80 border-t border-slate-700/50">
            Data event Sky bersumber dari komunitas dan dapat berubah sewaktu-waktu. 
            <br className="sm:hidden"/>
            Selalu periksa informasi terbaru di dalam game ya, Master! (´｡• ω •｡`)
          </footer>
        </div>
      </div>
    </>
  );
}
