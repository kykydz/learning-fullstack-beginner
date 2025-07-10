import express from 'express';

const app = express();
const port = 8017; 

app.use(express.json());

let counter = 0;

//GET
app.get('/', (req, res) => {
  res.send('Halo dari server Express TypeScript!');
});

//PATCH
app.patch('/counter', (req, res) => {
  const { value } = req.body;

  if (typeof value !== 'number') {
    return res.status(400).json({ error: 'Value harus berupa angka' });
  }

  counter += value;

  res.json({ counter });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
