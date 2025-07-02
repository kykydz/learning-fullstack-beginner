import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
const secretKey = 'abc_key_789'

app.use(express.json());

(async () => {
  try {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [User],
    });

    await appDataSource.initialize();
    console.log('Database connected');

    // ✅ Semua route di dalam sini
    app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
    })

    app.get('/users', async (req: Request, res: Response) => {
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

    app.post('/auth/login', (req: any, res: any) => {
     const { username } = req.body;

     if (!username) {
       return res.status(400).json({ error: 'Username is required' });
     }

     // Generate a JWT token
     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
     res.status(200).json({ token });
   });

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${3000}`);
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
})(); // << Pastikan ini ada!
