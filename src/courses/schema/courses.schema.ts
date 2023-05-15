import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
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
}

export const CourseSchema = SchemaFactory.createForClass(Course);
