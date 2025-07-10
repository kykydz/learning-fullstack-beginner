import express from 'express';

const app = express();
const PORT = 4013;

app.get('/', (req, res) => {
  res.send('Halo, saya Bayu (221054013)!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
