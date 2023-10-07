import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from './product.entity';



@Entity()
export class ProductImage{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({ type: 'varchar',  nullable: true })
    url: string;

    //Muchas imagenes seran de un producto
    @ManyToOne(() => Product, (product) => product.images, {
        onDelete: 'CASCADE',
    })

    product: Product;
    
}