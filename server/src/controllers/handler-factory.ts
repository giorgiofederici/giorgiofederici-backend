import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import { catchAsync } from '../utils/catch-async';
import { APIFeatures } from '../utils/api-features';
import { AppError } from '../errors/app-error';
import { APIResponse, sendAPIResponse } from '../utils/api-response';

export const getAll = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const doc = await features.query.explain();
    const docs = await features.query;

    // SEND RESPONSE
    const getAllResponse: APIResponse = {
      // JSend specification
      status: 'success',
      results: docs.length,
      data: {
        data: docs
      }
    };

    sendAPIResponse(res, 200, getAllResponse);
  });

export const getOne = (Model: Model<Document>, popOptions?: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const getOneResponse: APIResponse = {
      // JSend specification
      status: 'success',
      data: {
        data: doc
      }
    };
    sendAPIResponse(res, 200, getOneResponse);
  });

export const createOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await Model.create(req.body);

    const createOneResponse: APIResponse = {
      status: 'success',
      data: {
        data: newDoc
      }
    };
    sendAPIResponse(res, 201, createOneResponse);
  });

export const updateOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const updateOneResponse: APIResponse = {
      status: 'success',
      data: {
        data: doc
      }
    };
    sendAPIResponse(res, 200, updateOneResponse);
  });

export const deleteOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const deleteOneResponse: APIResponse = {
      status: 'success',
      data: null
    };
    sendAPIResponse(res, 204, deleteOneResponse);
  });
