import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IdDocument = Id & Document;

@Schema()
export class Id {
  @Prop({ required: true })
  _id: string; // nom de la collection à incrémenter
  
  @Prop({ required: true })
  seq: number;
}

export const IdSchema = SchemaFactory.createForClass(Id);