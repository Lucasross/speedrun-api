import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stat, StatSchema } from './stat.schema';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stat.name, schema: StatSchema },
    ]),
  ],
  controllers: [StatController],
  providers: [StatService],
  exports: [StatService],
})
export class StatModule {}
