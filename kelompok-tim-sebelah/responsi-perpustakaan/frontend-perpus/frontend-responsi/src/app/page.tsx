'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-8 py-12 text-gray-800 dark:text-gray-100 font-sans">
      <main className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <Image
          src="/png-book-logo.png"
          alt="Library Logo"
          width={100}
          height={100}
          className="mb-4 dark:invert"
        />
        <h1 className="text-4xl font-bold mb-2">Selamat Datang di Sistem Perpustakaan</h1>
        <p className="text-lg mb-6">Aplikasi ini dibuat sebagai bagian dari Responsi Praktikum Rekayasa Web</p>

        <div className="w-full mt-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Kelompok Tim Sebelah</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            <li>
              <span className="font-medium">Affa Hurrarul Arayadiba</span> – 221058017
            </li>
            <li>
              <span className="font-medium">Siraj Abdul Aziz Umar</span> – 221054026
            </li>
            <li>
              <span className="font-medium">Joice Lumban Tobing</span> – 221051023
            </li>
          </ul>
        </div>

        <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Responsi Praktikum Rekayasa Web {' '}
        </footer>
        <div className="mt-4"> {/* Tambah jarak atas */}
          {/* Tombol Login */}
          <a
            href="http://localhost:3001/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-lg hover:bg-blue-700 transition mb-8"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
