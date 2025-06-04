// src/database.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('mahasiswa', 'root', 'informatika2254_', {
  host: 'localhost',
  dialect: 'mysql',
});
