import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      ssl: true,  
      family: 4,
      serverSelectionTimeoutMS: 5000,}), 
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
