import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EquipmentDto, UpdateEquipmentDto } from './equipment.dto';
import { Equipment, EquipmentDocument } from './equipment.schema';
import { Id, IdDocument } from '../id/id.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Area, AreaDocument } from 'src/area/area.schema';

@Injectable()
export class EquipmentService {
  private readonly logger = new Logger(EquipmentService.name);

  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    @InjectModel(Equipment.name) private equipmentModel: Model<EquipmentDocument>,
    @InjectModel(Id.name) private idModel: Model<IdDocument>,
  ) { }

  private async getNextId(): Promise<string> {
    const counter = await this.idModel.findByIdAndUpdate(
      "equipment",
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq.toString();
  }

  async create(createEquipmentDto: EquipmentDto) {
    const api_id = await this.getNextId();
    createEquipmentDto['api_id'] = api_id;
    const newEquipment = new this.equipmentModel(createEquipmentDto);
    return newEquipment.save();
  }

  findAll() {
    return this.equipmentModel.find().exec();
  }

  async findOne(id: number) {
    const equipment = await this.equipmentModel.findOne({ api_id: id }).exec();
    if (!equipment) throw new NotFoundException('Equipment not found');
    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const updated = await this.equipmentModel
      .findOneAndUpdate({ api_id: id }, updateEquipmentDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Equipment not found');
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.equipmentModel.findOneAndDelete({ api_id: id }).exec();
    if (!deleted) throw new NotFoundException('Equipment not found');
    return deleted;
  }

  async seed() {
    this.logger.log('[Seed] Start Equipments');

    // Récupérer l'area n°1
    const firstArea = await this.areaModel.findOne({name: 'Wendalavir'});
    if (!firstArea) {
      this.logger.error('[Seed] No area found. Please seed areas first.');
      return;
    }

    // Définir un equipment par défaut
    const equipments: EquipmentDto[] = [
      {
        api_id: "1",
        name: 'Sword',
        description: 'A sharp sword.',
        level: 1,
        slot: 'weapon',
        area: firstArea._id as Types.ObjectId,
        stats: {
          'Damage': 10,
        }
      }
    ];

    // Supprime tous les equipments existants avant de reseed
    await this.equipmentModel.collection.drop().catch(err => {
      if (err.code === 26) {
        console.log('[Seed] Equipment collection is empty, no need to drop.');
      } else {
        throw err;
      }
    });

    // Reset le counter (si tu as un compteur de equipments)
    await this.idModel.findByIdAndUpdate(
      'equipment',
      { seq: 0 },
      { upsert: true }
    );

    // Crée les equipments
    for (const equipment of equipments) {
      await this.create(equipment);
      this.logger.log(`[Seed] Create equipment : ${equipment.name}`);
    }

    this.logger.log('[Seed] Finish Equipments');
  }
}
