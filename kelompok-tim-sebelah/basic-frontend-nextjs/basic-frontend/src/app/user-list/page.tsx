// 'use client';

// import { useEffect, useState } from 'react';
// import DashboardLayout from '@/components/templates/DashboardLayout';

// export default function UserPage() {
//   const [userList, setUserList] = useState<{ name: string; email: string }[]>([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await fetch('http://localhost:3005/users', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${
//               document.cookie.match(/token=([^;]+)/)?.[1]
//             }`,
//           },
//         });
//         const data = await res.json();
//         setUserList(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setUserList([]);
//       }
//     }
//     fetchUsers();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">User List</h1>
//         <table className="table-auto w-full border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userList?.length > 0 ? (
//               userList.map((item) => (
//                 <tr key={item.name}>
//                   <td className="border px-4 py-2">{item.name}</td>
//                   <td className="border px-4 py-2">{item.email}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={2} className="text-center p-4">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/templates/DashboardLayout';

interface User {
  name: string;
  email: string;
}

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Ambil username terakhir dari localStorage
    const savedUsername = localStorage.getItem('selectedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Ambil token
    const token = document.cookie.match(/token=([^;]+)/)?.[1];
    if (!token) {
      alert('Unauthorized: Token tidak ditemukan');
      window.location.href = '/auth'; // redirect kalau tidak login
      return;
    }

    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:3005/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          User List {username ? `(${username})` : ''}
        </h1>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 ? (
              userList.map((item) => (
                <tr key={item.name}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center p-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
