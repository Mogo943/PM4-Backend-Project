import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/products/entities/product.entity";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.development.env'})

export class CreateOrderDto {
    @ApiProperty({
            example: process.env.ADMIN_TEST_ID,
            description: "ID de un usuario",
        })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
            example: [
                { id: "9769b9cd-e3dc-44cd-8b94-d1f29f67d16c" },
                { id: "0a7a974b-1a84-486e-962e-163cf10b570b" },
                { id: "2218b554-c57c-4ea3-a44a-80af551b06c9" },
                { id: "3b94423d-8557-4f3f-818d-837ecf0ab4bb" },
                { id: "d2947f17-be68-49d1-81e7-8f825a3eafdb" },
            ],
            description: "IDs de los productos que desea comprar el usuario",
        })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductIdDto)
    products: ProductIdDto[];
}

class ProductIdDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}

