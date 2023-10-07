import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserImage } from './user-image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  sexo: string;

  @Column({ type: 'varchar',  nullable: true })
  filename: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => UserImage, (userImage) => userImage.user, {
    cascade: true,
  })
  images?: UserImage[];
}