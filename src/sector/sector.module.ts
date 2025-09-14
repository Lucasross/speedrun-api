import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Id, IdSchema } from 'src/id/id.schema';
import { Sector, SectorSchema } from './sector.schema';
import { Area, AreaSchema } from 'src/area/area.schema';
import { Monster, MonsterSchema } from 'src/monster/monster.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sector.name, schema: SectorSchema },
      { name: Area.name, schema: AreaSchema },
      { name: Monster.name, schema: MonsterSchema },
      { name: Id.name, schema: IdSchema },
    ]),
  ],
  controllers: [SectorController],
  providers: [SectorService],
})
export class SectorModule { }
