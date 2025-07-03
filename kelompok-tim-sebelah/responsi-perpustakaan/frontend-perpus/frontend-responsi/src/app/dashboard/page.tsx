// src/app/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth'); // redirect ke halaman login
    }
  }, []);

  return (
  <div>
    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
      MAU DIBUAT GIMANA???????????
    </h1>
    <p className="text-gray-700 dark:text-gray-300">
      Silakan pilih menu di sidebar untuk melanjutkan.
    </p>
  </div>
);

}

