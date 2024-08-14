import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const { password, ...rest } = registerUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.create({ ...rest, password: hashedPassword });
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
