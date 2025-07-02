import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './books.entity';

@Entity({ name: 'pinjam' })
export class Pinjam {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'borrow_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  borrowDate!: Date;

  @Column({ name: 'return_date', type: 'timestamp', nullable: true })
  returnDate!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book!: Book;
}
