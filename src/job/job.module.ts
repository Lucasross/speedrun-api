import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job, JobSchema } from './job.schema';
import { Id, IdSchema } from '../id/id.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Job.name, schema: JobSchema },
      { name: Id.name, schema: IdSchema }
    ])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule { }
