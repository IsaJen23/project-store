import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { CreateProveedorDto } from '../dto/proveedor.dto';

@Injectable()
export class ProveedorService{
    constructor(
        @InjectRepository(Proveedor)
        private proveedorRepo: Repository<Proveedor>
    ){}

    async create(createProveedorDto:CreateProveedorDto){
        const proveedor = this.proveedorRepo.create(createProveedorDto);
        await  this.proveedorRepo.save(proveedor);
        return proveedor;
    }
    //Encontrar un registro
    findOne(id: number){
        return this.proveedorRepo.findOne({
            where:{id}
        });
    }
    //mostrar todos los registros
    findAll(){
        return   this.proveedorRepo.find({
            order: {id: 'ASC'},
            relations:{
                autor:true
            }
        });
    }
    //eliminar un registro
    async remove(id:number){
        const proveedor =await this.findOne(id);
        await this.proveedorRepo.remove(proveedor);

    }

    //actualizar un registro
    async update(id: number, cambios: CreateProveedorDto){
        const oldProveedor = await this.findOne(id);
        const updateProveedor = await this.proveedorRepo.merge(oldProveedor, cambios);
        return this.proveedorRepo.save(updateProveedor);
    }
}