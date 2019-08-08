import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { Skill as SkillInterface } from '../interfaces/skill';
import { skillSchema } from '../schemas/skill-schema';

export interface SkillModel extends SkillInterface, Document {}

export interface SkillModelStatic extends Model<SkillModel> {}

export const Skill = mongoose.model<SkillModel, SkillModelStatic>(
  'Skill',
  skillSchema
);
