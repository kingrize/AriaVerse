// src/pages/chat.js (Redesign Sesuai Tema iOS Modern)

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'; // Menggunakan Navbar bersama

export default function ChatPage() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Pesan sambutan awal dari Aria (opsional, hanya di frontend)
  useEffect(() => {
    setChatHistory([
      { role: 'model', text: "Halo lagi, Master! (≧◡≦) Senang bertemu lagi di ruang chat pribadiku! Ada yang bisa Aria bantu atau ingin Master ceritakan?" }
    ]);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const currentMessage = userInput;
    const newHumanMessage = { role: 'user', text: currentMessage };

    setChatHistory(prev => [...prev, newHumanMessage]);
    setUserInput('');
    setIsLoading(true);

    const apiHistoryPayload = chatHistory
      .filter(msg => msg.role === 'user' || (msg.role === 'model' && msg.text !== "Halo lagi, Master! (≧◡≦) Senang bertemu lagi di ruang chat pribadiku! Ada yang bisa Aria bantu atau ingin Master ceritakan?"))
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
    
    try {
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMessage, history: apiHistoryPayload }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Aduh, Master! Aria gagal merespons saat ini (｡•́︿•̀｡)';
        setChatHistory(prev => [...prev, { role: 'model', text: errorMessage }]);
        return;
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', text: data.reply }]);

    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching AI reply:', error);
      setChatHistory(prev => [...prev, { role: 'model', text: `Waduh, Master, ada error teknis nih: ${error.message} (〒﹏〒)` }]);
    }
  };

  return (
    <>
      <Head>
        <title>Chat dengan Aria | AriaSpace</title>
        <meta name="description" content="Ngobrol langsung dengan Aria, AI assistant pribadimu." />
      </Head>

      <Navbar /> {/* Menggunakan Navbar yang sama */}

      {/* Latar belakang utama & padding untuk navbar fixed */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 pt-20 pb-4 px-4 transition-colors duration-500">
        
        {/* Kartu Chat Utama */}
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-3xl w-full max-w-2xl flex flex-col h-[calc(100vh-7rem)] sm:h-[calc(100vh-8rem)]"> {/* Tinggi disesuaikan */}
          
          {/* Header Chat */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-xl sm:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-500">
              Ngobrol Seru sama Aria (⁄ ⁄•⁄ω⁄•⁄ ⁄)
            </h1>
          </div>

          {/* Jendela Chat */}
          <div ref={chatWindowRef} className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto bg-slate-50 dark:bg-slate-800/30">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] sm:max-w-[70%] p-3 rounded-xl shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-br-none' // Gaya pesan pengguna
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none' // Gaya pesan Aria
                  }`}
                >
                  <p className="text-sm sm:text-base whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center py-2">
                <div className="p-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm animate-pulse">
                  Aria lagi mikir bentar ya, Master... (づ｡◕‿‿◕｡)づ
                </div>
              </div>
            )}
          </div>

          {/* Form Input Pesan */}
          <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ketik pesan untuk Aria..."
                disabled={isLoading}
                className="flex-grow p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 focus:border-transparent outline-none transition-shadow text-sm sm:text-base"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="M3.105 3.105a1.5 1.5 0 012.122-.001L19.43 17.312a1.5 1.5 0 01-2.122 2.122L3.105 5.227a1.5 1.5 0 01-.001-2.122zM3.105 16.895a1.5 1.5 0 002.122.001L19.43 2.688a1.5 1.5 0 00-2.122-2.122L3.105 14.773a1.5 1.5 0 00.001 2.122z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}