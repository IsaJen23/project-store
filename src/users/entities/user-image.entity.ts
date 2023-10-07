import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class UserImage{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({ type: 'varchar',  nullable: true })
    url: string;

    //Muchas imagenes seran de un producto
    @ManyToOne(() => User, (user) => user.images, {
        onDelete: 'CASCADE',
    })

    user: User;
    
}