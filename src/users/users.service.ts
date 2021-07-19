import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NotFoundError } from '../errors/not-found';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const id = this.users[this.users.length - 1]?.id + 1 || 0;
    const user: User = {
      id,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} has not found.`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const newUser: User = {
      ...user,
      ...updateUserDto,
    };
    const index = this.users.indexOf(user);
    this.users[index] = newUser;
    return newUser;
  }

  remove(id: number) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }
}
