import express from 'express';
import { Document } from 'mongoose';

export interface APIResponse {
  status: string;
  results?: number;
  data: {
    data: Document | Document[];
  };
}

export const sendAPIResponse = (
  res: express.Response,
  statusCode: number,
  apiResponse: APIResponse
) => {
  res.status(statusCode).json(apiResponse);
};
