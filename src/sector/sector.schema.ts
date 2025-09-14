import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Area } from 'src/area/area.schema';
import { Monster } from 'src/monster/monster.schema';

export type SectorDocument = Sector & Document;

@Schema()
export class Sector {
    @Prop({ required: true })
    api_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    level_min: number;

    @Prop({ required: true })
    level_max: number;

    @Prop({ required: true })
    monster_density: number;

    @Prop({ required: true })
    respawn_rate: number;

    @Prop({ type: Types.ObjectId, ref: Area.name, required: true })
    area: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Monster.name }], required: true })
    monsters: Types.ObjectId[];
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
