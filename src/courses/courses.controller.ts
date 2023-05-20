import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './courses.service';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post()
  postCourse(@Body() payload) {
    return this.courseService.postCourse(payload);
  }

  @Post(':id/sections')
  addModuleToCourse(@Param('id') id, @Body() payload) {
    return this.courseService.createModuleInCourse(id, payload);
  }

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }
  @Get('/:id')
  getCourseById(@Param('id') id) {
    return this.courseService.getCourseById(id);
  }
  @Delete('/:id')
  deleteCourse(@Param('id') id) {
    return this.courseService.deleteCourse(id);
  }
}
