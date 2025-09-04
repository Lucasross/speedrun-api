import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { Skill, SkillSchema } from './skill.schema';
import { JobModule } from 'src/job/job.module';
import { Job, JobSchema } from 'src/job/job.schema';
import { Id, IdSchema } from 'src/id/id.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
    { name: Skill.name, schema: SkillSchema },
    { name: Job.name, schema: JobSchema },
    { name: Id.name, schema: IdSchema }
  ]), JobModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
