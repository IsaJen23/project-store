import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from "../dto/product.dto";

@Controller('products')
export class ProductController
{
    constructor(private readonly productsService:ProductsService){}
    @Post()
    async CreateProduct(@Body() createProductDto: CreateProductDto){
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.productsService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.productsService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createProductDto :CreateProductDto,
        
    )
    {
        return this.productsService.update(id, createProductDto)
    }
}