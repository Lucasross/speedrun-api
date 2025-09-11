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
    const api_id = await this.getNextId('area');
    createAreaDto['api_id'] = api_id;
    const newArea = new this.areaModel(createAreaDto);
    return newArea.save();
  }

  findAll() {
    return this.areaModel.find().exec();
  }

  async findOne(id: string) {
    const area = await this.areaModel.find({ api_id: id }).populate('sectors').exec();
    if (!area) throw new NotFoundException('Area not found');
    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const updated = await this.areaModel
      .findOneAndUpdate({ api_id: id }, updateAreaDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Area not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.areaModel.findOneAndDelete({ api_id: id }).exec();
    if (!deleted) throw new NotFoundException('Area not found');
    return deleted;
  }

  async seed() {
    this.logger.log('[Seed] Start Areas');

    // Définir un area par défaut
    const areas: AreaDto[] = [
      {
        api_id: "1",
        name: 'Wendalavir',
        description: 'A peaceful area surrounded by plains and forest.',
        position_x: 0.5,
        position_y: 0.5,
      }
    ];

    // Supprime tous les areas existants avant de reseed
    await this.areaModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('[Seed] Area collection is empty, no need to drop.');
      } else {
        throw err;
      }
    });

    // Reset le counter (si tu as un compteur de areas)
    await this.idModel.findByIdAndUpdate(
      'area',
      { seq: 0 },
      { upsert: true }
    );

    // Crée les areas
    for (const area of areas) {
      await this.create(area);
      this.logger.log(`[Seed] Create area : ${area.name}`);
    }

    this.logger.log('[Seed] Finish Areas');
  }
}
