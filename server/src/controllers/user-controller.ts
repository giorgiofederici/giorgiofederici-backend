import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { User, UserModel } from '../models/user-model';
import { catchAsync } from '../utils/catch-async';
import { AppError } from '../errors/app-error';
import * as handlerFactory from '../controllers/handler-factory';

/*
 * This storage saves file into a folder in the fs
 * It's better to user a memory storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req['user'].id}-${Date.now()}.${ext}`);
  }
});
*/
const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please, upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next();
    }

    req.file.filename = `user-${req['user'].id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  }
);

const filterObj = (obj: any, ...allowedFields: string[]): any => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req['user'].id;
  next();
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create an error if user try to update the password
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password update. Please, use /updateMyPassword',
          400
        )
      );
    }

    // 3) Filtered out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) {
      filteredBody.photo = req.file.filename;
    }

    // 3) If not, update the user document
    const updatedUser = await User.findByIdAndUpdate(
      req['user'].id,
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  }
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req['user'].id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please, use Sign up instead.'
  });
};

export const getAllUsers = handlerFactory.getAll(User);
export const getUser = handlerFactory.getOne(User);
// Do not update password with this
export const updateUser = handlerFactory.updateOne(User);
export const deleteUser = handlerFactory.deleteOne(User);
