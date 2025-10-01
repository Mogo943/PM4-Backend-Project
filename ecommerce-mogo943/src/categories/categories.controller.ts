import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/auth/guards/Auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(201)
  @Get('seeder')
  seeder() {
    return this.categoriesService.seeder();
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto){
    return this.categoriesService.addCategories(createCategoryDto)
  }

}
