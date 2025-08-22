import { IsString, IsNotEmpty, IsOptional, IsNumber, IsObject } from 'class-validator';
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

    @ApiProperty({ example: 'The statistics.', description: "Job's statistics" })
    @IsObject()
    @IsNotEmpty()
    stats!: Record<string, number>;
}

export class UpdateJobDto extends PartialType(JobDto) { }