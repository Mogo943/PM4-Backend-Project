import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";


export const Roles = (...role: Role[]) => SetMetadata('roles',role);