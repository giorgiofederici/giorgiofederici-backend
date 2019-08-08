import * as handlerFactory from '../controllers/handler-factory';
import { Skill } from '../models/skill-model';

export const getAllSkills = handlerFactory.getAll(Skill);

export const getSkill = handlerFactory.getOne(Skill);

export const createSkill = handlerFactory.createOne(Skill);

export const updateSkill = handlerFactory.updateOne(Skill);

export const deleteSkill = handlerFactory.deleteOne(Skill);
