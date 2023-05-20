import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
class ClassSchemma {
  @Prop()
  name: string;
  @Prop()
  link: string;
  @Prop({ required: true, default: false })
  isFree: boolean;
}
@Schema()
class ModuleSchema {
  @Prop()
  moduleName: string;
  @Prop()
  classes: [ClassSchemma];
}

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  subName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  bigDescription: string;

  @Prop({ required: false })
  requirements: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: false })
  professorName: string;

  @Prop({ required: false })
  professorId: string;

  @Prop({ required: true, default: false })
  prominent: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop()
  oldPrice: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  banner: string;

  @Prop({ required: false })
  score: number;

  @Prop({ required: false })
  clients: number;

  @Prop()
  modules: [ModuleSchema];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
