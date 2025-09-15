import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobService } from './job/job.service';
import { StatService } from './stat/stat.service';
import { Logger } from '@nestjs/common';
import { SkillService } from './skill/skill.service';
import { AreaService } from './area/area.service';
import { MonsterService } from './monster/monster.service';
import { SectorService } from './sector/sector.service';
import { EquipmentService } from './equipment/equipment.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const statService = app.get(StatService);
    const jobService = app.get(JobService);
    const skillService = app.get(SkillService);
    const areaService = app.get(AreaService);
    const monsterService = app.get(MonsterService);
    const sectorService = app.get(SectorService);
    const equipmentService = app.get(EquipmentService);

    const logger = new Logger("Seed");

    const arg = process.argv[2];

    logger.log(`Start with ${arg ? arg : "all"}`);

    if (arg === 'stat' || !arg) await statService.seed();
    if (arg === 'job' || !arg) await jobService.seed();
    if (arg === 'skill' || !arg) await skillService.seed();
    if (arg === 'area' || !arg) await areaService.seed();
    if (arg === 'monster' || !arg) await monsterService.seed();
    if (arg === 'sector' || !arg) await sectorService.seed();
    if (arg === 'equipment' || !arg) await equipmentService.seed();

    await app.close();
    logger.log('Finish');
}

bootstrap();