import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pinjam } from './pinjam.entity';

@Entity({ name: 'books' }) // Sesuai nama tabel di database
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ length: 100 })
  author!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'int', nullable: true })
  year!: number;

  @Column({ default: true })
  available!: boolean;

  @OneToMany(() => Pinjam, (pinjam) => pinjam.book)
  peminjaman!: Pinjam[];
}
