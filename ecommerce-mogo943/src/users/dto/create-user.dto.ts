import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, isNumber, IsNumberString, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message:'El email es obligatorio' })
    @IsEmail({}, {message: 'Invalid email'})
    email: string;

    @IsNotEmpty({ message:'La contraseña es obligatorio' })
    @IsString({message: 'La constraseña debe ser un string'})
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(15, { message: 'La contraseña no debe tener mas de 15 caracteres' })
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1}, 
        {message:'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial'})
    password: string;

    @IsNotEmpty( { message:'El nombre es obligatorio' } )
    @IsString({message: 'El nombre debe ser un string'})
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no puede tener mas de 80 caracteres' })
    name: string;
    
    @IsNumber()
    @IsNotEmpty( { message:'El numero de telefono es obligatorio' } )
    phone: number;
    
    @IsString({message: 'La direccion debe ser un string'})
    @MinLength(3, { message: 'La direccion debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La direccion no puede tener mas de 80 caracteres' })
    address: string;
    
    @IsString({message: 'El pais debe ser un string'})
    @MinLength(5, { message: 'El pais debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'El pai no puede tener mas de 20 caracteres' })
    country?: string;
    
    @IsString({message: 'La ciudad debe ser un string'})
    @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'La ciudad no puede tener mas de 20 caracteres' })
    city?: string;

    @IsEmpty()
    isAdmin: boolean;
}
