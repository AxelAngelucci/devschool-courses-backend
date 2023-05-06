import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterAuthDto) {
    const { password } = payload;
    const hashPwd = await hash(password, 10);
    payload = { ...payload, password: hashPwd };
    return this.authModel.create(payload);
  }

  async login(payload: LoginAuthDto) {
    const { email, password } = payload;
    const findUser = await this.authModel.findOne({ email });
    if (!findUser)
      throw new HttpException('Usuario o contraseña incorrectos', 404);
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('Usuario o contraseña incorrectos', 404);
    const token = await this.jwtService.sign(JSON.stringify(findUser));
    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
