import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/category.dto';
@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ){}

    async create(createCategoryDto:CreateCategoryDto){
        const category = this.categoryRepo.create(createCategoryDto);
        await  this.categoryRepo.save(category);
        return category;
    }
    //Encontrar un registro
    findOne(id: number){
        return this.categoryRepo.findOne({
            where:{id},
            relations:{
                autor:true,
            }
        });
    }
    //mostrar todos los registros
    findAll(){
        return   this.categoryRepo.find({
            order: {id: 'ASC'},
            relations:{
                autor:true,
            }
        });
    }
    //eliminar un registro
    async remove(id:number){
        const category =await this.findOne(id);
        await this.categoryRepo.remove(category);

    }

    //actualizar un registro
    async update(id: number, cambios: CreateCategoryDto){
        const oldCategory = await this.findOne(id);
        const updateCategory = await this.categoryRepo.merge(oldCategory, cambios);
        return this.categoryRepo.save(updateCategory);
    }
}