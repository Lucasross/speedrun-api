import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // ================ \\
  // == ATTRIBUTES == \\
  // ================ \\
  @Prop({ default: 0 })
  strenght: number;

  @Prop({ default: 0 })
  constitution: number;

  @Prop({ default: 0 })
  agility: number;

  @Prop({ default: 0 })
  faith: number;

  @Prop({ default: 0 })
  magic: number;

  @Prop({ default: 0 })
  perseverance: number;

  // ================ \\
  // == BASE STATS == \\
  // ================ \\
  @Prop({ required: true })
  base_health: number;

  @Prop({ required: true })
  grow_health: number;

  @Prop({ required: true })
  base_damage: number;

  @Prop({ required: true })
  grow_damage: number;

  @Prop({ default: 0 })
  base_mana: number;

  @Prop({ default: 0 })
  grow_mana: number;

  // ================ \\
  // == STASTITICS == \\
  // ================ \\
  @Prop({ default: 0 }) health: number;
  @Prop({ default: 0 }) health_percent: number;

  @Prop({ default: 0 }) damage: number;
  @Prop({ default: 0 }) damage_percent: number;

  @Prop({ default: 0 }) mana: number;
  @Prop({ default: 0 }) mana_percent: number;

  @Prop({ default: 0 }) critical_chance: number;
  @Prop({ default: 0 }) critical_damage: number;
  @Prop({ default: 0 }) attack_speed: number;
  @Prop({ default: 0 }) double_hit: number;

  @Prop({ default: 0 }) physical_damage: number;
  @Prop({ default: 0 }) physical_damage_percent: number;
  @Prop({ default: 0 }) physical_resistance: number;
  @Prop({ default: 0 }) physical_resistance_percent: number;

  @Prop({ default: 0 }) dodge: number;
  @Prop({ default: 0 }) dodge_percent: number;
  @Prop({ default: 0 }) block: number;
  @Prop({ default: 0 }) block_percent: number;
  @Prop({ default: 0 }) thorns: number;
  @Prop({ default: 0 }) thorns_percent: number;

  @Prop({ default: 0 }) magic_damage: number;
  @Prop({ default: 0 }) magic_damage_percent: number;
  @Prop({ default: 0 }) fire_damage: number;
  @Prop({ default: 0 }) fire_damage_percent: number;
  @Prop({ default: 0 }) water_damage: number;
  @Prop({ default: 0 }) water_damage_percent: number;
  @Prop({ default: 0 }) earth_damage: number;
  @Prop({ default: 0 }) earth_damage_percent: number;
  @Prop({ default: 0 }) wind_damage: number;
  @Prop({ default: 0 }) wind_damage_percent: number;

  @Prop({ default: 0 }) magic_resistance: number;
  @Prop({ default: 0 }) magic_resistance_percent: number;
  @Prop({ default: 0 }) fire_resistance: number;
  @Prop({ default: 0 }) fire_resistance_percent: number;
  @Prop({ default: 0 }) water_resistance: number;
  @Prop({ default: 0 }) water_resistance_percent: number;
  @Prop({ default: 0 }) earth_resistance: number;
  @Prop({ default: 0 }) earth_resistance_percent: number;
  @Prop({ default: 0 }) wind_resistance: number;
  @Prop({ default: 0 }) wind_resistance_percent: number;

  @Prop({ default: 0 }) light_damage: number;
  @Prop({ default: 0 }) light_damage_percent: number;
  @Prop({ default: 0 }) shadow_damage: number;
  @Prop({ default: 0 }) shadow_damage_percent: number;

  @Prop({ default: 0 }) light_resistance: number;
  @Prop({ default: 0 }) light_resistance_percent: number;
  @Prop({ default: 0 }) shadow_resistance: number;
  @Prop({ default: 0 }) shadow_resistance_percent: number;

  @Prop({ default: 0 }) life_regeneration: number;
  @Prop({ default: 0 }) life_regeneration_percent: number;
  @Prop({ default: 0 }) life_steal: number;
  @Prop({ default: 0 }) life_steal_percent: number;
  @Prop({ default: 0 }) mana_regeneration: number;
  @Prop({ default: 0 }) mana_regeneration_percent: number;
  @Prop({ default: 0 }) mana_steal: number;
  @Prop({ default: 0 }) mana_steal_percent: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);