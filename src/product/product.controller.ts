import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import type { CreateProductDto } from 'src/common/dto/create-product.dto';
import type { UpdateProductDto } from 'src/common/dto/update-product.dto';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    try {
      return await this.productService.create(body);
    } catch (err) {
      console.log('Error creating product:', err.message);
      return { message: 'Failed to create product' };
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (err) {
      console.log('Error fetching products:', err.message);
      return { message: 'Failed to fetch products' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (err) {
      console.log('Error fetching product:', err.message);
      return { message: 'Product not found' };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      return await this.productService.update(id, body);
    } catch (err) {
      console.log('Error updating product:', err.message);
      return { message: 'Failed to update product' };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(id);
    } catch (err) {
      console.log('Error deleting product:', err.message);
      return { message: 'Failed to delete product' };
    }
  }
}
