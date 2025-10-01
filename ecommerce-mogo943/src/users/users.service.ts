import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser: Users = this.usersRepository.create({ ...createUserDto })
    await this.usersRepository.save(newUser)

    const {password, ...userWithoutPassword} = newUser
    
    return userWithoutPassword
  }

  async findAll(page: number = 1, limit: number = 3) {
    let users = await this.usersRepository.find();
    
    const start = (page - 1) * limit;
    const end = page + limit;

    return  (users = users.slice(start, end))
  }

  async findOne(id: string) {
    const user: Users | null = await this.usersRepository.findOne({
      where: { id },
      relations: {
        order: true
      }
    })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
