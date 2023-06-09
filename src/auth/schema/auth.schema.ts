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

  @Prop({ required: false })
  proffesion: string;

  @Prop({ required: false })
  linkedin: string;

  @Prop({ required: false })
  github: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  timezone: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
