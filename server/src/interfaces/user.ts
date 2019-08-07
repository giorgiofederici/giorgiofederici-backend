export interface User {
  name?: string;
  email?: string;
  photo?: string;
  role?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  correctPassword?: Function;
  changedPasswordAfter?: Function;
  createPasswordResetToken?: Function;
}
