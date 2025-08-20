import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { Id, IdDocument } from '../id/id.schema';

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

    async create(job: { name: string; power: number }) {
        const _id = await this.getNextId('job');
        const newJob = new this.jobModel({ ...job, _id });
        return newJob.save();
    }

    async remove(id: string) {
        return this.jobModel.findByIdAndDelete(id).exec();
    }
}
