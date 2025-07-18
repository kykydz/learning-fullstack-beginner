import express from 'express';
import { DataSource } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

const secretKey = 'abc_key_123';

const app = express();
const port = 3000;

app.use(express.json());

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cindy',
  password: 'cindy',
  database: 'learning_expres_cindy',
  entities: [User, Post],
  synchronize: true,
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    app.get('/', (req, res) => {
      res.send('Halo dari server Express TypeScript!');
    });

    // Login & JWT
    app.post('/auth/login', (req : any, res : any) => {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    });

    // USERS APIs
    app.get('/users', async (req, res) => {
      try {
        const users = await AppDataSource.getRepository(User).find({
          where: { name: 'John Doe' },
          take: 10,
          order: { id: 'ASC' },
        });
        res.status(200).json(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users.' });
      }
    });

    app.post('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      try {
        const updatedUser = await AppDataSource.getRepository(User).save({
          id,
          name,
          email,
        });
        res.status(200).send(updatedUser);
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.patch('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      try {
        const result = await AppDataSource.getRepository(User).update(
          { id },
          { name, email }
        );
        res.status(200).send(result);
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/users/:id', async (req : any, res : any) => {
      const id = Number(req.params.id);
      try {
        const user = await AppDataSource.getRepository(User).findOneBy({ id });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    });

    app.delete('/users/:id', async (req : any, res : any) => {
      const id = Number(req.params.id);
      try {
        const result = await AppDataSource.getRepository(User).delete({ id });
        if (result.affected === 0) {
          return res.status(404).json({ error: 'User not found or already deleted' });
        }
        res.status(200).json({ message: `User with id ${id} deleted successfully` });
      } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
      }
    });

    // API lama
    app.post('/api/data', (req, res) => {
      const { message } = req.body;
      if (message) {
        res.status(200).json({ received: message, status: 'success' });
      } else {
        res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
      }
    });

    app.patch('/api/data/:id', (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;

      res.status(200).json({
        nama: 'Cindy',
        nim: '221054010',
        data: {
          message: `Data dengan ID ${id} telah diperbarui.`,
          updated: updatedData,
        },
      });
    });

    app.delete('/api/data/:id', (req, res) => {
      const id = req.params.id;

      res.status(200).json({
        nama: 'Cindy',
        nim: '221054010',
        data: {
          message: `Data dengan ID ${id} telah dihapus.`,
        },
      });
    });

    // 🔷 POSTS APIs
    app.get('/posts', async (req, res) => {
      try {
        const posts = await AppDataSource.getRepository(Post).find();
        res.status(200).json(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Failed to fetch posts' });
      }
    });

    app.post('/posts', async (req : any, res : any) => {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      try {
        const postRepository = AppDataSource.getRepository(Post);
        const newPost = postRepository.create({ title, content });
        const savedPost = await postRepository.save(newPost);
        res.status(201).json(savedPost);
      } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
      }
    });

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
})();
