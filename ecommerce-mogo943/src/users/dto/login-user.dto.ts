import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class LogginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]){}