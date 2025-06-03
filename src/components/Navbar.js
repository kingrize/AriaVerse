// src/components/Navbar.js
import Link from 'next/link';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'; // Import ikon

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg z-50 transition-colors duration-300"> {/* Sedikit penyesuaian pada transparansi dan shadow navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-80 transition-opacity">
              AriaSpace
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-1 md:space-x-2 lg:space-x-4"> {/* Mengurangi space-x sedikit jika terlalu lebar */}
            <Link href="/#tentang-aria" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Tentang
            </Link>
            <Link href="/#fitur-aria" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Fitur
            </Link>
            <Link href="/calculator" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Kalkulator
            </Link>
            <Link href="/translate" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Terjemahan
            </Link>
            <Link
              href="/chat"
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 hover:shadow-[0_0_20px_theme(colors.purple.500)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" /> {/* Tambahkan ikon di sini */}
              <span>Chat Aria</span>
            </Link>
          </div>
          {/* Mobile menu button (untuk layar kecil) */}
          <div className="sm:hidden">
            {/* Tambahkan tombol hamburger menu di sini jika diinginkan nanti */}
            <Link href="/chat" className="text-pink-500 dark:text-pink-400 p-2">
                <ChatBubbleLeftEllipsisIcon className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}