import { Controller, Get  } from '@nestjs/common';
import { StatService } from './stat.service';
import { Stat } from './stat.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Stats')
@ApiBearerAuth('admin-token')
@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) { }

  @Get()
  @ApiOperation({ summary: 'Get all the statistics' })
  @ApiResponse({ status: 200, description: "Statistics's list" })
  findAll(): Promise<Stat[]> {
    return this.statService.findAll();
  }
}