import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private usersService: UsersService, 
        private configService: ConfigService
    ) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new BadRequestException('JWT_SECRET is not defined in environment variables');
         }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any): Promise<JwtPayload | null>{
        const user = await this.usersService.findUserByEmail(payload.email);
        if(!user){
            return null;
        }
        return {id: user.id, email: user.email};
    }
}