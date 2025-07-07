// src/app/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }

    // Verifikasi token ke server
    fetch('http://localhost:3002/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Token tidak valid');
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedUsername');
        router.push('/auth');
      });
  }, [router]);

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

