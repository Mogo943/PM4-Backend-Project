import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message:'El nombre es obligatorio' })
    @MinLength(3)
    @MaxLength(20)
    name: string;
}
