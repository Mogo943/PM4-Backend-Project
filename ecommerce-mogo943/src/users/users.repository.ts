import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
    
    Users: Array<User> = [
    {
        id: 1,
        email: "juan.perez@example.com",
        name: "Juan Pérez",
        password: "12345Juan!",
        address: "Calle Falsa 123",
        phone: "+54 9 11 5555-1111",
        country: "Argentina",
        city: "Buenos Aires",
    },
    {
        id: 2,
        email: "maria.gomez@example.com",
        name: "María Gómez",
        password: "MariaPass2025",
        address: "Av. Libertador 456",
        phone: "+34 611 222 333",
        country: "España",
        city: "Madrid",
     },
     {
        id: 3,
        email: "carlos.lopez@example.com",
        name: "Carlos López",
        password: "Carlos_789",
        address: "Rua das Flores 789",
        phone: "+55 21 99888-7777",
        country: "Brasil",
        city: "Río de Janeiro",
    },
    {
        id: 4,
        email: "sofia.martinez@example.com",
        name: "Sofía Martínez",
        password: "SofiSecure#44",
        address: "Main Street 101",
        phone: "+1 305-444-5566",
        country: "Estados Unidos",
        city: "Miami",
    },
    {
        id: 5,
        email: "andres.torres@example.com",
        name: "Andrés Torres",
        password: "AndresTorres@22",
        address: "Carrera 45 #12-34",
        phone: "+57 300 555 8899",
        country: "Colombia",
        city: "Bogotá",
    },
    ]

    find(page: number, limit: number){
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.Users.slice(startIndex, endIndex); 
    }

    findOne(id: number) {
        return this.Users.find((user) => user.id ===  id);
    }

    create(createUserDto: CreateUserDto) {
        const id:number = this.Users.length > 0 ? this.Users[this.Users.length - 1].id + 1 : 1;
        const newUser: User = {id, ...createUserDto};
        
        this.Users = [...this.Users, newUser]
        
        return id;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const index = this.Users.findIndex((user) => user.id === id);
       
        if(index === -1) return undefined

        this.Users[index] = { ...this.Users[index], ...updateUserDto, id };

        return id
    }

    delete(id: number) {
        const index = this.Users.findIndex((user) => user.id === id);

        if(index === -1) return undefined

        this.Users.splice(index, 1)

        return id
    }
}
