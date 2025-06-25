// 'use client';

// import { useEffect, useState } from 'react';
// import DashboardLayout from '@/components/templates/DashboardLayout';

// export default function AuthPage() {
//   const [token, setToken] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const login = async () => {
//       try {
//         const response = await fetch('http://localhost:3005/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: 'affa', //ganti ke username masing2
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data?.error || 'Login failed');
//         }

//         setToken(data.token);

//         if (data.token) {
//           // Simpan token di cookie (opsional)
//           document.cookie = `token=${data.token}; path=/`;
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setToken('Error fetching token');
//       }
//     };

//     login();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="p-6 text-gray-800 dark:text-gray-100">
//         <h1 className="text-2xl font-bold mb-6">Get Token</h1>

//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-4xl">
//           {token ? (
//             <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 w-full">
//               <p className="font-medium mb-2">Your Token:</p>
//               <pre className="text-sm whitespace-pre-wrap break-words w-full">
//                 {token}
//               </pre>
//             </div>
//           ) : (
//             <p className="text-gray-600 dark:text-gray-300">Loading token...</p>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }


// ========== 3 USERNAME LANGSUNG BISA AKSES ==========
'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/templates/DashboardLayout';

export default function AuthPage() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string>('affa'); // default (ga perlu ganti)

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3005/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data?.error || 'Login failed');

        setToken(data.token);
        document.cookie = `token=${data.token}; path=/`;
      } catch (error) {
        console.error('Login error:', error);
        setToken('Error fetching token');
      }
    };

    login();
  }, [username]);

  return (
    <DashboardLayout>
      <div className="p-6 text-gray-800 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-6">Get Token</h1>

        <select
          className="mb-4 p-2 border rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          <option value="affa">Affa</option>
          <option value="joice">Joice</option>
          <option value="umar">Umar</option>
        </select>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-4xl">
          {token ? (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 w-full">
              <p className="font-medium mb-2">Your Token:</p>
              <pre className="text-sm whitespace-pre-wrap break-words w-full">
                {token}
              </pre>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Loading token...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
