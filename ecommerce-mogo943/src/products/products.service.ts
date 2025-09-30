import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>
  ){}

  async create(createProductDto: CreateProductDto){
    return await this.productRepository.create(createProductDto);
  }

  async findAll(page: number = 1, limit: number = 2) {
    let products = await this.productRepository.find();
    
    const start = (page - 1) * limit;
    const end = page + limit;
  
    return  (products = products.slice(start, end))
  }

  async findOne(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productRepository.delete(id);
  }
}
