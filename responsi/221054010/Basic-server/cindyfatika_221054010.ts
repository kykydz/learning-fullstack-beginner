import express from 'express';

const app = express();
app.use(express.json()); // biar bisa baca JSON

const PORT = 4010;

let counter = 0; // nilai awal counter

app.get('/', (_req, res) => {
  res.send(`Halo! Ini server Cindy Fatika (NIM: 221054010) berjalan di port ${PORT}`);
});

// PATCH /counter
app.patch('/counter', (req, res) => {
  const { increment } = req.body;

  if (typeof increment !== 'number') {
    return res.status(400).json({ message: 'Body harus berisi angka pada field increment' });
  }

  counter += increment;

  res.json({
    message: 'Counter berhasil ditambahkan',
    counter: counter
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
