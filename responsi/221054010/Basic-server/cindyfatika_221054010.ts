import express from 'express';

const app = express();
const PORT = 4010;

app.get('/', (_req, res) => {
  res.send('Halo! Ini server Cindy Fatika (NIM: 221054010) berjalan di port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});