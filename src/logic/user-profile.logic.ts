import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IErrorArgs } from '../models/error-handler.model';
import { apiServer } from '../services/services';
import { UserUtils } from '../utils/functions/user-utils';

const { getUserToken } = UserUtils;

interface IProfile {
  profilePics: string;
  email: string;
  id: number;
  newsBulletin: string;
  username: string;
}

export type IApiResponse = {
  data: IProfile;
  message: string;
  status: string;
};

export interface IUserResponse {
  data: IApiResponse;
}

export interface IUserProfileFn<T> {
  method?: 'post' | 'get' | 'patch' | 'put';
  data?: T;
}

export interface IUserProfile {
  token: string;
  password: string;
  confirmPassword?: string;
}

export const UserProfileSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const headers = {
  'content-Type': 'application/json',
  Authorization: getUserToken(),
};
export const userProfileFn = <TData, TResponse>({
  data,
  method,
}: IUserProfileFn<TData>): Promise<TResponse> => {
  if (method === 'get') {
    return apiServer.get(`/user/my-profile`, { headers });
  }
  return apiServer.put(`/user/my-profile`, data, { headers });
};

export const onError = (error: IErrorArgs): void | Promise<unknown> => {
  toast.error(error.response.data.message);
};

export const onSuccess = (res: { data: { message: string } }): void => {
  toast.success(res.data.message);
};
export {};
