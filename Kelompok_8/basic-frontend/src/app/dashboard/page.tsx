"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string>("");
  const [loadingToken, setLoadingToken] = useState(false);

  // untuk fetch data user hanya ketika sudah ada token
  const [hasToken, setHasToken] = useState(false);

  const generateToken = () => {
    setLoadingToken(true);

    setTimeout(() => {
      const randomToken =
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2);

      setToken(randomToken.toUpperCase());
      setLoadingToken(false);
      setHasToken(true);

      fetchUsers();
    }, 1000);
  };

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: User[] = await res.json();
    setUsers(data);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    alert("Token copied to clipboard!");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r h-screen flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul className="space-y-2 mb-6">
            <li>
              <Link href="/dashboard" className="text-blue-600 underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-blue-600 underline">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Token Section */}
        <div className="mt-6 p-3 bg-white rounded border">
          <p className="text-sm mb-2 font-semibold">API Token</p>

          {!token && (
            <button
              onClick={generateToken}
              disabled={loadingToken}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loadingToken ? "Generating..." : "Get Token"}
            </button>
          )}

          {token && (
            <>
              <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono break-all">
                {token}
              </div>
              <button
                onClick={copyToken}
                className="w-full mt-2 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
              >
                Copy Token
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {!hasToken && (
          <p className="text-gray-600">
            Silakan klik <b>Get Token</b> di sidebar untuk melihat data.
          </p>
        )}

        {hasToken && (
          <table className="w-full border border-gray-300 mt-4">
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
        )}
      </main>
    </div>
  );
}
