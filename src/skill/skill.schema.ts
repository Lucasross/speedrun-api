import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Job } from '../job/job.schema'; // <- chemin vers ton schema Job

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  level: number;

  @Prop({ type: Object, required: true })
  stats: Record<string, number>;

  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  job: Types.ObjectId;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
