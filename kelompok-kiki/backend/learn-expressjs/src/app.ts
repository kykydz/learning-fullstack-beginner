import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from './middleware/auth';

const app = express();
const port = 3001; // Port for your server

const secretKey = 'your_secret_key';

// Middleware for parsing JSON body
app.use(express.json());

// Enable CORS
app.use(cors());

(async () => {
  try {
    // PostgreSQL connection setup
    const appDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kyky',
      password: '',
      database: 'postgres',
      entities: [User],
    });

    // MySQL connection setup
    // const appDataSource = new DataSource({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'my_db',
    //   entities: [User],
    // });

    await appDataSource.initialize();
    console.log('Database connected');

    // Example GET endpoint/api
    app.get('/users', jwtMiddleware, async (req, res) => {
      // Generated raw query: SELECT * FROM user WHERE name = 'John Doe' LIMIT 10 ORDER BY id ASC
      const user = await appDataSource.getRepository(User).find();
      console.log('Fetched users:', user);
      res.status(200).send(user);
    });

    // Example POST
    app.post('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      try {
        const updatedUser = await appDataSource.getRepository(User).save({
          id,
          name,
          email,
        });
        res.status(200).send(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Example PATCH
    app.patch('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      try {
        const updatedUser = await appDataSource
          .getRepository(User)
          .update({ id }, { name, email });

        res.status(200).send(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Example DELETE endpoint/api
    app.delete('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      try {
        await appDataSource.getRepository(User).delete(id);
        res.status(200).send('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Example GET endpoint/api
    app.get('/api', (req, res) => {
      res.send('Hello from the kiki TypeScript server!');
    });

    // Example POST endpoint/api
    app.post('/api/data', (req, res) => {
      const { message } = req.body;
      if (message) {
        res.status(200).json({ received: message, status: 'success' });
      } else {
        res
          .status(400)
          .json({ error: 'Message not found in the request body.' });
      }
    });

    // API to generate JWT token
    app.post('/auth/login', (req: any, res: any) => {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      // Generate a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    });

    // Running the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with failure
  }
})();
