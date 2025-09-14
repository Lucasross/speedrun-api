import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsEnum, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class EquipmentDto {
    @ApiProperty({ example: '1', description: 'Api ID.' })
    @IsString()
    @IsNotEmpty()
    api_id: string;

    @ApiProperty({ example: "Sword", description: "The equipment's name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A sharp sword.', description: 'A quick description of the equipment.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1, description: 'Target level to equip.' })
    @IsNumber()
    @IsNotEmpty()
    level: number;

    @ApiProperty({ example: 'head', description: 'The slot used by the character.' })
    @IsEnum(['head', 'torso', 'legs', 'boots', 'hands', 'gloves', 'ring', 'necklace', 'weapon'])
    @IsNotEmpty()
    slot: 'head' | 'torso' | 'legs' | 'boots' | 'hands' | 'gloves' | 'ring' | 'necklace' | 'weapon';

    @ApiProperty({
        example: { 'Damage': 10 }, description: "Job's statistics"
    })
    @IsObject()
    @IsNotEmpty()
    stats!: Record<string, number>;

    @ApiProperty({ example: '64b8b7dc3e1234567890abcd', description: 'Related Area ID.' })
    @IsMongoId()
    area: Types.ObjectId;
}

export class UpdateEquipmentDto extends PartialType(EquipmentDto) { }



