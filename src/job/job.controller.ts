import { Controller, Get, NotFoundException, Param, UseGuards, Delete, Body, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Jobs')
@ApiBearerAuth('admin-token')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les jobs' })
  @ApiResponse({ status: 200, description: 'Liste des jobs' })
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un job par ID' })
  @ApiParam({ name: 'id', type: Number })
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
    @ApiBody({
    description: 'Création d’un job',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Guerrier' },
        power: { type: 'number', example: 100 },
      },
      required: ['title', 'power'],
    },
  })
  @ApiResponse({ status: 200, description: 'Job créé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async create(@Body() body: any) {
    return this.jobService.create(body);
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
}