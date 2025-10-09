import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: LogginUserDto) {

    if(!credentials.email || !credentials.password) throw new BadRequestException('Email and password required');

    const email = credentials.email;
    const user: Users | null = await this.usersRepository.findOneBy({email});

    if(!user) throw new NotFoundException('Wrong user or password');
    
    const isPasswordvalid = await bcrypt.compare( credentials.password, user.password);

    if(!isPasswordvalid) throw new NotFoundException('Wrong user or password');
    
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      rol: [user.isAdmin? Role.Admin : Role.User]
    }

    const token = this.jwtService.sign(payload)

    const { password, ...userWithOutPassWord } = user;

    return {login: true, access_token: token, userWithOutPassWord};
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

    const {password, isAdmin, ...userWithoutPassword} = newUser
    
    return userWithoutPassword
  }
}
