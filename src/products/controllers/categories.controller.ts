import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/categories.service';


@Controller('category')
export class CategoryController
{
    constructor(private readonly categoryService:CategoryService){}
    @Post()
    async CreateProduct(@Body() createProductDto: CreateCategoryDto){
        return this.categoryService.create(createProductDto);
    }

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.categoryService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.categoryService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()updateCategoryDto :CreateCategoryDto,
        
    )
    {
        return this.categoryService.update(id, updateCategoryDto)
    }
}