// src/app.ts

import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Book } from './entities/books.entity';
import { Pinjam } from './entities/pinjam.entity';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from './middleware/auth';

const app = express();
const port = 3002;

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'affa',
  password: 'affa',
  database: 'res_rekweb_perpus',
  entities: [User, Book, Pinjam],
  synchronize: true,
});

app.use(cors());
app.use(express.json()); // Agar bisa baca req.body

// === START SERVER ===
(async () => {
  try {
    await appDataSource.initialize();
    console.log('Database connected');

    // === REGISTER ===
    app.post('/auth/register', async (req: any, res: any) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ error: 'Username dan password wajib diisi.' });
        }

        const userRepo = appDataSource.getRepository(User); //mengambil repository object dari TypeORM

        const existingUser = await userRepo.findOne({ where: { username } });
        //await digunakan krn melakukan query ke database, jd nunggu waktu untuk hasil dari databasenya
        if (existingUser) {
          return res.status(409).json({ error: 'Username sudah terdaftar.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hash password agar tidak disimpan dalam bentuk asli di database
        //await -> proses hashing memakan waktu, jadi harus nunggu selesai sebelum lanjut
        const newUser = userRepo.create({ username, password: hashedPassword });
        await userRepo.save(newUser);
        //await -> proses simpen user baru ke db. harus nunggu proses simpan selesai dulu biar bisa lanjut atau nangkep error
        return res.status(201).json({ message: 'Registrasi berhasil.' });
      } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).json({ error: 'Terjadi kesalahan server.' });
      }
    });


    // === LOGIN ===
    app.post('/auth/login', async (req: any, res: any) => {
      const { username, password } = req.body;
      const userRepo = appDataSource.getRepository(User);

      const user = await userRepo.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'User tidak ditemukan.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Username atau Password salah.' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        'abc_key_123',
        { expiresIn: '1m' }
      );

      res.json({ token });
    });

    // /auth/verify (di backend, pakai jwtMiddleware)
    app.get('/auth/verify', jwtMiddleware, (req, res) => {
      res.json({ valid: true });
    });

    // === GET ALL USERS ===
    app.get('/users', async (req: any, res: any) => {
      try {
        const userRepo = appDataSource.getRepository(User);
        const users = await userRepo.find({
          select: ['id', 'username', 'role'],
          order: { id: 'ASC' },
        });
        return res.status(200).json(users); //klo berhasil, kirim semua user
      } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Gagal mengambil data users.' });
      }
    });

    // GET user berdasarkan username
    app.get('/users/:username', jwtMiddleware, async (req: any, res: any) => {
      try {
        const userRepo = appDataSource.getRepository(User);
        const user = await userRepo.findOne({
          where: { username: req.params.username }, //cari user berdasarkan username dari parameter URL
          //contoh: http://localhost:3002/users/affa
        });

        if (!user) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        return res.json(user); //jika ketemu, kirim user
      } catch (error) {
        console.error('Error mengambil user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });


    //update user sesuai id
    app.patch('/users/:id', jwtMiddleware, async (req: any, res: any) => {
      const { id } = req.params;
      const { username, bio } = req.body;

      try {
        const userRepo = appDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: parseInt(id) });

        if (!user) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        //cek apakah username baru sudah digunakan user lain
        if (username && username !== user.username) {
          const existing = await userRepo.findOneBy({ username });
          if (existing) {
            return res.status(409).json({ message: 'Username sudah digunakan' });
          }
          user.username = username;
        }

        if (bio !== undefined) {
          user.bio = bio;
        }

        const updatedUser = await userRepo.save(user);
        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Gagal update user:', error);
        return res.status(500).json({ error: 'Gagal memperbarui user.' });
      }
    });


    //server jalan
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
