import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // Ganti sesuai PostgreSQL kamu
  password: '',         // Ganti password PostgreSQL
  database: 'my_db',    // Ganti nama database kamu
  entities: [User],
  synchronize: true,    // Auto-create table (development only)
});
