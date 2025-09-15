import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Area } from 'src/area/area.schema';

export type EquipmentDocument = Equipment & Document;

@Schema()
export class Equipment {
    @Prop({ required: true })
    api_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    level: number;

    @Prop({ required: true })
    slot: 'head' | 'torso' | 'legs' | 'boots' | 'hands' | 'gloves' | 'ring' | 'necklace' | 'weapon';

    @Prop({ type: Object, required: true })
    stats!: Record<string, number>;

    @Prop({
        type: Types.ObjectId, ref: Area.name, required: true,
        set: (val: any) => {
            if (typeof val === 'string') {
                return Types.ObjectId.createFromHexString(val);
            }
            return val; // sinon on touche à rien
        },
    })
    area: Types.ObjectId;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
