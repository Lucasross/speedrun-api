import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      ssl: true,  
      family: 4,
      serverSelectionTimeoutMS: 5000,}), 
    JobModule, AuthModule, StatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
