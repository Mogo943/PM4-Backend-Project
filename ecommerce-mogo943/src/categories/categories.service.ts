import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json'
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}
  
  async seeder(){
    const categoryNames: Set<string> = new Set(  
      (data as any).default.map((product) => product.category)
    );

    const categoriesArray: string[] = Array.from(categoryNames);
    const categories = categoriesArray.map((category) => ({
      name: category, 
    }))

    await this.categoryRepository.upsert(categories, ['name'])

    return "Categories added";
  }

  async getCategories(){
    const categories = await this.categoryRepository.find();

    if(!categories) throw new BadRequestException('Not categories cherged');

    return categories;
  }

  async addCategories(createCategoryDto: CreateCategoryDto){
    const foundCategory: Categories | null = await  this.categoryRepository.findOneBy(
      {
        name: createCategoryDto.name
      }
    )
    if(foundCategory) throw new BadRequestException('Category already exists');

    const newCategory: Categories = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(newCategory);
  }
}
