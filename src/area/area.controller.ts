import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaDto, UpdateAreaDto } from './area.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Area')
@ApiBearerAuth('admin-token')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create an area' })
  @ApiResponse({ status: 200, description: 'Area created' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiBody({ type: AreaDto })
  create(@Body() createAreaDto: AreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all areas' })
  @ApiResponse({ status: 200, description: "Area's list" })
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an area by id' })
  @ApiResponse({ status: 200, description: 'Area found' })
  @ApiResponse({ status: 404, description: 'Area not found' })
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(id, updateAreaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an area by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Area deleted' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  remove(@Param('id') id: string) {
    return this.areaService.remove(id);
  }
}
