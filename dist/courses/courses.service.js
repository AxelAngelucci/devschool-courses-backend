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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const courses_schema_1 = require("./schema/courses.schema");
const mongoose_2 = require("mongoose");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async postCourse(payload) {
        return this.courseModel.create(payload);
    }
    async getAllCourses() {
        return this.courseModel.find();
    }
    async getCourseById(id) {
        const course = this.courseModel.findById(id);
        if (!course)
            throw new common_1.HttpException('No hay ningún curso con ese ID', 404);
        return course;
    }
    async deleteCourse(id) {
        return this.courseModel.deleteOne({ _id: id });
    }
    async patchCourse(id, payload) {
        return this.courseModel.updateOne({ _id: id }, payload);
    }
    async createModuleInCourse(id, payload) {
        const course = await this.courseModel.findById(id);
        if (!course)
            throw new common_1.HttpException('No hay ningún curso con ese ID', 404);
        const { modules } = course;
        console.log(payload);
        const newModules = [...modules, payload];
        if (!payload.moduleName || !payload.classes)
            throw new common_1.HttpException('moduleName y classes son requeridos', 400);
        await this.courseModel.findOneAndUpdate({ _id: id }, { modules: newModules });
        const updatedCourse = await this.courseModel.findById(id);
        return updatedCourse;
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(courses_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=courses.service.js.map