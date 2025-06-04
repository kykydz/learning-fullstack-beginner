// src/models/user.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});