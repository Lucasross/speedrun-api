import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import type { ObjectId, Types } from 'mongoose';

export class SectorDto {
    @ApiProperty({ example: '1', description: 'Api ID.' })
    @IsString()
    @IsNotEmpty()
    api_id: string;

    @ApiProperty({ example: "Rich's bay", description: "The sector's name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A beautiful bay with fine sand.', description: 'A quick description of the sector.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '0', description: "The min level of the monsters in the area" })
    @IsNumber()
    @IsNotEmpty()
    level_min: number;

    @ApiProperty({ example: '5', description: "The max level of the monsters in the area" })
    @IsNumber()
    @IsNotEmpty()
    level_max: number;

    @ApiProperty({ example: '4', description: "The number of monsters per pack" })
    @IsNumber()
    @IsNotEmpty()
    monster_density: number;

    @ApiProperty({ example: '2.5', description: "The number of seconds after a pack has been cleared" })
    @IsNumber()
    @IsNotEmpty()
    respawn_rate: number;

    @ApiProperty({ example: '1', description: 'The area where the sector is.' })
    @IsMongoId()
    area: Types.ObjectId;

    @ApiProperty({ example: '[1, 2]', description: 'The monsters present in the sector.' })
    @IsMongoId()
    monsters: Types.ObjectId[];
}

export class UpdateSectorDto extends PartialType(SectorDto) { }



