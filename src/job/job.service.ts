import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { Id, IdDocument } from '../id/id.schema';
import { JobDto, UpdateJobDto } from './job.dto';

@Injectable()
export class JobService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<JobDocument>,
        @InjectModel(Id.name) private idModel: Model<IdDocument>,
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
        return this.jobModel.find().exec();
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
        console.log("Update !" + id);
        return this.jobModel.findByIdAndUpdate(id, dto, {
            new: true,       // retourne le document mis à jour
            runValidators: true // applique les validateurs du schéma
        }).exec();
    }
}
