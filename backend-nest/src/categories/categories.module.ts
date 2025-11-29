import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Connect the entity to its parent module. And creates the repository

  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
