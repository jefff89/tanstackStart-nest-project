import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Connect the entity to its parent module. And creates the repository
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
