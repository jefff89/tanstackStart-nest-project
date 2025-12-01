import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction-dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private tranactionService: TransactionsService) {}

  @Post()
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.tranactionService.create(body);
  }
}
