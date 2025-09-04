import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stat, StatDocument } from './stat.schema';

@Injectable()
export class StatService {
    private readonly logger = new Logger(StatService.name);

    constructor(
        @InjectModel(Stat.name)
        private readonly statModel: Model<StatDocument>,
    ) { }

    findAll() {
        return this.statModel.find().exec();
    }

    async seed() {
        const count = await this.statModel.countDocuments();

        this.logger.log("[Seed] Start");

        // Supprime tous les jobs existants avant de reseed
        await this.statModel.collection.drop().catch(err => {
            if (err.code === 26) {
                this.logger.log('[Seed] Collection is empty, no need to drop.');
            } else {
                throw err;
            }
        });

        await this.statModel.insertMany([
            // ================ ATTRIBUTES ================ 5
            { name: 'Strength', description: 'Increases physical power and raw damage.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },
            { name: 'Constitution', description: 'Increases health and physical resistance.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },
            { name: 'Agility', description: 'Improves attack speed and dodge chance.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },
            { name: 'Perseverance', description: 'Improves defense and tenacity.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },
            { name: 'Faith', description: 'Improves holy power and mana regeneration.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },
            { name: 'Magic', description: 'Improves magic power and magic resistance.', type: 'attribute', usages: ['job', 'skill'], weight: 1, default: 5 },

            // ================ COMMON ================ 6
            { name: 'Base Health', description: 'Base health of the job.', type: 'common', usages: ['job'], weight: 1, default: 100 },
            { name: 'Grow Health', description: 'Health % gain per level.', type: 'common', usages: ['job'], weight: 15, default: 0.01 },
            { name: 'Base Damage', description: 'Base damage of the job.', type: 'common', usages: ['job'], weight: 1, default: 20 },
            { name: 'Grow Damage', description: 'Damage % gain per level.', type: 'common', usages: ['job'], weight: 15, default: 0.01 },
            { name: 'Base Mana', description: 'Base mana of the job.', type: 'common', usages: ['job'], weight: 0.8, default: 0 },
            { name: 'Grow Mana', description: 'Mana % gain per level.', type: 'common', usages: ['job'], weight: 12, default: 0.01 },
            { name: 'Health', description: 'Flat increase to health.', type: 'common', usages: ['job', 'skill'], weight: 1, default: 0 },
            { name: 'Health %', description: 'Percentage increase to health.', type: 'common', usages: ['job', 'skill'], weight: 1, default: 0 },
            { name: 'Damage', description: 'Flat increase to overall damage.', type: 'common', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Damage %', description: 'Percentage increase to overall damage.', type: 'common', usages: ['job', 'skill'], weight: 2, default: 0 },

            // ================ PHYSICAL ================= 18
            { name: 'Critical Chance', description: 'Increases chance to deal a critical hit.', type: 'physical', usages: ['job', 'skill'], weight: 3.5, default: 0 },
            { name: 'Critical Damage', description: 'Flat bonus to critical hit damage.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Attack Speed', description: 'Flat bonus to attack speed.', type: 'physical', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Double Hit', description: 'Flat chance to perform an additional hit.', type: 'physical', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Heavy Damage', description: 'Flat bonus to physical hit damage.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Heavy Damage %', description: 'Percentage increase to physical damage.', type: 'physical', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Swift Damage', description: 'Flat bonus to physical hit damage.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Swift Damage %', description: 'Percentage increase to physical damage.', type: 'physical', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Physical Resistance', description: 'Flat reduction to physical damage taken.', type: 'physical', usages: ['job', 'skill'], weight: 1, default: 0 },
            { name: 'Physical Resistance %', description: 'Percentage reduction to physical damage taken.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Dodge', description: 'Flat chance to evade an attack.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Block', description: 'Flat chance to block an attack.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Thorns', description: 'Flat amount of damage reflected to attackers.', type: 'physical', usages: ['job', 'skill'], weight: 1.5, default: 0 },
            { name: 'Thorns %', description: 'Percentage of damage reflected to attackers.', type: 'physical', usages: ['job', 'skill'], weight: 3, default: 0 },

            // ================ MAGIC ==================== 30
            { name: 'Mana', description: 'Flat increase to maximum mana.', type: 'magic', usages: ['job', 'skill'], weight: 0.5, default: 0 },
            { name: 'Mana %', description: 'Percentage increase to maximum mana.', type: 'magic', usages: ['job', 'skill'], weight: 1, default: 0 },
            { name: 'Magic Damage', description: 'Flat increase to all magic damage.', type: 'magic', usages: ['job', 'skill'], weight: 3.5, default: 0 },
            { name: 'Magic Damage %', description: 'Percentage increase to all magic damage.', type: 'magic', usages: ['job', 'skill'], weight: 5, default: 0 },
            { name: 'Fire Damage', description: 'Flat increase to fire damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Fire Damage %', description: 'Percentage increase to fire damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Water Damage', description: 'Flat increase to water damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Water Damage %', description: 'Percentage increase to water damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Earth Damage', description: 'Flat increase to earth damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Earth Damage %', description: 'Percentage increase to earth damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Wind Damage', description: 'Flat increase to wind damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Wind Damage %', description: 'Percentage increase to wind damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Light Damage', description: 'Flat increase to light damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Light Damage %', description: 'Percentage increase to light damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Shadow Damage', description: 'Flat increase to shadow damage.', type: 'magic', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Shadow Damage %', description: 'Percentage increase to shadow damage.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Magic Resistance', description: 'Flat reduction to magic damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 2.5, default: 0 },
            { name: 'Magic Resistance %', description: 'Percentage reduction to magic damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 3, default: 0 },
            { name: 'Fire Resistance', description: 'Flat reduction to fire damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Fire Resistance %', description: 'Percentage reduction to fire damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },
            { name: 'Water Resistance', description: 'Flat reduction to water damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Water Resistance %', description: 'Percentage reduction to water damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },
            { name: 'Earth Resistance', description: 'Flat reduction to earth damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Earth Resistance %', description: 'Percentage reduction to earth damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },
            { name: 'Wind Resistance', description: 'Flat reduction to wind damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Wind Resistance %', description: 'Percentage reduction to wind damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },
            { name: 'Light Resistance', description: 'Flat reduction to light damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Light Resistance %', description: 'Percentage reduction to light damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },
            { name: 'Shadow Resistance', description: 'Flat reduction to shadow damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.3, default: 0 },
            { name: 'Shadow Resistance %', description: 'Percentage reduction to shadow damage taken.', type: 'magic', usages: ['job', 'skill'], weight: 1.6, default: 0 },

            // ================ REGENERATION ============= 8
            { name: 'Life Regeneration', description: 'Flat health restored over time.', type: 'regeneration', usages: ['job', 'skill'], weight: 5, default: 0 },
            { name: 'Life Regeneration %', description: 'Percentage increase to health regeneration.', type: 'regeneration', usages: ['job', 'skill'], weight: 20, default: 0 },
            { name: 'Life Steal', description: 'Flat health stolen on hit.', type: 'regeneration', usages: ['job', 'skill'], weight: 4, default: 0 },
            { name: 'Life Steal %', description: 'Percentage increase to health stolen on hit.', type: 'regeneration', usages: ['job', 'skill'], weight: 20, default: 0 },
            { name: 'Mana Regeneration', description: 'Flat mana restored over time.', type: 'regeneration', usages: ['job', 'skill'], weight: 4, default: 0 },
            { name: 'Mana Regeneration %', description: 'Percentage increase to mana regeneration.', type: 'regeneration', usages: ['job', 'skill'], weight: 12, default: 0 },
            { name: 'Mana Steal', description: 'Flat mana stolen on hit.', type: 'regeneration', usages: ['job', 'skill'], weight: 2, default: 0 },
            { name: 'Mana Steal %', description: 'Percentage increase to mana stolen on hit.', type: 'regeneration', usages: ['job', 'skill'], weight: 4, default: 0 },

            // ================ SKILLS ============= 2
            { name: 'Cooldown', description: 'Duration between to usage.', type: 'common', usages: ['skill'], weight: -2, default: 0 },
            { name: 'Mana Cost', description: 'Mana cost when used.', type: 'magic', usages: ['skill'], weight: -1, default: 0 },
        ]);

        this.logger.log("[Seed] Finish");
    }
}
