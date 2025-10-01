import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async signin(createAuthDto: LogginUserDto) {

    if(!createAuthDto.email || !createAuthDto.password) throw new BadRequestException('Email and password required');

    const email = createAuthDto.email;
    const user: Users | null = await this.usersRepository.findOneBy({email});

    if(!user || createAuthDto.password !== user.password) throw new NotFoundException('Wrong user or password');

    const { password, ...userWithOutPassWord } = user;

    return userWithOutPassWord;
  }
}
