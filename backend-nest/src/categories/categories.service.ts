import { Injectable } from '@nestjs/common';
import { Category, CategoryType } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(name: string, type: CategoryType) {
    const newCategory = this.repo.create({ name, type });
    return this.repo.save(newCategory);
  }
  findAll() {
    return this.repo.find();
  }
}
