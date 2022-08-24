export interface IErrorType {
  type: string;
  message: string;
  status: number | string;
}

export type IErrorResponse = {
  data: IErrorType;
  status: number;
  message: string;
};

export type IErrorArgs = {
  response: IErrorResponse;
};
