import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { UserImage } from '../entities/user-image.entity';import { DataSource } from 'typeorm';

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(UserImage)
        private readonly imageRepository: Repository<UserImage>,
        
        private readonly dataSource: DataSource,
    ){}

    async create (createUserDto: CreateUserDto){
        const {images = [], ...detailUser} = createUserDto;
        const user = await this.userRepo.create({
            ...detailUser,
            image:images.map((image) => this.imageRepository.create({url:image}))
        })

        await this.userRepo.save(user);
        return user;
    }
    }
    //Encontrar un user
    findOne(id: number){
        return this.userRepo.findOne({  
            where:{id},
            relations:{
            images:true
        }});
    }
    //mostrar todos los usuarios
    findAll(){
        return this.userRepo.find({
            order: {id: 'ASC'},
            relations:{
            images:true}
        });
    }
    //eliminar un usuario
    async remove(id:number){
        const user =await this.findOne(id);
        await this.userRepo.remove(user);
        return 'Usuario eliminado';
    }

    //actualizar un usuario
    async update(id: number, userDto: CreateUserDto){
        const {images, ...updateAll} = userDto
        const user = await this.userRepo.preload({
            id:id,
            ... updateAll
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images){
            await queryRunner.manager.delete(UserImage, {user: {id}});

            user.images = images.map((image)=>
                this.userImageRepo.create({url: image}),
            )

        }else{
            user.images =await this.userImageRepo.findBy({ user: {id}});
        }

        await queryRunner.manager.save(user);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return user;
    }}