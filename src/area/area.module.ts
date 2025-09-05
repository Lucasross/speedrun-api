import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area, AreaSchema } from './area.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Id, IdSchema } from 'src/id/id.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Area.name, schema: AreaSchema },
      { name: Id.name, schema: IdSchema },
    ]),
  ],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule { }
