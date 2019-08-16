import mongoose from 'mongoose';

export const schema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name.'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A project must have a description.']
  },
  image: String,
  repository: String,
  link: String,
  index: Number,
  skills: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Skill'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  modifiedAt: {
    type: Date,
    default: Date.now()
  }
});

schema.pre('save', function(next) {
  if (this.isNew) {
    return next();
  }
  this['modifiedAt'] = Date.now();
  next();
});

export const projectSchema = schema;
