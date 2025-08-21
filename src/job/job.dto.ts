import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class JobDto {
    @ApiProperty({ example: 'Warrior', description: "Job's name." })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A fierce human.', description: "Job's description" })
    @IsString()
    @IsNotEmpty()
    description: string;

    // ================ \\
    // == ATTRIBUTES == \\
    // ================ \\
    @ApiProperty({ example: 5, description: 'The increased physical damage and critical damage per point.' })
    @IsNumber()
    @IsOptional()
    strenght?: number;

    @ApiProperty({ example: 5, description: 'The increased physical defense and health per point.' })
    @IsNumber()
    @IsOptional()
    constitution?: number;

    @ApiProperty({ example: 5, description: 'The increased critical chance and attack speed per point.' })
    @IsNumber()
    @IsOptional()
    agility?: number;

    @ApiProperty({ example: 5, description: 'The increased faith magic and mana regeneration per point.' })
    @IsNumber()
    @IsOptional()
    faith?: number;

    @ApiProperty({ example: 5, description: 'The increased elemental magic attack and mana per point.' })
    @IsNumber()
    @IsOptional()
    magic?: number;

    @ApiProperty({ example: 5, description: 'The increased life regeneration and dodge rate per point.' })
    @IsNumber()
    @IsOptional()
    perseverance?: number;    
    
    // ================ \\
    // == BASE STATS == \\
    // ================ \\
    @ApiProperty({ example: 120, description: 'The base health of the job.' })
    @IsNumber()
    @IsNotEmpty()
    base_health: number;

    @ApiProperty({ example: 0.01, description: 'The health % gain per level (here 1%).' })
    @IsNumber()
    @IsNotEmpty()
    grow_health: number;

    @ApiProperty({ example: 25, description: 'The base damage of the job.' })
    @IsNumber()
    @IsNotEmpty()
    base_damage: number;

    @ApiProperty({ example: 0.02, description: 'The damage % gain per level (here 2%).' })
    @IsNumber()
    @IsNotEmpty()
    grow_damage: number;

    @ApiProperty({ example: 200, description: 'The base damage of the job.' })
    @IsNumber()
    @IsOptional()
    base_mana?: number;

    @ApiProperty({ example: 0.05, description: 'The damage % gain per level (here 5%).' })
    @IsNumber()
    @IsOptional()
    grow_mana?: number;

    // ================ \\
    // == STASTITICS == \\
    // ================ \\
    @ApiProperty({ example: 0, description: 'Health bonus points of the character.' })
    @IsNumber()
    @IsOptional()
    health?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of health.' })
    @IsNumber()
    @IsOptional()
    health_percent?: number;

    @ApiProperty({ example: 0, description: 'Damage bonus of the character.' })
    @IsNumber()
    @IsOptional()
    damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of damage.' })
    @IsNumber()
    @IsOptional()
    damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Mana bonus of the character.' })
    @IsNumber()
    @IsOptional()
    mana?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of mana.' })
    @IsNumber()
    @IsOptional()
    mana_percent?: number;

    @ApiProperty({ example: 0, description: 'Chance to land a critical hit in %.' })
    @IsNumber()
    @IsOptional()
    critical_chance?: number;

    @ApiProperty({ example: 0, description: 'Bonus critical damage in %.' })
    @IsNumber()
    @IsOptional()
    critical_damage?: number;

    @ApiProperty({ example: 0, description: 'Attack speed of the character (attacks per second).' })
    @IsNumber()
    @IsOptional()
    attack_speed?: number;

    @ApiProperty({ example: 0, description: 'Chance to hit twice in one attack in %.' })
    @IsNumber()
    @IsOptional()
    double_hit?: number;

    @ApiProperty({ example: 0, description: 'Physical bonus damage dealt by the character.' })
    @IsNumber()
    @IsOptional()
    physical_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of physical damage.' })
    @IsNumber()
    @IsOptional()
    physical_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Physical bonus resistance of the character.' })
    @IsNumber()
    @IsOptional()
    physical_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of physical resistance.' })
    @IsNumber()
    @IsOptional()
    physical_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Magic bonus damage dealt by the character.' })
    @IsNumber()
    @IsOptional()
    magic_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of magic damage.' })
    @IsNumber()
    @IsOptional()
    magic_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Fire elemental damage bonus.' })
    @IsNumber()
    @IsOptional()
    fire_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of fire damage.' })
    @IsNumber()
    @IsOptional()
    fire_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Water elemental damage bonus.' })
    @IsNumber()
    @IsOptional()
    water_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of water damage.' })
    @IsNumber()
    @IsOptional()
    water_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Earth elemental damage bonus.' })
    @IsNumber()
    @IsOptional()
    earth_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of earth damage.' })
    @IsNumber()
    @IsOptional()
    earth_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Wind elemental damage bonus.' })
    @IsNumber()
    @IsOptional()
    wind_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of wind damage.' })
    @IsNumber()
    @IsOptional()
    wind_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Magic resistance of the character bonus.' })
    @IsNumber()
    @IsOptional()
    magic_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of magic resistance.' })
    @IsNumber()
    @IsOptional()
    magic_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Fire resistance of the character bonus.' })
    @IsNumber()
    @IsOptional()
    fire_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of fire resistance.' })
    @IsNumber()
    @IsOptional()
    fire_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Water resistance of the character bonus.' })
    @IsNumber()
    @IsOptional()
    water_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of water resistance.' })
    @IsNumber()
    @IsOptional()
    water_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Earth resistance of the character.' })
    @IsNumber()
    @IsOptional()
    earth_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of earth resistance.' })
    @IsNumber()
    @IsOptional()
    earth_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Wind resistance of the character.' })
    @IsNumber()
    @IsOptional()
    wind_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of wind resistance.' })
    @IsNumber()
    @IsOptional()
    wind_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Light elemental damage.' })
    @IsNumber()
    @IsOptional()
    light_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of light damage.' })
    @IsNumber()
    @IsOptional()
    light_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Shadow elemental damage.' })
    @IsNumber()
    @IsOptional()
    shadow_damage?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of shadow damage.' })
    @IsNumber()
    @IsOptional()
    shadow_damage_percent?: number;

    @ApiProperty({ example: 0, description: 'Light resistance of the character.' })
    @IsNumber()
    @IsOptional()
    light_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of light resistance.' })
    @IsNumber()
    @IsOptional()
    light_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Shadow resistance of the character.' })
    @IsNumber()
    @IsOptional()
    shadow_resistance?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of shadow resistance.' })
    @IsNumber()
    @IsOptional()
    shadow_resistance_percent?: number;

    @ApiProperty({ example: 0, description: 'Chance to dodge an attack.' })
    @IsNumber()
    @IsOptional()
    dodge?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of dodge.' })
    @IsNumber()
    @IsOptional()
    dodge_percent?: number;

    @ApiProperty({ example: 0, description: 'Chance to block an attack.' })
    @IsNumber()
    @IsOptional()
    block?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of block.' })
    @IsNumber()
    @IsOptional()
    block_percent?: number;

    @ApiProperty({ example: 0, description: 'Reflective damage dealt when attacked (thorns).' })
    @IsNumber()
    @IsOptional()
    thorns?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of thorns.' })
    @IsNumber()
    @IsOptional()
    thorns_percent?: number;

    @ApiProperty({ example: 2, description: 'Life regenerated per second.' })
    @IsNumber()
    @IsOptional()
    life_regeneration?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of life regeneration.' })
    @IsNumber()
    @IsOptional()
    life_regeneration_percent?: number;

    @ApiProperty({ example: 0, description: 'Life stolen from enemies per hit.' })
    @IsNumber()
    @IsOptional()
    life_steal?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of life steal.' })
    @IsNumber()
    @IsOptional()
    life_steal_percent?: number;

    @ApiProperty({ example: 0, description: 'Mana regenerated per second.' })
    @IsNumber()
    @IsOptional()
    mana_regeneration?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of mana regeneration.' })
    @IsNumber()
    @IsOptional()
    mana_regeneration_percent?: number;

    @ApiProperty({ example: 0, description: 'Mana stolen from enemies per hit.' })
    @IsNumber()
    @IsOptional()
    mana_steal?: number;

    @ApiProperty({ example: 0, description: 'Percentage increase of mana steal.' })
    @IsNumber()
    @IsOptional()
    mana_steal_percent?: number;
}

export class UpdateJobDto extends PartialType(JobDto) { }