import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsString()
  userId: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @Type(() => Date)
  @IsDate()
  transactionDate: Date;

  @IsString()
  categoryId: string;
}
