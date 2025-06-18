"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [pokemonList, setPokemonList] =  useState<{ name: string; url: string }[]>([]);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => res.json())
      .then(data => setPokemonList(data.results));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">URL</th>
            <th className="border px-4 py-2">Abilities</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((item) => (
            <tr key={item.name}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.url}</td>
              <td className="border px-4 py-2">
                <Link href={`/dashboard/items?url=${item.url}`} className="text-blue-500">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}