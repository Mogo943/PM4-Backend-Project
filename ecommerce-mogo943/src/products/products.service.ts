import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json'
import { Categories } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>
  ){}

  async seeder(){
    const categories: Categories[] = await this.categoryRepository.find();

    const newProducts: Products[] = (data as any).default.map((product) => {
      const category: Categories | undefined = categories.find(
        (category) => product.category === category.name,
      )

      const newProduct = new Products()
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.imgUrl = (product as any).imgUrl;
      newProduct.stock = product.stock;
      newProduct.category = category!

      return newProduct;
    })

    await this.productRepository.upsert(newProducts, ['name'])

    return 'products added'
  }

  async create(createProductDto: CreateProductDto){
    const foundProduct: Products | null = await this.productRepository.findOneBy(
      {
        name: createProductDto.name
      }
    )
    if(foundProduct) throw new BadRequestException('Product already exists');

    const newProduct: Products = this.productRepository.create({ ...createProductDto })
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number = 1, limit: number = 2) {
    let products = await this.productRepository.find();
    
    if(!products) throw new BadRequestException('Not products charged')

    const start = (page - 1) * limit;
    const end = page + limit;
  
    return  (products = products.slice(start, end))
  }

  async findOne(id: string) {
    const product: Products | null = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        orderDetails: true,
      }
    })

    if(!product) throw new NotFoundException('Product not found')

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const foundProduct: Products | null = await this.productRepository.findOneBy(
      {
        id
      }
    )
    if(!foundProduct) throw new NotFoundException('Product not found');

    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    const foundProduct: Products | null = await this.productRepository.findOneBy(
      {
        id
      }
    )
    if(!foundProduct) throw new NotFoundException('Product not found');
    
    return await this.productRepository.delete(id);
  }
}
