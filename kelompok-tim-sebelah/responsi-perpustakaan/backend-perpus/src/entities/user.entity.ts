import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pinjam } from './pinjam.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 'user' }) // Bisa 'user' atau 'admin'
  role!: string;

  @OneToMany(() => Pinjam, (pinjam) => pinjam.user)
  peminjaman!: Pinjam[];
}
