import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signin(createAuthDto: CreateAuthDto) {

    if(!createAuthDto.email || !createAuthDto.password) throw new BadRequestException('Email and password required');
    
    const user: User | undefined = await this.usersRepository.findByEmail(createAuthDto.email);

    if(!user || createAuthDto.password !== user.password) throw new NotFoundException('Wrong user or password');

    const { password, ...userWithOutPassWord } = user;

    return userWithOutPassWord;
  }
}
