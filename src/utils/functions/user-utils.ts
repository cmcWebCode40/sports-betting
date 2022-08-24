import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';
import { USER_AUTH_TOKEN } from '../../constants/local-storage.constants';

export default createBrowserHistory();

interface SaveLocalStorageData<T> {
  name: string;
  data: T;
}

class UserUtils {
  public static saveLocalStoreItem = <T>({ name, data }: SaveLocalStorageData<T>): void => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  public static saveUserToken = (token: string): void => {
    Cookies.set(USER_AUTH_TOKEN, token);
  };

  public static removeCookie = (): void => {
    Cookies.remove(USER_AUTH_TOKEN);
  };

  public static getUserToken = (): string | undefined => {
    const token = Cookies.get(USER_AUTH_TOKEN);
    return token;
  };
}

export { UserUtils };
