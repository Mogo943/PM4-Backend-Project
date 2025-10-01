import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({ message:'El nombre es obligatorio' })
    @IsString({message: 'El nombre debe ser un string'})
    @MaxLength(50, { message: 'El nombre no puede tener mas de 50 caracteres' })
    name: string;

    @IsString({message: 'La descripcion debe ser un string'})
    @IsNotEmpty({ message:'La descripcion es obligatorio' })
    description: string;

    @IsNotEmpty({ message:'El precio es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

    @IsNotEmpty({ message:'El stock es obligatorio' })
    @IsInt()
    stock: number;

    @IsString({message: 'La url de la imagen debe ser un string'})
    imgUrl: string;
}
