import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
 @PrimaryGeneratedColumn()
 id!: number;

 @Column({ type: 'varchar' })
 name!: string;

 @Column()
 email!: string;
}
