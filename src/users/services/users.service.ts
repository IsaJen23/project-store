import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    async create(createUserDto:CreateUserDto){
        const user = this.userRepo.create(createUserDto);
        await  this.userRepo.save(user);
        return user;
    }
    //Encontrar un user
    findOne(id: number){
        return this.userRepo.findOneBy({id})
    }
    //mostrar todos los usuarios
    findAll(){
        return   this.userRepo.find({
            order: {id: 'ASC'},
        });
    }
    //eliminar un usuario
    async remove(id:number){
        const user =await this.findOne(id);
        await this.userRepo.remove(user);
        return 'Usuario eliminado';
    }

    //actualizar un usuario
    async update(id: number, cambios: CreateUserDto){
        const oldUser = await this.findOne(id);
        const updateUser = await this.userRepo.merge(oldUser, cambios);
        return this.userRepo.save(updateUser);
    }
}