import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from './middleware/auth';

const app = express();
const port = 3000;
const secretKey = 'abc_key_789'

app.use(express.json());

(async () => {
  try {
    const appDataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'PRAKREKWEB',
      entities: [User],
    });

    await appDataSource.initialize();
    console.log('Database connected');

    // ✅ Semua route di dalam sini
    app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
    })

    app.get('/users', jwtMiddleware, async (req: Request, res: Response) => {
      const users = await appDataSource.getRepository(User).find();
      res.status(200).json(users);
    });

    app.post('/users', async (req: Request, res: Response) => {
      const { name, email } = req.body;
      const newUser = await appDataSource.getRepository(User).save({ name, email });
      res.status(201).json(newUser);
    });

    app.patch('/users/:id', async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      const updated = await appDataSource.getRepository(User).update({ id }, { name, email });
      res.status(200).json(updated);
    });

    app.post('/auth/login', (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
});


    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
})();
