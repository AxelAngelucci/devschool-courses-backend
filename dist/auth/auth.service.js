"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("./schema/auth.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authModel, jwtService) {
        this.authModel = authModel;
        this.jwtService = jwtService;
    }
    async register(payload) {
        const { password } = payload;
        const hashPwd = await (0, bcrypt_1.hash)(password, 10);
        payload = Object.assign(Object.assign({}, payload), { password: hashPwd });
        return this.authModel.create(payload);
    }
    async login(payload) {
        const { email, password } = payload;
        const findUser = await this.authModel.findOne({ email });
        if (!findUser)
            throw new common_1.HttpException('Usuario o contraseña incorrectos', 404);
        const checkPassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!checkPassword)
            throw new common_1.HttpException('Usuario o contraseña incorrectos', 404);
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
            throw new common_1.HttpException('Usuario no encontrado PD: chema se la comeeeeee', 404);
        return user;
    }
    async getAllUsers() {
        return this.authModel.find();
    }
    async putUserByID(id, payload) {
        const user = await this.authModel.findOne({ _id: id });
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado PD: chema se la comeeeeee', 404);
        try {
            await this.authModel.updateOne({ _id: id }, payload);
            const updatedUser = await this.authModel.findOne({ _id: id });
            return updatedUser;
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', 500);
        }
    }
    async changePassword(id, payload) {
        const user = await this.authModel.findOne({ _id: id });
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado PD: chema se la comeeeeee', 404);
        try {
            const checkPassword = await (0, bcrypt_1.compare)(payload.password, user.password);
            if (!checkPassword)
                throw new common_1.HttpException('Contraseña incorrecta', 404);
            await this.authModel.updateOne({ _id: id }, payload);
            const updatedUser = await this.authModel.findOne({ _id: id });
            return updatedUser;
        }
        catch (error) {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map