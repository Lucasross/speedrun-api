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

    private async getNextId(name: string): Promise<string> {
        const counter = await this.idModel.findByIdAndUpdate(
            name,
            { $inc: { seq: 1 } },
            { new: true, upsert: true },
        );
        return counter.seq.toString();
    }

    findAll() {
        return this.jobModel.find().populate("skills").exec(); //.populate("skills")
    }

    async findOne(id: string) {
        const job = await this.jobModel.findOne({ api_id: id }).populate('skills').exec();
        if (!job) throw new NotFoundException('Job not found ' + id);
        return job;
    }

    async create(dto: JobDto) {
        const api_id = await this.getNextId('job');
        dto['api_id'] = api_id;
        const newJob = new this.jobModel(dto);
        return newJob.save();
    }

    async remove(id: string) {
        return this.jobModel.findOneAndDelete({ api_id: id }).exec();
    }

    async update(id: string, dto: UpdateJobDto) {
        return this.jobModel.findOneAndUpdate({ api_id: id }, dto, {
            new: true,       // retourne le document mis à jour
            runValidators: true // applique les validateurs du schéma
        }).exec();
    }

    async seed() {
        this.logger.log("[Seed] Start");

        const jobs: JobDto[] = [
            {
                api_id: "1",
                name: "Warrior", description: "A fierce human.",
                stats: {
                    'Base Health': 100, 'Base Damage': 20,
                    'Heavy Damage %': 20, 'Physical Resistance %': 20, 'Block %': 10,
                    'Life Regeneration %': 1
                }
            }
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
