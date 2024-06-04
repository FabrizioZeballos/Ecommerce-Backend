import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();

    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async createUser(newUser: User): Promise<User> {
    return await this.usersRepository.save(newUser);
  }

  async updateUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async deleteUser(user: User): Promise<User> {
    return await this.usersRepository.remove(user);
  }
}
