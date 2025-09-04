import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsObject, IsMongoId, IsEnum } from 'class-validator';

export class SkillDto {
  @ApiProperty({ example: 'Tourbillon', description: 'Skill name.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A spinning attack hitting all nearby enemies.', description: 'Skill description.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Single.', description: 'The type of skill.' })
  @IsEnum(['single', 'multi', 'passive', 'buff', 'active'])
  @IsNotEmpty()
  type: 'single' | 'multi' | 'passive' | 'buff' | 'active';

  @ApiProperty({ example: { damage: 50, cooldown: 5 }, description: 'Skill statistics.' })
  @IsObject()
  @IsNotEmpty()
  stats: Record<string, number>;

  @ApiProperty({ example: 1, description: 'Skill level.' })
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @ApiProperty({ example: '64b8b7dc3e1234567890abcd', description: 'Related Job ID.' })
  @IsMongoId()
  job: string;
}

export class UpdateSkillDto extends PartialType(SkillDto) { }