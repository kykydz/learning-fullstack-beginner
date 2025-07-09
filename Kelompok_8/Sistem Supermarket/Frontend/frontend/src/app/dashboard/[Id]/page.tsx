'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const id = Number(params.id);

      if (!params.id || isNaN(id)) {
        setError('ID produk tidak valid');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError('Token tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (res.ok) {
        alert('Produk berhasil ditambahkan ke keranjang!');
      } else {
        alert('Gagal menambahkan ke keranjang');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Terjadi kesalahan');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-4">Produk tidak ditemukan</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">Rp {product.price.toLocaleString()}</p>
      <p className="mt-2">{product.description}</p>
      <button 
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
