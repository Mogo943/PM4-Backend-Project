import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(page: number = 1, limit: number = 3) {
    let users = await this.usersRepository.find();
    
    if(!users) throw new BadRequestException('Not users registred')

    const start = (page - 1) * limit;
    const end = page + limit;

    let usersWithOutPassword = users.map((user) => {
      const {password, isAdmin, ...userWithOutPassword} = user;
      return userWithOutPassword
    })

    return  (usersWithOutPassword = usersWithOutPassword.slice(start, end))
  }

  async findOne(id: string) {
    const user: Users | null = await this.usersRepository.findOne({
      where: { id },
      relations: {
        order: true
      }
    })

    if(!user) throw new NotFoundException('User not found')
    const { password, isAdmin, ...userWithOutPassword} = user;
    return userWithOutPassword;
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
