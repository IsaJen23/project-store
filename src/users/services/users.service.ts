import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { UserImage } from '../entities/user-image.entity';

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(UserImage)
        private readonly userImageRepo: Repository<UserImage>,

        private readonly dataSource: DataSource,
    ){}

    async create(userDto:CreateUserDto){
        const { images = [], ...detailsUser} = userDto;

        const user = await this.userRepo.create({
            ...detailsUser,
            images: images.map((image) => this.userImageRepo.create({ url: image }),
            ),
        });
        await  this.userRepo.save(user);
        return user;
    }
    //Encontrar 
    findOne(id: number){
        return this.userRepo.findOne({
            where: {id},
            relations: {
                images: true,
            },
        });
    }
    //mostrar 
    findAll(){
        return   this.userRepo.find({
            order: {id: 'ASC'},
            relations: {
                images: true,
            },
        });
    }
    //eliminar 
    async remove(id:number){
        const user =await this.findOne(id);
        await this.userRepo.remove(user);
        return 'Usuario eliminado';
    }

    //actualizar un usuario-imagenes
    async update(id: number, cambios: CreateUserDto){
        const {images, ...updateAll } = cambios;
        const user = await this.userRepo.preload({
            id: id,
            //operador para esparcir
            ...updateAll,     //Esparcir todos los datos 
            

        
        });
        //correr el queryRunner

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images) {
            //sino esta vacio borramos las imagenes existentes
            await queryRunner.manager.delete(UserImage, {user: { id }});
            
            //creamos nuevas imagenes
            user.images = images.map((image) =>
            this.userImageRepo.create({ url: image }),
            );
        } else {
            user.images = await this.userImageRepo.findBy({ user: { id }});
        }
        //guardamos el usuario
        await queryRunner.manager.save(user);

        //finalizamos la transaccion y liberamos el queryRunner
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return user;
    }
}