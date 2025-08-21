import { Controller, Get, NotFoundException, Param, UseGuards, Delete, Body, Post, Put } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JobDto, UpdateJobDto } from './job.dto';

@ApiTags('Jobs')
@ApiBearerAuth('admin-token')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les jobs' })
  @ApiResponse({ status: 200, description: 'Liste des jobs' })
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un job par ID' })
  @ApiResponse({ status: 200, description: 'Job trouvé' })
  @ApiResponse({ status: 404, description: 'Job non trouvé' })
  async findOne(@Param('id') id: string): Promise<Job> {
    const job = await this.jobService.findOne(id);

    if (!job)
      throw new NotFoundException(`No job found with id ${id}`)

    return job;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Créer un job' })
  @ApiResponse({ status: 200, description: 'Job créé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBody({ type: JobDto })
  async create(@Body() dto: JobDto) {
    return this.jobService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un job par ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Job supprimé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async delete(@Param('id') id: string) {
    return this.jobService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @ApiOperation({ summary: 'Update a job' })
  @ApiResponse({ status: 200, description: 'Job updated' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No job found' })
  @ApiBody({ type: JobDto })
  async update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobService.update(id, dto);
  }
}