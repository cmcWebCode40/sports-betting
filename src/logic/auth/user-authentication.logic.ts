import * as yup from 'yup';

import { IUser } from '../../models/user-authentication.model';
import { apiServer } from '../../services/services';

export const passwordRegex =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
export const wrongPasswordMessage =
  'Password must contain at least 8 characters, one uppercase, one number and one special case character';

export interface ISignInInputs {
  email: string;
  password: string;
}

export interface ISignUpInputs {
  username: string;
  email: string;
  password: string;
  isAcceptedPolicies?: boolean;
  newsBulletin?: string;
}

export type IApiResponse = {
  data: IUser;
  message: string;
  status: string;
};

export interface IUserResponse {
  data: IApiResponse;
}

export interface IUserAuthenticationFn<T> {
  method?: 'post' | 'get' | 'patch' | 'put';
  endPoint: string;
  data: T;
}

export interface IResetPassword {
  email: string;
}
export interface IResendPasswordResetLink {
  email: string;
}
export interface IUpdatePassword {
  token: string;
  password: string;
  confirmPassword?: string;
}

export const SignUpSchema = yup.object().shape({
  username: yup.string().min(5).max(10).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  // isAcceptedPolicies: yup.bool().oneOf([true]).optional(),
  isAcceptedNewsLetter: yup.string().optional(),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const ChangePasswordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .when('password', {
      is: (password: string) => password && password.length,
      then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
    }),
});

export const userAuthenticationFn = <TData, TResponse>({
  data,
  endPoint,
  method,
}: IUserAuthenticationFn<TData>): Promise<TResponse> => {
  // if (method === 'get') {
  //   return apiServer.get(`/auth/${endPoint}`);
  // }
  return apiServer[method || 'post'](`/auth/${endPoint}`, data);
};

export {};
