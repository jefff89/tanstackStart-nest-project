import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  transactionDate: Date;

  @ManyToOne(() => Category, (category) => category.transactions, {
    nullable: false, // make FK NOT NULL if you want it required
    onDelete: 'CASCADE', // optional: what happens when category is deleted
  })
  @JoinColumn({ name: 'categoryId' }) // this creates `categoryId` FK column
  category: Category;
}
