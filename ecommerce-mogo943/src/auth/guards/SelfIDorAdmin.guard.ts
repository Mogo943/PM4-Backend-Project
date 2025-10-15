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

        const { body } = request;
        const { userId } = body;


        if(!user) throw new ForbiddenException('User not authenticated');

        const isAdmin = user.rol.some((role) => role === Role.Admin);

        if (targetId) {
            const isItSelfToDeleteUser = user.id === targetId;
            if (!isAdmin && !isItSelfToDeleteUser) {
                throw new ForbiddenException('You are not allowed to modify this user');
            }
            }

        if (userId) {
            const isItSelfToSetOrders = user.id === userId;
            if (!isAdmin && !isItSelfToSetOrders) {
                throw new ForbiddenException('You are not allowed to create this order');
            }
        }

        return true;
    }
}