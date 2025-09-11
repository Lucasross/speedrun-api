import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class MonsterDto {
    @ApiProperty({ example: 'Wolf', description: "The monster's name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'A slighty fat wolf.', description: 'A quick description of the monster.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: "JSON OBJECT", description: "Monster's statistics" })
    @IsObject()
    @IsNotEmpty()
    stats!: Record<string, number>;
}

export class UpdateMonsterDto extends PartialType(MonsterDto) { }



