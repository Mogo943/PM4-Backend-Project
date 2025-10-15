import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/Roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Get('seeder')
  @HttpCode(201)
  seeder(){
    return this.productsService.seeder()
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  findAll( @Query('page') page?: string, @Query('limit') limit?: string ) {
    if(page && limit){
      return this.productsService.findAll(+page, +limit);
    }
    return this.productsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.remove(id);
  }
}
