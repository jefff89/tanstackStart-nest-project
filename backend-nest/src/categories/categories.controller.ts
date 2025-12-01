import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category-dto';

import { CategoriesService } from './categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private catergoriesService: CategoriesService) {}
  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.catergoriesService.create(body.name, body.type);
  }

  @Get()
  findAllCategories() {
    return this.catergoriesService.findAll();
  }
}
