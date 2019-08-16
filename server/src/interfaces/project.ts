import mongoose from 'mongoose';

export interface Project {
  name?: string;
  description?: string;
  image?: string;
  repository: string;
  link?: string;
  index?: number;
  skills?: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  modifiedAt?: Date;
}
