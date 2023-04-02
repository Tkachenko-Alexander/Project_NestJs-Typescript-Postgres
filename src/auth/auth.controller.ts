import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDro: createUserDto) {
        return this.authService.login(userDro)    
    }

    @Post('/registration')
    registration(@Body() userDto: createUserDto) {
        return this.authService.registration(userDro)
    }

}
