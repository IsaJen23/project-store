import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';
import { Proveedor } from './proveedor.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  description: string;

  @Column({ type: 'int4', nullable: false })
  price: number;

  @Column({ type: 'int8', nullable: false })
  stock: number;

  @Column({type: 'int4', nullable: false})
  user_id: number;

  @Column({ type: 'varchar',  nullable: true })
  filename: string;

  @CreateDateColumn({ type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'int4', nullable: false })
  categoria_id: number;

  @Column({ type: 'int4', nullable: true })
  proveedor_id: number;

  //relaciones
  @ManyToOne(()=> User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'

  })
  autor: User;

  @ManyToOne(() => Category)
  @JoinColumn({ 
    name: 'categoria_id',
    referencedColumnName: 'id'
   })
  categoria: Category;


  @ManyToOne(() => Proveedor)
  @JoinColumn({ 
    name: 'proveedor_id',
    referencedColumnName: 'id'
   })
  proveedor: Proveedor;

  
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images?: ProductImage[];
}