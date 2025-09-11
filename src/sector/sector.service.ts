import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SectorDto, UpdateSectorDto } from './sector.dto';
import { Sector, SectorDocument } from './sector.schema';
import { Id, IdDocument } from '../id/id.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Monster, MonsterDocument } from 'src/monster/monster.schema';
import { Area, AreaDocument } from 'src/area/area.schema';

@Injectable()
export class SectorService {
  private readonly logger = new Logger(SectorService.name);

  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    @InjectModel(Monster.name) private monsterModel: Model<MonsterDocument>,
    @InjectModel(Sector.name) private sectorModel: Model<SectorDocument>,
    @InjectModel(Id.name) private idModel: Model<IdDocument>,
  ) { }

  private async getNextId(): Promise<string> {
    const counter = await this.idModel.findByIdAndUpdate(
      "sector",
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq.toString();
  }

  async create(createSectorDto: SectorDto) {
    const api_id = await this.getNextId();
    createSectorDto['api_id'] = api_id;
    const newSector = new this.sectorModel(createSectorDto);
    return newSector.save();
  }

  findAll() {
    return this.sectorModel.find().exec();
  }

  async findOne(id: number) {
    const sector = await this.sectorModel.findOne({ api_id: id }).exec();
    if (!sector) throw new NotFoundException('Sector not found');
    return sector;
  }

  async update(id: number, updateSectorDto: UpdateSectorDto) {
    const updated = await this.sectorModel
      .findOneAndUpdate({ api_id: id }, updateSectorDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Sector not found');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.sectorModel.findOneAndDelete({ api_id: id }).exec();
    if (!deleted) throw new NotFoundException('Sector not found');
    return deleted;
  }

  async seed() {
    this.logger.log('[Seed] Start Sectors');

    const firstArea = await this.areaModel.findOne({ api_id: "1" }).exec();
    const firstMonster = await this.monsterModel.findOne({ api_id: "1" }).exec();

    // Définir un sector par défaut
    const sectors: SectorDto[] = [
      {
        api_id: "1",
        name: 'Green valleys',
        description: 'A slighty fat wolf.',
        level_min: 1,
        level_max: 5,
        monster_density: 4,
        respawn_rate: 2.5,
        area: firstArea!._id as Types.ObjectId,
        monsters: [firstMonster!._id as Types.ObjectId]
      }
    ];

    // Supprime tous les sectors existants avant de reseed
    await this.sectorModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('[Seed] Sector collection is empty, no need to drop.');
      } else {
        throw err;
      }
    });

    // Reset le counter (si tu as un compteur de sectors)
    await this.idModel.findByIdAndUpdate(
      'sector',
      { seq: 0 },
      { upsert: true }
    );

    // Crée les sectors
    for (const sector of sectors) {
      await this.create(sector);
      this.logger.log(`[Seed] Create sector : ${sector.name}`);
    }

    this.logger.log('[Seed] Finish Sectors');
  }
}
