import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/products/entities/product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    // @Type(() => PartialType<Products>)
    products: { id:string }[];
}
