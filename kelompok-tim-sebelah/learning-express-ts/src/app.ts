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

import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import jwt from 'jsonwebtoken'; //baru

const app = express();
const port = 3000;
const secretKey = 'abc_key_123';//baru

// Middleware
app.use(bodyParser.json());
app.use(express.json()); //baru

// Inisialisasi PostgreSQL
const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'affa',
  password: 'affa',
  database: 'express_ts',
  entities: [User],
  synchronize: true, // Jangan aktifkan ini di production
});

(async () => {
  try {
    await appDataSource.initialize();
    console.log('Database connected');

    // === [GET] Ambil user dengan nama depan "Affa" ===
    app.get('/users/ambil', async (req, res) => {
      console.log("QUERY => SELECT * FROM users WHERE name ILIKE 'Affa%' ORDER BY id ASC");

      try {
        const users = await appDataSource
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.name ILIKE :namePrefix', { namePrefix: 'Affa%' })
          .orderBy('user.id', 'ASC')
          .getMany();

        res.status(200).send(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // === [GET] Ambil user by ID ===
    app.get('/users/:id', async (req, res) => {
      const id = Number(req.params.id);

      try {
        const user = await appDataSource.getRepository(User).findOneBy({ id });
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // === [GET] Ambil semua user ===
    app.get('/users', async (req, res) => {
      try {
        const users = await appDataSource.getRepository(User).find({
          order: { id: 'ASC' },
        });
        res.status(200).send(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // === [POST] Buat user by ID ===
    // kodinglah di postman untuk tambah data (body->row->json)
    // kodingan: {"name": "Affa Hurrarul", "email": "affa@example.com"} disesuaikan dengan entitas di tabel
    // cek entitas/kolomnya: (1) file src/entities/user.entity.ts
    // (2) bisa dari cmd, buka database dari postgres yang udah dibuat: login postgres -> \c namadb -> \dt -> select * from users
    app.post('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).send({ message: 'Name and email are required.' });
      }

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

    // === [PATCH] Update sebagian data user ===
    // kodinglah di postman untuk update spesifik user (body->row->json)
    // kodingan: {"name": "Affa Ava"} apa yang mau diupdate, bisa nama aja or sama email juga
    // hasil ini akan muncul ketika semua tabel (/users) di tampilkan atau hanya ID tersebut yang dicari
    // muncul di url localhost:3000/user/1 -> id usernya sesuai dengan nomor berapa yang barusan diupdate
    app.patch('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;

      if (!name && !email) {
        res.status(400).send({
          message: 'At least one field (name or email) must be provided.',
        });
      }

      try {
        const result = await appDataSource.getRepository(User).update({ id }, { name, email });

        if (result.affected === 1) {
          const updatedUser = await appDataSource.getRepository(User).findOneBy({ id });
          res.status(200).send(updatedUser);
        } else {
          res.status(404).send({ message: 'User not found' });
        }
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


    // === Start Server ===
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
})();
