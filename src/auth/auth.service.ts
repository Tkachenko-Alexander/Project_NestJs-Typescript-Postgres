import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
//import HTTP_STATUS_BAD_REQUEST = module

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {
    }

    async login(userDro: createUserDto) {  
        const user = await this.validateUser(userDro)
        return this.generateToken(User)
    }
    validateUser(userDro: createUserDto) {
        throw new Error('Method not implemented.');
    }

    async registration(userDto: createUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payloan = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payloan)
        }
    }
    private validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(useDto.password, user.password);
        if(user &&passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}