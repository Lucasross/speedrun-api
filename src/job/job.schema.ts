import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Job {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, default: {} })
  stats!: Record<string, number>;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.virtual('skills', {
  ref: 'Skill',          // le model à référencer
  localField: '_id',     // clé locale dans Job
  foreignField: 'job',   // clé dans Skill qui référence Job
});