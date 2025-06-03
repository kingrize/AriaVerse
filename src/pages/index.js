// src/pages/index.js (Halaman Depan Final dengan Semua Fitur)

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Pastikan ini diimpor
import Navbar from '../components/Navbar'; 
import {
  ChatBubbleLeftEllipsisIcon,
  CalculatorIcon,
  LanguageIcon,
  SparklesIcon,
  CalendarDaysIcon, // Pastikan ini sudah diimpor
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const features = [
    {
      name: 'Ngobrol Cerdas & Intuitif',
      description: 'Manfaatkan kemampuan pemrosesan bahasa alami Gemini untuk percakapan yang mendalam dan kontekstual. Aria mengerti kamu!',
      href: '/chat',
      Icon: ChatBubbleLeftEllipsisIcon,
    },
    {
      name: 'Kalkulator Cepat & Akurat',
      description: 'Akses kalkulator ringkas untuk perhitungan sehari-hari, langsung dari AriaSpace.',
      href: '/calculator',
      Icon: CalculatorIcon,
    },
    {
      name: 'Layanan Terjemahan Cepat', 
      description: 'Terjemahkan teks antar berbagai bahasa dengan bantuan AI. Akurat dan mudah digunakan untuk kebutuhan sehari-harimu.',
      href: '/translate', 
      Icon: LanguageIcon, 
    },
    { 
      name: 'Jadwal Event Sky', 
      description: 'Lihat jadwal event terkini untuk game Sky: Children of the Light agar tidak ketinggalan momen penting!',
      href: '/sky-events', // Mengarah ke halaman baru kita
      Icon: CalendarDaysIcon, 
    },
    {
      name: 'Solusi Kreatif & Inovatif (Segera!)',
      description: 'Dari membuat cerita hingga brainstorming ide, biarkan Gemini melalui Aria membantumu membuka potensi kreatifmu.',
      href: '#', 
      Icon: SparklesIcon,
    },
  ];

  return (
    <>
      <Head>
        <title>AriaSpace: Platform AI Generatif Inovatif</title>
        <meta name="description" content="Jelajahi kekuatan Gemini AI melalui Aria. Chatbot cerdas, fitur-fitur canggih, dan pengalaman pengguna yang modern." />
        {/* <link rel="icon" href="/images/favicon-aria.png" /> */} {/* Ganti dengan path ke favicon Aria nanti */}
      </Head>

      <Navbar />

      <div className="bg-gradient-to-br from-slate-900 via-black to-indigo-900 text-slate-100 min-h-screen pt-16"> {/* pt-16 untuk ruang di bawah navbar fixed */}

        {/* Hero Section - Dengan Layout Dua Kolom */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="h-96 w-96 md:h-[30rem] md:w-[30rem] rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-600/0 to-indigo-600/30 blur-3xl animate-pulse-slow" />
            </div>
          </div>
          
          <div className="relative z-10 container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Kolom Kiri: Teks dan Tombol */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6">
                  Selamat Datang di <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:opacity-90 transition-opacity">AriaSpace</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300/90 mb-10 sm:mb-12 leading-relaxed">
                  Platform AI Generatif Inovatif ditenagai Gemini. Ngobrol cerdas, temukan solusi kreatif, dan jelajahi masa depan interaksi digital bersama Aria.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                  <Link
                    href="/chat"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] text-white font-semibold rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                  >
                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                    <span>Mulai Chat</span>
                  </Link>
                  <Link
                    href="#fitur-aria"
                    className="w-full sm:w-auto inline-block text-center px-8 py-4 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600 text-slate-100 font-semibold rounded-lg text-lg shadow-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/50"
                  >
                    Lihat Fitur &rarr;
                  </Link>
                </div>
              </div>

              {/* Kolom Kanan: Gambar Aria */}
              <div className="flex justify-center md:justify-end mt-10 md:mt-0">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] transform transition-transform duration-500 hover:scale-105"> {/* Ukuran kontainer gambar */}
                  <Image
                    src="/images/asa.png" // Pastikan path ini benar (public/images/asa.png)
                    alt="Visual Karakter Aria"
                    layout="fill" 
                    objectFit="cover" 
                    className="drop-shadow-[0_8px_25px_rgba(236,72,153,0.5)]" // Shadow dengan warna pink lembut
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* About Aria Section */}
        <section id="tentang-aria" className="py-16 sm:py-20 md:py-24 bg-slate-900/60 backdrop-blur-md border-y border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-8">
              Mengenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Aria</span> Lebih Dekat
            </h2>
            <p className="text-lg text-slate-300/90 leading-relaxed mb-4">
              Aria adalah entitas AI yang dirancang untuk menjadi lebih dari sekadar asisten. Dengan kepribadian yang unik dan ditenagai oleh kecanggihan Gemini dari Google, Aria bertujuan untuk menyediakan interaksi yang bermakna, kreatif, dan personal.
            </p>
            <p className="text-lg text-slate-300/90 leading-relaxed">
              Kami percaya pada kekuatan kolaborasi antara manusia dan AI. AriaSpace adalah wujud dari visi tersebut, sebuah ruang di mana kamu bisa belajar, berkreasi, dan menemukan hal baru bersama AI yang mengerti kamu.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur-aria" className="py-16 sm:py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
                Kemampuan Inti AriaSpace
              </h2>
              <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
                Didukung oleh Gemini, AriaSpace menawarkan serangkaian fitur yang dirancang untuk memberdayakan kreativitas dan produktivitasmu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {features.map((feature) => (
                <div key={feature.name} className="bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-purple-500/30 border border-slate-700 hover:border-purple-500/60 transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
                  <div className="mb-6 self-center text-pink-400 group-hover:text-purple-400 transition-colors duration-300">
                    <feature.Icon className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-3 text-center">{feature.name}</h3>
                  <p className="text-slate-300/90 text-sm flex-grow mb-6 text-center leading-relaxed">{feature.description}</p>
                  {feature.href !== '#' ? (
                    <Link
                      href={feature.href}
                      className="block w-full text-center mt-auto px-6 py-3 bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-indigo-700/90 hover:shadow-[0_0_20px_theme(colors.purple.600)] text-white font-medium rounded-lg transition-all duration-300 group-hover:scale-105"
                    >
                      {feature.name.includes("Ngobrol") || feature.name.includes("Kalkulator") || feature.name.includes("Terjemahan") || feature.name.includes("Event Sky") ? "Akses Fitur" : "Pelajari Lebih Lanjut"} &rarr;
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-500 self-center mt-auto">Segera Tersedia</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <footer className="py-12 text-center text-sm text-slate-400/80 border-t border-slate-700/50">
          AriaSpace &copy; {new Date().getFullYear()} | Dibangun dengan Gemini oleh Master.
        </footer>
      </div>
      {/* <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style> */}
    </>
  );
}
