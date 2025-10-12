import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Nueva categoria",
        description: "Creacion de una nueva categoria de productos"
    })
    @IsNotEmpty({ message:'El nombre es obligatorio' })
    @MinLength(3)
    @MaxLength(20)
    name: string;
}
