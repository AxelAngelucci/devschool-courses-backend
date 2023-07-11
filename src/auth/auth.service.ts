import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

const hashp = (p: string, n: number) => {
  return hash(p, n);
};
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterAuthDto) {
    const { password } = payload;
    const hashPwd = await hash(password, 10);
    payload = {
      ...payload,
      password: hashPwd,
      avatar:
        'https://cdn.dribbble.com/users/1162077/screenshots/7495197/media/92507bdcf4b5edfa12d5e9cc4f01b301.png',
    };
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

  async getUserByID(id) {
    const user = await this.authModel.findOne({ _id: id });
    if (!user)
      throw new HttpException(
        'Usuario no encontrado PD: chema se la comeeeeee',
        404,
      );
    return user;
  }

  async getAllUsers() {
    return this.authModel.find();
  }

  async putUserByID(id, payload) {
    const user = await this.authModel.findOne({ _id: id });
    if (!user)
      throw new HttpException(
        'Usuario no encontrado PD: chema se la comeeeeee',
        404,
      );
    try {
      await this.authModel.updateOne({ _id: id }, payload);
      const updatedUser = await this.authModel.findOne({ _id: id });
      return updatedUser;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async changePassword(id, payload) {
    const user = await this.authModel.findOne({ _id: id });

    if (!user)
      throw new HttpException(
        'Usuario no encontrado PD: chema se la comeeeeee',
        404,
      );
    try {
      const checkPassword = await compare(payload.password, user.password);
      if (!checkPassword) throw new HttpException('Contraseña incorrecta', 404);
      const hash = await hashp(payload.newPassword, 10);
      await this.authModel.updateOne({ _id: id }, { password: hash });
      const updatedUser = await this.authModel.findOne({ _id: id });
      return updatedUser;
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
