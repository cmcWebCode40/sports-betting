export type IUserData = {
  email: string;
  id: number;
  newsBulletin: string;
  username: string;
  Authorization: string;
};

export interface IUserPayLoad {
  isNewUser?: boolean;
  userData: IUserData;
}

export interface IUser extends IUserData {
  createdAt: string;
  updatedAt: string;
}
