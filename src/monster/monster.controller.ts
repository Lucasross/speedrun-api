import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterDto, UpdateMonsterDto } from './monster.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Monster')
@ApiBearerAuth('admin-token')
@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: MonsterDto })
  create(@Body() createMonsterDto: MonsterDto) {
    return this.monsterService.create(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monsterService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.monsterService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monsterService.update(+id, updateMonsterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.monsterService.remove(+id);
  }
}
