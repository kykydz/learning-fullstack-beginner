'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Data produk tidak valid');
        }

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produk</h1>

      {products.length === 0 ? (
        <p>Tidak ada produk tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
              <h2 className="text-xl">{p.name}</h2>
              <p>Rp {p.price.toLocaleString()}</p>
              <Link
                href={`/dashboard/${encodeURIComponent(p.id)}`}
                className="text-blue-500 underline"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
