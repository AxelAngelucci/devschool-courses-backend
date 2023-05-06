import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false })
  phneNumber: number;

  @Prop({ required: false })
  country: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  active: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
