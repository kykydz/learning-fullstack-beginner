import express, { Request, Response } from 'express';

const app = express();
const PORT = 4013;

app.use(express.json());

let counter = 0;

app.get('/', (req: Request, res: Response) => {
  res.send('Halo dari Bayu - 221054013');
});

app.patch('/counter', (req: Request, res: Response) => {
  const { nilai } = req.body;

  if (typeof nilai !== 'number') {
    return res.status(400).json({ error: 'Request body harus berisi "nilai" bertipe number' });
  }

  counter += nilai;
  res.json({ total: counter });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
