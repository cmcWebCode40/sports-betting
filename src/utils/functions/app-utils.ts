interface ISaveLocalStorageData<T> {
  name: string;
  data: T;
}

interface IGetLocalStorageData<T> {
  name: string;
  type: T;
}

class AppUtils {
  public static saveLocalStoreItem = <T>({ name, data }: ISaveLocalStorageData<T>): void => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  public static getLocalStoreItem = <T>({ name, type }: IGetLocalStorageData<T>): T => {
    const items = localStorage.getItem(name);
    if (items) {
      try {
        return JSON.parse(items);
      } catch (error) {
        return type;
      }
    } else {
      return type;
    }
  };
}

export { AppUtils };
