import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Sector } from 'src/sector/sector.schema';

export type MonsterDocument = Monster & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Monster {
    @Prop({ required: true })
    api_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Object, default: {} })
    stats!: Record<string, number>;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);

MonsterSchema.virtual('sectors', {
    ref: "Sector",          // le model à référencer
    localField: '_id',     // clé locale 
    foreignField: 'monsters',   // clé dans l'autre model
});
