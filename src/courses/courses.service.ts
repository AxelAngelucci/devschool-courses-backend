import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schema/courses.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async postCourse(payload) {
    return this.courseModel.create(payload);
  }

  async getAllCourses() {
    return this.courseModel.find();
  }

  async getCourseById(id) {
    const course = this.courseModel.findById(id);
    if (!course) throw new HttpException('No hay ningún curso con ese ID', 404);
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
    if (!course) throw new HttpException('No hay ningún curso con ese ID', 404);
    const { modules } = course;
    console.log(payload);
    const newModules = [...modules, payload];
    if (!payload.moduleName || !payload.classes)
      throw new HttpException('moduleName y classes son requeridos', 400);
    await this.courseModel.findOneAndUpdate(
      { _id: id },
      { modules: newModules },
    );
    const updatedCourse = await this.courseModel.findById(id);
    return updatedCourse;
  }
}
