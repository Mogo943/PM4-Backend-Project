import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

    if(!user) throw new NotFoundException('Wrong user or password');
    
    const isPasswordvalid = await bcrypt.compare( createAuthDto.password, user.password);
    if(!isPasswordvalid) throw new NotFoundException('Wrong user or password');
    
    const { password, ...userWithOutPassWord } = user;

    return userWithOutPassWord;
  }

  async signup(createUserDto: CreateUserDto) {
    const { confirmPassword, ...userData } = createUserDto;

    if(confirmPassword !== userData.password) throw new BadRequestException('Las contraseñas no coinciden')

    const foundUser: Users | null = await this.usersRepository.findOneBy(
      {
        email: userData.email
      }
    )
    if(foundUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    if(!hashedPassword) throw new BadRequestException('password could not be hashed')
      
    const newUser: Users = this.usersRepository.create({ ...userData, password: hashedPassword })
    await this.usersRepository.save(newUser)

    const {password, ...userWithoutPassword} = newUser
    
    return userWithoutPassword
  }
}
