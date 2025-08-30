import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { Id, IdDocument } from '../id/id.schema';
import { JobDto, UpdateJobDto } from './job.dto';
import { StatService } from 'src/stat/stat.service';
import { Skill, SkillDocument } from 'src/skill/skill.schema';

@Injectable()
export class JobService {
    private readonly logger = new Logger(JobService.name);

    constructor(
        @InjectModel(Job.name) private jobModel: Model<JobDocument>,
        @InjectModel(Id.name) private idModel: Model<IdDocument>,
        @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
        private readonly statService: StatService,
    ) { }

    private async getNextId(name: string): Promise<number> {
        const counter = await this.idModel.findByIdAndUpdate(
            name,
            { $inc: { seq: 1 } },
            { new: true, upsert: true },
        );
        return counter.seq;
    }

    findAll() {
        return this.jobModel.find().populate("skills").exec();
    }

    findOne(id: string) {
        return this.jobModel.findById(id).exec();
    }

    async create(dto: JobDto) {
        const _id = await this.getNextId('job');
        const newJob = new this.jobModel({ ...dto, _id });
        return newJob.save();
    }

    async remove(id: string) {
        return this.jobModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: UpdateJobDto) {
        return this.jobModel.findByIdAndUpdate(id, dto, {
            new: true,       // retourne le document mis à jour
            runValidators: true // applique les validateurs du schéma
        }).exec();
    }

    async skills(id: string) {
        // Vérifie que le job existe
        const jobExists = await this.jobModel.findById(id);

        if (!jobExists) 
            throw new NotFoundException('Job not found');

        // Récupère les skills associés
        return this.skillModel.find({ job: id }).exec();
    }

    async seed() {
        this.logger.log("[Seed] Start");

        const stats = await this.statService.findAll();
        const defaultStats = stats.reduce((acc, stat) => {
            acc[stat.name] = stat.defaultValue ?? 0;
            return acc;
        }, {} as Record<string, number>);

        const jobs: JobDto[] = [
            { name: "Warrior", description: "A fierce human.", stats: defaultStats }
        ];

        // Supprime tous les jobs existants avant de reseed
        await this.jobModel.collection.drop().catch(err => {
            if (err.code === 26) {
                console.log('[Seed] Collection is empty, no need to drop.');
            } else {
                throw err;
            }
        });

        // Reset le counter
        await this.idModel.findByIdAndUpdate(
            'job',
            { seq: 0 },
            { upsert: true }
        );

        // Crée les jobs
        for (const job of jobs) {
            await this.create(job as any);
            this.logger.log(`[Seed] Create job : ${job.name}`);
        }

        this.logger.log("[Seed] Finish");
    }
}
