import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Id, IdSchema } from 'src/id/id.schema';
import { Equipment, EquipmentSchema } from './equipment.schema';
import { Area, AreaSchema } from 'src/area/area.schema';
import { Monster, MonsterSchema } from 'src/monster/monster.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
      { name: Area.name, schema: AreaSchema },
      { name: Monster.name, schema: MonsterSchema },
      { name: Id.name, schema: IdSchema },
    ]),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule { }
