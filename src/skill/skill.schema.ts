import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Job } from '../job/job.schema'; // <- chemin vers ton schema Job

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop({ required: true })
  api_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['single', 'multi', 'passive', 'buff', 'active'] })
  type: 'single' | 'multi' | 'passive' | 'buff' | 'active';

  @Prop({ required: true })
  level: number;

  @Prop({ type: Object, required: true })
  stats: Record<string, number>;

  @Prop({
    type: Types.ObjectId, ref: Job.name, required: true,
    set: (val: any) => {
      if (typeof val === 'string') {
        return Types.ObjectId.createFromHexString(val);
      }
      return val; // sinon on touche à rien
    },
  })
  job: Types.ObjectId;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
