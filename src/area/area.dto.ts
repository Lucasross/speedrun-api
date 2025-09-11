import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AreaDto {
    @ApiProperty({ example: '1', description: 'Api ID.' })
    @IsString()
    @IsNotEmpty()
    api_id: string;

    @ApiProperty({ example: 'Granild', description: 'The name of the area. Also the name of the faction.' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Soldier where the first to construct here, military area.', description: 'The description of the faction/area.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 0.42, description: 'The position in the world on x axis between 0 and 1.' })
    @IsNumber()
    @IsNotEmpty()
    position_x: number;

    @ApiProperty({ example: 0.86, description: 'The position in the world on y axis between 0 and 1.' })
    @IsNumber()
    @IsNotEmpty()
    position_y: number;
}

export class UpdateAreaDto extends PartialType(AreaDto) { }
