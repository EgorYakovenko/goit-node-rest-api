import mongoose from 'mongoose';
import Joi from 'joi';

import { mongooseError } from '../helpers/mongooseError.js';

const { Schema, model } = mongoose;

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
			type: String,
		}, 
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  
  { versionKey: false, timeseries: true }
);

userSchema.post('save', mongooseError);

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required().min(6),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required().min(6),
});

export const User = model('user', userSchema);
