//modul = https://drive.google.com/file/d/1jrg5Iif4w5atFvavdA-IzrRjx0W-eS_T/view
//Import modul
//affa, joice, umar
import Link from "next/link";

//Tipe Data (User)
type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

//Fungsi Halaman (Dashboard)
export default async function DashboardPage() {
  //Ambil Data dari API
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-sm">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.company.name}</td>
              <td className="border p-2">
                <Link
                  href={`/dashboard/${user.id}`}
                  className="text-blue-600 underline"
                >
                  Lihat Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



// //ini ada useEffect, ga ada bedanya (?)
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   company: {
//     name: string;
//   };
// };

// export default function DashboardPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then((data: User[]) => {
//         setUsers(data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p className="p-8">Loading...</p>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id} className="text-sm">
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">{user.company.name}</td>
//               <td className="border p-2">
//                 <Link href={`/dashboard/${user.id}`} className="text-blue-600 underline">
//                   Lihat Detail
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
