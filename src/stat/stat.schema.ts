import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatDocument = Stat & Document;

@Schema({ collection: 'stat' })
export class Stat {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['attribute', 'common', 'physical', 'magic', 'faith', 'regeneration'] })
  type: 'attribute' | 'common' | 'physical' | 'magic' | 'faith' | 'regeneration';

  @Prop({ required: true, default: 1 })
  weight: number;

  @Prop({ required: true, default: 0 })
  defaultValue: number;
}

export const StatSchema = SchemaFactory.createForClass(Stat);