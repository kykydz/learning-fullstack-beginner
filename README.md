Affa Hurrarul Arayadiba - 221058017

Tulis bug/error/hal apa saja yang perlu diperbaiki di step sebelumnya agar server dapat dijalankan pada README.md yang dibuat sebelumnya

1. bagian app.use(express.json()); di komen, jadinya ga akan bisa read json, harusnya ga komen.
2. endpoind /count menggunakan while tanpa ada count++, bakal ngulang terus infinity loop. jadi harus pakai count++ dan tambah fungsi setInterval() agar bisa kirim data bertahap, diubah juga logika while jadi -> count>=10 maka dia akan berhenti.
3. di bagian endpoin hello error di  res.status(200).send(new Error(req.body.error));
4. error di console.log(`Server running on http://localhost:3306`);, harusnya console.log(`Server berjalan di http://localhost:${port}`);
5. ini ga kepake -> import routes from "./routes";
6. yang /async-error tidak tau benar yang mana, apakah hanya mengilangkan 'await' maka di postman menjadi 200 hijau atau menggunakan try catch sehingga hasil yang dikeluarkan respon adalah 500, yaitu "Terjadi error async: Oops!", tapi yang dipakai di responsi ini adalah yang try catch.
7. 