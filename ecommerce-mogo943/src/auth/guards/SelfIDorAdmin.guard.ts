import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "src/enums/role.enum";

@Injectable()
export class SelfIDorAdmin implements CanActivate{
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        const targetId = request.params.id;


        if(!user) throw new ForbiddenException('User not authenticated');

        const isAdmin = user.rol.some((role) => role === Role.Admin);
        console.log(user.rol)
        const isItSelf = user.id === targetId

        if(!isAdmin && !isItSelf) throw new ForbiddenException('You are not allowed to do this action');

        return true;
    }
}