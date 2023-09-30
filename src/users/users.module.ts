import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserImage } from './entities/user-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserImage])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
