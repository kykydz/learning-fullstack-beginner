'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 1. Login untuk dapatkan token
        const loginRes = await fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'moran' }),
        });

        if (!loginRes.ok) {
          throw new Error('Gagal login');
        }

        const loginData = await loginRes.json();
        const token = loginData.token;

        // 2. Fetch data user pakai token
        const userRes = await fetch('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) {
          throw new Error('Gagal mengambil data user');
        }

        const userData = await userRes.json();
        setUsers(userData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Terjadi kesalahan');
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar User</h1>

      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-2 rounded">
              <p><strong>Nama:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </main>
  );
}
