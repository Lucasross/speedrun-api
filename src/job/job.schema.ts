import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true })
  _id: string;
  
  @ApiProperty({ description: 'Nom du job', example: 'Guerrier' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Puissance du job', example: 15 })
  @Prop({ required: true })
  power: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);