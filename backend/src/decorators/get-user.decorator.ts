import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { JwtRequest } from "src/interfaces/jwt-request.interface";

export const GetUser = createParamDecorator(
    (data:keyof JwtPayload, ctx: ExecutionContext)=> {
        const request = ctx.switchToHttp().getRequest<JwtRequest>();
        const user = request.user;
        return data ? user?.[data] : user;
    }
)