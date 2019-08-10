import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { Project as ProjectInterface } from '../interfaces/project';
import { projectSchema } from '../schemas/project-schema';

export interface ProjectModel extends ProjectInterface, Document {}

export interface ProjectModelStatic extends Model<ProjectModel> {}

export const Project = mongoose.model<ProjectModel, ProjectModelStatic>(
  'Project',
  projectSchema
);
