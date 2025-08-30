import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillDto, UpdateSkillDto } from './skill.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Skills')
@ApiBearerAuth('admin-token')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a skill' })
  @ApiResponse({ status: 200, description: 'Skill created' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiBody({ type: SkillDto })
  create(@Body() createSkillDto: SkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: "Skill's list" })
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a skill by id' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  @Get(':id/job')
  @ApiOperation({ summary: 'Get a skill by id with job' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOneWithSkill(@Param('id') id: string) {
    return this.skillService.findOneWithJob(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a skill by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Skill deleted' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @ApiOperation({ summary: 'Update a skill' })
  @ApiResponse({ status: 200, description: 'Skill updated' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiBody({ type: SkillDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }
}
