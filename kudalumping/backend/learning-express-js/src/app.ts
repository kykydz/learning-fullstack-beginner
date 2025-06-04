import express from 'express';
import { sequelize } from './database';
import { User } from './models/user';

const app = express();
const port = 3000;

console.log('✅ src/app.ts is running...');

// 1. Middleware parsing JSON
app.use(express.json());

// 2. Logger (harus sebelum route)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // PENTING
});

// 3. Tes route
app.get('/', (_req, res) => {
  res.send('Hello from Express!');
});

// 4. Rute-rute utama
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambahkan user', detail: err });
  }
});

app.get('/users', async (_req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// 5. Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});