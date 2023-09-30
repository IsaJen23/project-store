import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../entities/user.entity';

@Entity()
export class UserImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  // Establece la relación con el usuario propietario de la imagen
  @ManyToOne(() => User, (user) => user.images,{
    onDelete:'CASCADE'
  })
  user: User;

}