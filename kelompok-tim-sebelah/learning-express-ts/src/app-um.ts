// import express from 'express';
// import { User } from './entities/user.entity';
// import { DataSource } from 'typeorm';

// const app = express();
// const port = 3000; // Port untuk server Anda

// // Middleware untuk parsing JSON body
// app.use(express.json());

// // Contoh endpoint GET (API)
// app.get('/', (req, res) => {
//  res.send('Halo dari server Express TypeScript!');
// });

// // Contoh endpoint POST (API)
// app.post('/api/data', (req, res) => {
//  const { message } = req.body;
//  if (message) {
//    res.status(200).json({ received: message, status: 'success' });
//  } else {
//    res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
//  }
// });

// // PUT: Update data
// // Endpoint PUT (Update)
// app.patch('/api/data/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedData = req.body;

//     res.status(200).json({
//         nama: 'Affa',
//         nim: '221058017',
//         data: {
//             message: 'Data dengan ID ${id} telah diperbarui.',
//             updated: updatedData
//         }
//     });
// });

// // DELETE: Hapus data
// // Endpoint DELETE
// app.delete('/api/data/:id', (req, res) => {
//     const id = req.params.id;

//     res.status(200).json({
//         nama: 'Affa',
//         nim: '221058017',
//         data: {
//             message: 'Data dengan ID ${id} telah dihapus.'
//         }
//     });
// });

// // Menjalankan server
// app.listen(port, () => {
//  console.log(`Server berjalan di http://localhost:${port}`);
// });

import 'reflect-metadanta';
import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import jwt from 'jsonwebtoken'; //baru

const app = express();
const port = 7777;
const secretKey = 'abc_key_123';//baru

// Middleware untuk parsing JSON body
app.use(bodyParser.json());
app.use(express.json()); //baru

// Inisialisasi PostgreSQL
const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'umar',        // Ganti dengan username PostgreSQL kamu
  password: '1234',            // Ganti jika ada password PostgreSQL
  database: 'expressts',    // Ganti jika pakai nama DB lain
  entities: [User],
  synchronize: true,       // Jangan aktifkan di production
});

(async () => {
  try {
    await appDataSource.initialize();
    console.log('Database connected');

    // === [GET] READ ===
    app.get('/users', async (req, res) => {
      const user = await appDataSource.getRepository(User).find({
        where: { name: 'John Doe' },
        take: 10,
        order: { id: 'ASC' },
      });
      console.log('Fetched users:', user);
      res.status(200).send(user);
    });

    // === [POST] CREATE/UPDATE by ID ===
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
        console.error('Error creating/updating user:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // === [PATCH] UPDATE ONLY ===
    app.patch('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      try {
        const result = await appDataSource
          .getRepository(User)
          .update({ id }, { name, email });

        res.status(200).send(result);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
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

    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
})();
