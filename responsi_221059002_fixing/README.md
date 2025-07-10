NAHEES HASAN NOOR
221059002

🐞 Bug & Perbaikan (buggy-server)
Berikut adalah error yang ditemukan dan solusinya:

Error .ts unknown extension
→ Ganti import menjadi require.

Duplikat variabel port
→ Gunakan hanya satu const port per file.

await di luar async
→ Tambahkan async pada handler /async-error.

Infinite loop di /count
→ Ganti while dengan setInterval, dan gunakan count++.

Response tidak ditutup
→ Tambahkan res.end() setelah selesai res.write().

Testing API
→ Gunakan Postman untuk uji PATCH /hello, POST /count, dan POST /async-error.