import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AreaDocument = Area & Document;

@Schema()
export class Area {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    position_x: number;

    @Prop({ required: true })
    position_y: number;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
