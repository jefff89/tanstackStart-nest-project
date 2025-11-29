import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from 'src/transactions/transaction.entity';
export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text', // SQLite: store enum as TEXT
    enum: CategoryType, // TS-level enum type safety
    default: CategoryType.INCOME,
  })
  type: CategoryType;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[]; // One to Many relation with transactions table
}
