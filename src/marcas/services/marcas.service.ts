import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaDto } from '../dto/marca.dto';
import { Marca } from '../entities/marca.entity';

@Injectable()
export class MarcasService{
    constructor(
        @InjectRepository(Marca)
        private marcaRepo: Repository<Marca>
    ){}

    async create(createMarcaDto:CreateMarcaDto){
        const marca = this.marcaRepo.create(createMarcaDto);
        await  this.marcaRepo.save(marca);
        return marca;
    }

    //Encontrar una marca
    findOne(id: number){
        return this.marcaRepo.findOneBy({id})
    }
    //mostrar todas las marcas
    findAll(){
        return   this.marcaRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar una marca
    async remove(id:number){
        const marca =await this.findOne(id);
        await this.marcaRepo.remove(marca);
        return 'Marca eliminada';
    }

    //actualizar una marca
    async update(id: number, cambios: CreateMarcaDto){
        const oldMarca = await this.findOne(id);
        const updateMarca = await this.marcaRepo.merge(oldMarca, cambios);
        return this.marcaRepo.save(updateMarca);
    }
}