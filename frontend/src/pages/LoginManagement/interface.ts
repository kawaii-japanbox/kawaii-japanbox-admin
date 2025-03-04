export interface IVerifyCodeRequest {
  email: string;
  otp: string;
  action: string;
}

export interface IResetPasswordRequest {
  email: string;
  newPassword: string;
}
