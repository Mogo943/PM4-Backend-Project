import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        example: "Producto de ejemplo",
        description: "Nombre del producto. Puede tener hasta 50 caracteres",
    })
    @IsNotEmpty({ message:'El nombre es obligatorio' })
    @IsString({message: 'El nombre debe ser un string'})
    @MaxLength(50, { message: 'El nombre no puede tener mas de 50 caracteres' })
    name: string;

    @ApiProperty({
        example: "Descripcion del producto de ejemplo",
        description: "Descripcion del producto",
    })
    @IsString({message: 'La descripcion debe ser un string'})
    @IsNotEmpty({ message:'La descripcion es obligatorio' })
    description: string;

    @ApiProperty({
        example: 100.50,
        description: "Precio del producto. Debe ser un numero",
    })
    @IsNotEmpty({ message:'El precio es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

    @ApiProperty({
        example: 12,
        description: "Stock del producto. Debe ser un numero",
    })
    @IsNotEmpty({ message:'El stock es obligatorio' })
    @IsInt()
    stock: number;

    @ApiProperty({
        example: "Imagen del producto de ejemplo",
        description: "Debe ser una URL String, puede cargarse en el endpoint file-upload",
    })
    @IsString({message: 'La url de la imagen debe ser un string'})
    imgUrl: string;
}
