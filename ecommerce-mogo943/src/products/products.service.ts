import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRespository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRespository){}

  async create(createProductDto: CreateProductDto): Promise<number> {
    //validacion de datos del Dto
    const newID: number = await this.productRepository.create(createProductDto);

    return newID;
  }

  async findAll(pages: number, limit: number): Promise<Product[]> {
    const products: Product[] = await this.productRepository.find(pages, limit);

    return products;
  }

  async findOne(id: number): Promise<Product> {
    if(id <= 0) throw new Error(`Invalid id ${id}`);

    const product: Product | undefined = await this.productRepository.findOne(id);

    if(!product) throw new Error(`Product with id ${id} not found`);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<number> {
    //validacion de datos del Dto
    if(id <= 0) throw new Error(`Invalid id ${id}`);

    const updatedID: number | undefined = await this.productRepository.update(id, updateProductDto);

    if(!updatedID) throw new Error(`Product with id ${id} not found`);

    return updatedID;
  }

  async remove(id: number): Promise<number> {
    if(id <= 0) throw new Error(`Invalid id ${id}`)
    
    const deletedID: number | undefined = await this.productRepository.delete(id);

    if(!deletedID) throw new Error (`User with id ${id} not found`)

    return deletedID;
  }
}
