import { BadRequestException, Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService
  ){}


  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto
      });
    } catch (error) {
      
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        // Código 409
        if(error.code === 'P2002'){
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`);
        }
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.prismaService.product.findMany()
  }

  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: {
        id
      }
    });

    if(!productFound) throw new NotFoundException(`Product with id ${id} not found`);
    
    return productFound;
  }
  // Se usará la excepción que prisma lanza
  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
    if(!updateProduct){
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updateProduct;
  }

  async remove(id: number) {
    const deleteProduct = await this.prismaService.product.delete({
      where: { id },
    });

    if (deleteProduct){
      throw new BadRequestException(`Product with id ${id} not found`)
    }
    return
  }
}
