import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { config as dotenvConfig } from 'dotenv';
// import { ValidatePassword } from "src/helpers/validatePassword";

dotenvConfig({ path: './.development.env'})

export class CreateUserDto {
    @ApiProperty({
        example: "example@gmail.com",
        description: "Debe ser un mail valido"
    })
    @IsNotEmpty({ message:'El email es obligatorio' })
    @IsEmail({}, {message: 'Invalid email'})
    email: string;

    @ApiProperty({
        example: "Password123!",
        description: "Debe tener al menos un mayuscula, un minuscula, un numero y un caracter especial, y ser de 8 a 15 caracteres"
    })
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

    @ApiProperty({
        example: "Password123!",
        description: "Debe coincidir con 'password'"
    })
    @IsNotEmpty({ message: 'Confirma la contraseña' })
    @IsString({message: 'La constraseña debe ser un string'})
    // @Validate(ValidatePassword, ['password'])
    confirmPassword: string;

    @ApiProperty({
        example: "Nombre Apellido",
        description: "Nombre del usuario, es obligatorio y debe tener de 3 a 80 caracteres"
    })
    @IsNotEmpty( { message:'El nombre es obligatorio' } )
    @IsString({message: 'El nombre debe ser un string'})
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no puede tener mas de 80 caracteres' })
    name: string;
    
    @ApiProperty({
        example: 123456789,
        description: "Numero de telefono del usuario. Debe ser un numero"
    })
    @IsNumber()
    @IsNotEmpty( { message:'El numero de telefono es obligatorio' } )
    phone: number;
    
    @ApiProperty({
        example: "Calle de ejemplo",
        description: "Direccion del usuario. Debe tener de 3 a 80 caracteres"
    })
    @IsString({message: 'La direccion debe ser un string'})
    @MinLength(3, { message: 'La direccion debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La direccion no puede tener mas de 80 caracteres' })
    address: string;
    
    @ApiProperty({
        example: "Pais de ejemplo",
        description: "Pais del usuario. Debe tener de 5 a 20 caracteres"
    })
    @IsString({message: 'El pais debe ser un string'})
    @MinLength(5, { message: 'El pais debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'El pai no puede tener mas de 20 caracteres' })
    country?: string;
    
    @ApiProperty({
        example: "Ciudad de ejemplo",
        description: "Ciudad del usuario. Debe tener de 5 a 20"
    })
    @IsString({message: 'La ciudad debe ser un string'})
    @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'La ciudad no puede tener mas de 20 caracteres' })
    city?: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
    'password',
    'email'
]) {
    @ApiProperty({ 
        example: process.env.ADMIN_TEST_PASSWORD,
        description: "Contraseña de Admin de prueba"
    })
    password: string;
    
    @ApiProperty({ 
        example: process.env.ADMIN_TEST_USER,
        description: "Usuario Admin de prueba"
    })
    email: string;
}
