import crypto from 'crypto';
import { Schema } from 'mongoose';
import validator from 'validator';
import bycript from 'bcryptjs';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please, tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please, provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please, provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(val: string) {
        return val === this.password;
      },
      msg: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

schema.pre('save', async function(next) {
  // Only run this function if password was actually modified

  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password with cost of 12
  this['password'] = await bycript.hash(this['password'], 12);

  // Delete the password confirm field
  this['passwordConfirm'] = undefined;
  next();
});

schema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  // 1s in the past to avoid issues with jtw creation time
  this['passwordChangedAt'] = Date.now() - 1000;
  next();
});

schema.pre('/^find/', function(next) {
  // this points to the current query
  this['find']({ active: { $ne: false } });
  next();
});

schema.methods.correctPassword = async function(
  candidatePassword: string,
  userPassword: string
) {
  // this.password --> Not available because select: false
  return await bycript.compare(candidatePassword, userPassword);
};

schema.methods.changedPasswordAfter = function(JWTTimestamp: any) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

schema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const userSchema = schema;
