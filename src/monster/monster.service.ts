import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MonsterDto, UpdateMonsterDto } from './monster.dto';
import { Monster, MonsterDocument } from './monster.schema';
import { Id, IdDocument } from '../id/id.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MonsterService {
  private readonly logger = new Logger(MonsterService.name);

  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<MonsterDocument>,
    @InjectModel(Id.name) private idModel: Model<IdDocument>,
  ) { }

  private async getNextId(): Promise<string> {
    const counter = await this.idModel.findByIdAndUpdate(
      "monster",
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq.toString();
  }

  async create(createMonsterDto: MonsterDto) {
    const _id = await this.getNextId();
    createMonsterDto['_id'] = _id;
    const newMonster = new this.monsterModel(createMonsterDto);
    return newMonster.save();
  }

  findAll() {
    return this.monsterModel.find().exec();
  }

  async findOne(id: number) {
    const monster = await this.monsterModel.findById(id).exec();
    if (!monster) throw new NotFoundException('Monster not found');
    return monster;
  }

  async update(id: number, updateMonsterDto: UpdateMonsterDto) {
    const updated = await this.monsterModel
      .findByIdAndUpdate(id, updateMonsterDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Monster not found');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.monsterModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Monster not found');
    return deleted;
  }

  async seed() {
    this.logger.log('[Seed] Start Monsters');

    // Définir un monster par défaut
    const monsters: MonsterDto[] = [
      {
        name: 'Wolf',
        description: 'A slighty fat wolf.',
        stats: {
          'Base Health': 100, 'Base Damage': 20,
          'Heavy Damage': 30, 'Physical Resistance': 20, 'Block %': 20,
        }
      }
    ];

    // Supprime tous les monsters existants avant de reseed
    await this.monsterModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('[Seed] Monster collection is empty, no need to drop.');
      } else {
        throw err;
      }
    });

    // Reset le counter (si tu as un compteur de monsters)
    await this.idModel.findByIdAndUpdate(
      'monster',
      { seq: 0 },
      { upsert: true }
    );

    // Crée les monsters
    for (const monster of monsters) {
      await this.create(monster);
      this.logger.log(`[Seed] Create monster : ${monster.name}`);
    }

    this.logger.log('[Seed] Finish Monsters');
  }
}
