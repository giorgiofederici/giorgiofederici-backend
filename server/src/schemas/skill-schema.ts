import { Schema } from 'mongoose';

export const schema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'A skill must have a name.'],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: [true, 'A skill must have a type.'],
    enum: {
      values: ['it', 'soft'],
      message: 'A skill type is either: it or soft.'
    }
  },
  experience: {
    type: Number,
    min: [1, 'Skill experience must be greater or requal 1'],
    max: [5, 'Skill experience must be lesser or equal 5'],
    default: 1
  },
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

export const skillSchema = schema;
