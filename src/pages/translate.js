// src/pages/terjemahan.js
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function TerjemahanPage() {
  return (
    <>
      <Head>
        <title>Terjemahan AI | AriaSpace</title>
        <meta name="description" content="Layanan terjemahan teks antar bahasa dengan AI Gemini di AriaSpace." />
      </Head>
      <Navbar />
      <div className="bg-gradient-to-br from-slate-900 via-black to-indigo-900 text-slate-100 min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center py-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400">
            Layanan Terjemahan AI
          </h1>
          <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <p className="text-xl text-slate-300">
              Fitur terjemahan canggih dengan Gemini AI sedang disiapkan oleh Master! (≧◡≦)
            </p>
            <p className="text-slate-400 mt-4">Tunggu kehadirannya ya...</p>
            {/* Di sini nanti kita letakkan UI untuk input teks, pilihan bahasa, dan output terjemahan */}
          </div>
        </div>
      </div>
    </>
  );
}