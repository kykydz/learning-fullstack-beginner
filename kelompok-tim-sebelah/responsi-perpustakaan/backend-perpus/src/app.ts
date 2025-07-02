// src/app.ts

import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Book } from './entities/books.entity';
import { Pinjam } from './entities/pinjam.entity';

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
  synchronize: true, // Jangan aktifkan ini di production
});

(async () => {
  try {
    await appDataSource.initialize();
    console.log('Database connected');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
