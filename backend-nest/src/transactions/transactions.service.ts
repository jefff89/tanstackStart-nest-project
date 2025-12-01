import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction-dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    // Destructure only the relation fields to map properly
    const { userId, categoryId, ...rest } = createTransactionDto;

    const transaction = this.repo.create({
      ...rest, // description, amount, transactionDate
      userId,
      categoryId,
    });

    return this.repo.save(transaction);
  }
}
