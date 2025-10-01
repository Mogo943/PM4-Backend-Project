import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const foundUser: Users | null = await this.usersRepository.findOneBy(
      {
        email: createUserDto.email
      }
    )
    if(foundUser) throw new BadRequestException('User already exists');

    const newUser: Users = this.usersRepository.create({ ...createUserDto })
    await this.usersRepository.save(newUser)

    const {password, ...userWithoutPassword} = newUser
    
    return userWithoutPassword
  }

  async findAll(page: number = 1, limit: number = 3) {
    let users = await this.usersRepository.find();
    
    if(!users) throw new BadRequestException('Not users registred')

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

    if(!user) throw new NotFoundException('User not found')

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser: Users | null = await this.usersRepository.findOneBy(
      {
        id
      }
    )
    if(!foundUser) throw new NotFoundException('User not found');

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const foundUser: Users | null = await this.usersRepository.findOneBy(
      {
        id
      }
    )
    if(!foundUser) throw new NotFoundException('User not found');

    return await this.usersRepository.delete(id);
  }
}
