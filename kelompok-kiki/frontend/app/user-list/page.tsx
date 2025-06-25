'use client';

import { useEffect, useState } from 'react';

export default function UserPage() {
  const [userList, setUserList] = useState<{ name: string; email: string }[]>(
    []
  );

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:3001/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${
              document.cookie.match(/token=([^;]+)/)?.[1]
            }`,
          },
        });
        const data = await res.json();
        setUserList(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUserList([]);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((item) => (
              <tr key={item.name}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
