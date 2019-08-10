import * as handlerFactory from '../controllers/handler-factory';
import { Project } from '../models/project-model';

export const getAllProjects = handlerFactory.getAll(Project);

export const getProject = handlerFactory.getOne(Project);

export const createProject = handlerFactory.createOne(Project);

export const updateProject = handlerFactory.updateOne(Project);

export const deleteProject = handlerFactory.deleteOne(Project);
