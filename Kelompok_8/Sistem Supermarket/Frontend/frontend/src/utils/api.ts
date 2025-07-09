//fungsi-fungsi utilitas untuk memanggil endpoint backend dari frontend.

const BASE_URL = 'http://localhost:3000';

//Melakukan request ke endpoint /products.
//Menyertakan JWT token di header (Authorization).
//Mengembalikan response JSON (daftar produk).
export const fetchProducts = async (token: string) => { //Ambil semua produk
  const res = await fetch(`${BASE_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//Melakukan request ke endpoint /cart.
//Menyertakan JWT token di header.
//Mengembalikan response JSON (isi keranjang user).
export const fetchCart = async (token: string) => { //Ambil isi keranjang
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
