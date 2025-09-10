import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Id, IdSchema } from 'src/id/id.schema';
import { Monster, MonsterSchema } from './monster.schema';


@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Monster.name, schema: MonsterSchema },
        { name: Id.name, schema: IdSchema },
      ]),
    ],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}
