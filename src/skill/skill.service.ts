import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './skill.schema';
import { SkillDto, UpdateSkillDto } from './skill.dto';
import { Job, JobDocument } from '../job/job.schema';
import { Id, IdDocument } from '../id/id.schema';

@Injectable()
export class SkillService {
  private readonly logger = new Logger(SkillService.name);

  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(Id.name) private idModel: Model<IdDocument>,
  ) { }

  private async getNextId(name: string): Promise<string> {
    const counter = await this.idModel.findByIdAndUpdate(
      name,
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq.toString();
  }

  async create(skillDto: SkillDto): Promise<Skill> {
    const _id = await this.getNextId('skill');
    skillDto['_id'] = _id;
    const newSkill = new this.skillModel(skillDto);
    return newSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec(); //.populate('job')
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec(); //.populate('job')
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async findOneWithJob(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).populate('job').exec();
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async remove(id: string): Promise<Skill> {
    const deleted = await this.skillModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Skill not found');
    return deleted;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const updated = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .populate('job')
      .exec();
    if (!updated) throw new NotFoundException('Skill not found');
    return updated;
  }

  async seed() {
    this.logger.log('[Seed] Start Skills');

    // Récupérer le job "Warrior"
    const warriorJob = await this.jobModel.findOne({ name: 'Warrior' }).exec();
    if (!warriorJob) {
      this.logger.error('[Seed] No job "Warrior" found. Please seed jobs first.');
      return;
    }

    // Définir un skill par défaut
    const skills: SkillDto[] = [
      {
        name: 'Slash', description: 'A strong hit.', level: 1, stats: { 'Damage': 10, 'Damage %': 5, 'Cooldown': 4 },
        job: warriorJob._id.toString(),
        type: 'single',
      }
    ];

    // Supprime tous les skills existants avant de reseed
    await this.skillModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('[Seed] Skill collection is empty, no need to drop.');
      } else {
        throw err;
      }
    });

    // Reset le counter (si tu as un compteur de skills)
    await this.idModel.findByIdAndUpdate(
      'skill',
      { seq: 0 },
      { upsert: true }
    );

    // Crée les skills
    for (const skill of skills) {
      await this.create(skill);
      this.logger.log(`[Seed] Create skill : ${skill.name} for job: ${warriorJob.name}`);
    }

    this.logger.log('[Seed] Finish Skills');
  }
}
