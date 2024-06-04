import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    const users: User[] = await this.usersRepository.getUsers();

    if (!users.length) throw new NotFoundException('No users found');

    const start = (page - 1) * limit;
    const end = start + limit;

    const usersSlice = users.slice(start, end);

    usersSlice.map((user) => {
      delete user.password;
    });

    return usersSlice;
  }

  async getUserById(id: string): Promise<User> {
    const user: User = await this.usersRepository.getUserById(id);

    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    delete user.isAdmin;

    return user;
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user: User = await this.usersRepository.getUserById(id);

    if (!user) throw new NotFoundException('User not found');

    user.name = userData.name ?? user.name;
    user.email = userData.email ?? user.email;
    user.password = userData.password ?? user.password;
    user.address = userData.address ?? user.address;
    user.phone = userData.phone ?? user.phone;
    user.city = userData.city ?? user.city;
    user.country = userData.country ?? user.country;

    const updatedUser = await this.usersRepository.updateUser(user);

    delete updatedUser.password;
    delete updatedUser.isAdmin;

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const user: User = await this.usersRepository.getUserById(id);

    if (!user) throw new NotFoundException('User not found');

    const deletedUser: User = await this.usersRepository.deleteUser(user);

    delete deletedUser.password;
    delete deletedUser.isAdmin;

    return deletedUser;
  }
}
