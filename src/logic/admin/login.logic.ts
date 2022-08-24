import { IUser } from '../../models/user-authentication.model';
import { apiServer } from '../../services/services';

export type IApiResponse = {
  data: IUser;
  message: string;
  status: string;
};
export interface IUserResponse {
  data: IApiResponse;
}
export interface ISignInInputs {
  email: string;
  password: string;
}
export interface IUserAuthenticationFn<T> {
  method?: 'post' | 'get' | 'patch' | 'put';
  endPoint: string;
  data: T;
}

export const userAuthenticationFn = <TData, TResponse>({
  data,
  endPoint,
  method,
}: IUserAuthenticationFn<TData>): Promise<TResponse> => {
  return apiServer[method || 'post'](`/auth/${endPoint}`, data);
};

export {};
