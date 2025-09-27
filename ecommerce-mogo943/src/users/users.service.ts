import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto): Promise<number> {
    //validacion de datos del Dto
    const newID: number = await this.usersRepository.create(createUserDto)
    return newID;
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const users: User[] = await this.usersRepository.find(page, limit);
    return users
  }

  async findOne(id: number): Promise<User | undefined> {
    
    if(id <= 0) throw new Error(`Invalid id ${id}`)

    const user: User | undefined = await this.usersRepository.findOne(id);

    if(!user) throw new Error(`User with id ${id} not found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    //Validacion de datos del Dto
    if(id <= 0) throw new Error(`Invalid id ${id}`)
      
    const updatedID: number | undefined = await this.usersRepository.update(id, updateUserDto);
    
    if(!updatedID) throw new Error (`User with id ${id} not found`)

    return updatedID;
  }

  async remove(id: number): Promise<number> {
    if(id <= 0) throw new Error(`Invalid id ${id}`)

    const deletedID = await this.usersRepository.delete(id);
    
    if(!deletedID) throw new Error (`User with id ${id} not found`)

    return deletedID;
  }
}
