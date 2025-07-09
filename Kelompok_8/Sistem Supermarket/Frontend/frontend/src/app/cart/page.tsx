'use client';

import { useEffect, useState } from 'react';

type CartItem = {
  id: number;
  quantity: number;
  product: { id: number; name: string; price: number; };
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      // app/cart/page.tsx
        const res = await fetch("http://localhost:3001/cart", {
        headers: { Authorization: `Bearer ${token}` },

      });
      const data = await res.json();
      setCart(data);
      setLoading(false);
    };
    fetchCart();
  }, []);

  if (loading) return <p>Loading...</p>;

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
      {cart.map(item => (
        <div key={item.id} className="border p-4 rounded shadow">
          <h2>{item.product.name}</h2>
          <p>Harga: Rp {item.product.price}</p>
          <p>Jumlah: {item.quantity}</p>
        </div>
      ))}
      <p className="font-bold">Total: Rp {total}</p>
    </div>
  );
}
