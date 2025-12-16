import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  description: string;

  @Column('float')
  amount: number;

  @Column()
  transactionDate: Date;

  // Foreign key column
  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
