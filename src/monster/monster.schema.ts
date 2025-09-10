import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MonsterDocument = Monster & Document;

@Schema()
export class Monster {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Object, default: {} })
    stats!: Record<string, number>;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
