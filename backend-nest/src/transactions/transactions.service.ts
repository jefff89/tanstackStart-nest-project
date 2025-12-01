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

  create(createTransactionDto: CreateTransactionDto) {
    // Destructure only the relation fields to map properly
    // const { userId, categoryId, ...rest } = createTransactionDto;

    const transaction = this.repo.create(createTransactionDto);

    return this.repo.save(transaction);
  }
  findAll() {
    return this.repo.find({ relations: ['category', 'user'] });
  }
}
