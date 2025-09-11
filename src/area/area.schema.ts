import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AreaDocument = Area & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Area {
    @Prop({ required: true })
    api_id: string;

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

AreaSchema.virtual('sectors', {
    ref: "Sector",          // le model à référencer
    localField: '_id',     // clé locale 
    foreignField: 'area',   // clé dans l'autre model
});
