import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaDto } from '../dto/marca.dto';
import { Marca } from '../entities/marca.entity';
import { Modelo } from '../entities/modelo.entity';
import { CreateModeloDto } from '../dto/modelo.dto';

@Injectable()
export class ModelosService{
    constructor(
        @InjectRepository(Modelo)
        private modeloRepo: Repository<Modelo>
    ){}

    async create(createModeloDto:CreateModeloDto){
        const modelo = this.modeloRepo.create(createModeloDto);
        await  this.modeloRepo.save(modelo);
        return modelo;
    }

    //Encontrar un modelo
    // findOne(id: number){
    //     return this.modeloRepo.findOneBy({id})
    // }

    findOne(id: number){
         return this.modeloRepo.findOne({
             where: {id},
             relations: {
                marca: true,
                autor: true,
             }
        
         });
    }
    //mostrar todas los modelos
    findAll(){
        return   this.modeloRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar una marca
    async remove(id:number){
        const modelo =await this.findOne(id);
        await this.modeloRepo.remove(modelo);
        return 'modelo eliminado';
    }

    //actualizar un modelo
    async update(id: number, cambios: CreateModeloDto){
        const oldModelo = await this.findOne(id);
        const updateModelo = await this.modeloRepo.merge(oldModelo, cambios);
        return this.modeloRepo.save(updateModelo);
    }
}