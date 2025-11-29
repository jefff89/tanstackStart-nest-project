import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])], // Connect the entity to its parent module. And creates the repository
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
