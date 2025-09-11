import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorDto, UpdateSectorDto } from './sector.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Sector')
@ApiBearerAuth('admin-token')
@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: SectorDto })
  create(@Body() createSectorDto: SectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.sectorService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(+id, updateSectorDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.sectorService.remove(+id);
  }
}
