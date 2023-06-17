import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUser(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  loginUser(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  @Get('user/:id')
  getUserByID(@Param('id') id) {
    return this.authService.getUserByID(id);
  }

  @Get('all')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Put('user/:id/password')
  changePassword(@Param('id') id, @Body() payload) {
    return this.authService.changePassword(id, payload);
  }
  @Put('user/:id')
  editUserByID(@Param('id') id, @Body() payload) {
    return this.authService.putUserByID(id, payload);
  }
}
