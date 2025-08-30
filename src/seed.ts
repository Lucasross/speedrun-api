import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobService } from './job/job.service';
import { StatService } from './stat/stat.service';
import { Logger } from '@nestjs/common';
import { SkillService } from './skill/skill.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const statService = app.get(StatService);
    const jobService = app.get(JobService);
    const skillService = app.get(SkillService);


    const logger = new Logger("Seed");

    const arg = process.argv[2];

    logger.log(`Start with ${arg ? arg : "all"}`);

    if (arg === 'stat' || !arg) await statService.seed();
    if (arg === 'job' || !arg) await jobService.seed();
    if (arg === 'skill' || !arg) await skillService.seed();

    await app.close();
    logger.log('Finish');
}

bootstrap();