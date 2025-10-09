import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/Roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  
  @Get('seeder')
  @HttpCode(201)
  seeder() {
    return this.categoriesService.seeder();
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.categoriesService.getCategories();
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  create(@Body() createCategoryDto: CreateCategoryDto){
    return this.categoriesService.addCategories(createCategoryDto)
  }

}
