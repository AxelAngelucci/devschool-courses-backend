/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CourseService } from './courses.service';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    postCourse(payload: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/courses.schema").CourseDocument> & Omit<import("./schema/courses.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addModuleToCourse(id: any, payload: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/courses.schema").CourseDocument> & Omit<import("./schema/courses.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getAllCourses(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/courses.schema").CourseDocument> & Omit<import("./schema/courses.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getCourseById(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/courses.schema").CourseDocument> & Omit<import("./schema/courses.schema").Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteCourse(id: any): Promise<import("mongodb").DeleteResult>;
}
