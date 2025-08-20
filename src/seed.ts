import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobService } from './job/job.service';
import { Model } from 'mongoose';
import { Id, IdDocument } from './id/id.schema';
import { Job, JobDocument } from './job/job.schema';
import { getModelToken } from '@nestjs/mongoose';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const jobService = app.get(JobService);
    const jobModel = app.get<Model<JobDocument>>(getModelToken(Job.name));
    const idModel = app.get<Model<IdDocument>>(getModelToken(Id.name));

    const jobs = [
        { name: 'Guerrier', power: 15 },
        { name: 'Mage', power: 12 },
        { name: 'Voleur', power: 10 },
        { name: 'Paladin', power: 18 },
    ];

    // Supprime tous les jobs existants avant de reseed
    await jobModel.collection.drop().catch(err => {
        if (err.code === 26) {
            console.log('Collection is empty, no need to drop.');
        } else {
            throw err;
        }
    });

    // Reset le counter
    await idModel.findByIdAndUpdate(
        'job',
        { seq: 0 },
        { upsert: true }
    );

    // Crée les jobs
    for (const job of jobs) {
        await jobService.create(job as any);
        console.log(`Create job : ${job.name}`);
    }

    await app.close();
    console.log('Seed terminé !');
}

bootstrap();