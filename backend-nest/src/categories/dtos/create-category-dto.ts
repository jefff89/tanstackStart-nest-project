import { IsString, IsEnum } from 'class-validator';
import { CategoryType } from '../category.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;
}
