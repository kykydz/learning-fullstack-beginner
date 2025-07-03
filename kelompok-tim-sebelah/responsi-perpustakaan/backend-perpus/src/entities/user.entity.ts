import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pinjam } from './pinjam.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ default: 'user' })
  role!: string;

  @OneToMany(() => Pinjam, (pinjam) => pinjam.user)
  peminjaman!: Pinjam[];
}