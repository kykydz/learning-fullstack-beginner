'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/component/DashboardLayout';

export default function ProfilePage() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const selectedUsername = localStorage.getItem('selectedUsername');

    if (!token || !selectedUsername) {
      router.push('/auth');
      return;
    }

    // Fetch data user dari API
    fetch(`http://localhost:3002/users/${selectedUsername}`)
      .then((res) => res.json())
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedUsername');
    router.push('/');
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3002/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, bio }),
      });

      if (!res.ok) {
        alert('Gagal memperbarui profil.');
        return;
      }

      const updated = await res.json();
      localStorage.setItem('selectedUsername', updated.username);
      setIsEditing(false);
    } catch (error) {
      console.error('Gagal update:', error);
    }
  };

  return (
  <DashboardLayout>
    <div className="flex items-center justify-center overflow-hidden bg-gray-150 dark:bg-gray-950 px-4 py-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${username}&background=random`}
            alt={`Foto Profil ${username}`}
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
          />
          {isEditing ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-2xl font-bold text-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{username}</h2>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-300">Pengguna Terdaftar</p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-100 space-y-2">
          <div>
            <span className="font-semibold">Bio:</span>{' '}
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full mt-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            ) : (
              <span className="whitespace-pre-line">{bio || '—'}</span>
            )}
          </div>
          <p>
            <span className="font-semibold">Tanggal Gabung:</span> {joinDate}
          </p>
        </div>

        {isEditing ? (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Simpan
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded transition"
            >
              Batal
            </button>
          </div>
        ) : (
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Edit Profil
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </DashboardLayout>
);
}
