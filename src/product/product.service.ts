import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // Create product
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  // Find all products
  async findAll() {
    return await this.productRepo.find();
  }

  // Find one product by id
  async findOne(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // Update product
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepo.save(product);
  }

  // Delete product
  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepo.remove(product);
  }
}
