/* eslint-disable consistent-return */
// TODO: function Enhancement needed!

import { toast } from 'react-toastify';
import { IErrorArgs, IErrorType } from '../../models/error-handler.model';

const handleError = (error: IErrorArgs): IErrorType => {
  try {
    if (error) {
      if (error.response === undefined) {
        return {
          message: 'Network not available',
          status: 'undefined',
          type: 'NETWORK_NOT_AVAILABLE',
        };
      }
      if (error.response.status === 500) {
        return {
          message: 'Internal Server Error',
          status: error.response.status,
          type: 'SERVER_ERROR',
        };
      }
      if (error.response.status === 404) {
        return {
          message: 'Page not found',
          status: error.response.status,
          type: 'PAGE_NOT_FOUND',
        };
      }
      return {
        message: error?.response?.data?.message,
        status: error.response.status,
        type: error.response.data.type,
      };
    }
  } catch (err) {
    return {
      message: 'An error occurred please try again ',
      status: 'unknown',
      type: error.response.data.type,
    };
  }
  return {
    message: 'An error occurred please try again ',
    status: 'unknown',
    type: 'unknown',
  };
};

type ToastTypes = 'error' | 'warn' | 'success';

export const errorMessageToaster = (
  error: IErrorArgs,
  type: ToastTypes,
): void | Promise<unknown> => {
  const errorDetails = handleError(error);
  toast[type || 'error'](errorDetails.message);
};

export default handleError;
