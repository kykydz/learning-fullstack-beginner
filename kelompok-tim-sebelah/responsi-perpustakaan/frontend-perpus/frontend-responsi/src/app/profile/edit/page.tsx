// src/app/profil/edit/page.tsx


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/component/DashboardLayout';

export default function EditProfilePage() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const selectedUsername = localStorage.getItem('selectedUsername');

    if (!token || !selectedUsername) {
      router.push('/auth');
      return;
    }

    fetch(`http://localhost:3002/users/${selectedUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setUserId(data.id);
        setUsername(data.username);
        setBio(data.bio || '');
        const date = new Date(data.createdAt || Date.now());
        setJoinDate(
          date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        );
      })
      .catch((err) => {
        console.error('Gagal mengambil data user:', err);
        router.push('/auth');
      });
  }, [router]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:3002/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, bio }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || 'Gagal memperbarui profil.');
        return;
      }

      const updated = await res.json();
      localStorage.setItem('selectedUsername', updated.username); // update username di localStorage
      router.push('/profile');
    } catch (error) {
      console.error('Gagal update:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Edit Profil</h1>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-200">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-200">Bio</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </label>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
