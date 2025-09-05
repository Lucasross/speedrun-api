import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AreaDto, UpdateAreaDto } from './area.dto';
import { Area, AreaDocument } from './area.schema';
import { Id, IdDocument } from '../id/id.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AreaService {
  private readonly logger = new Logger(AreaService.name);

  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
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

  async create(createAreaDto: AreaDto) {
    const _id = await this.getNextId('area');
    createAreaDto['_id'] = _id;
    const newArea = new this.areaModel(createAreaDto);
    return newArea.save();
  }

  findAll() {
    return this.areaModel.find().exec();
  }

  async findOne(id: string) {
    const area = await this.areaModel.findById(id).exec();
    if (!area) throw new NotFoundException('Area not found');
    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const updated = await this.areaModel
      .findByIdAndUpdate(id, updateAreaDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Area not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.areaModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Area not found');
    return deleted;
  }

  async seed() {
    this.logger.log('[Seed] Start Skills');

    // Définir un skill par défaut
    const areas: AreaDto[] = [
      {
        name: 'Wendalavir', 
        description: 'A peaceful area surrounded by plains and forest.',
        position_x: 0.5,
        position_y: 0.5,
      }
    ];

    // Supprime tous les skills existants avant de reseed
    await this.areaModel.collection.drop().catch(err => {
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
    for (const area of areas) {
      await this.create(area);
      this.logger.log(`[Seed] Create area : ${area.name}`);
    }

    this.logger.log('[Seed] Finish Skills');
  }
}
