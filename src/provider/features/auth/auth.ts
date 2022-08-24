import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUserPayLoad } from '../../../models/user-authentication.model';
import { IS_AUTH_MODAL_OPENED, USER_CREDENTIALS } from '../../../constants/local-storage.constants';

import { AppUtils } from '../../../utils/functions/app-utils';
import { UserUtils } from '../../../utils/functions/user-utils';

const { saveLocalStoreItem, getLocalStoreItem } = AppUtils;
const { saveUserToken, removeCookie } = UserUtils;

// Define a type for the slice state

interface IState {
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentials: any;
  isAuthModalOpened: boolean;
}

const isAuthModalOpened = getLocalStoreItem<boolean>({ name: IS_AUTH_MODAL_OPENED, type: false });
const credentialsData = getLocalStoreItem({ name: USER_CREDENTIALS, type: {} });

// Define the initial state using that type
const initialState: IState = {
  credentials: credentialsData,
  isError: false,
  isAuthModalOpened,
};

export const authentication = createSlice({
  name: 'user_authentication',
  initialState,
  reducers: {
    toggleModal: (state, action?: PayloadAction<{ persistOpen?: boolean }>) => {
      const prevState = {
        ...state,
        isAuthModalOpened: action?.payload?.persistOpen ? true : !state.isAuthModalOpened,
      };
      saveLocalStoreItem({
        name: IS_AUTH_MODAL_OPENED,
        data: prevState.isAuthModalOpened,
      });
      return prevState;
    },
    handleAuthentication: (state, action: PayloadAction<IUserPayLoad>) => {
      const { userData: data, isNewUser } = action.payload;
      saveUserToken(data?.Authorization);
      const prevState = {
        ...state,
        credentials: data,
        isAuthModalOpened: isNewUser ? state.isAuthModalOpened : !state.isAuthModalOpened,
      };
      saveLocalStoreItem({
        name: IS_AUTH_MODAL_OPENED,
        data: prevState.isAuthModalOpened,
      });
      saveLocalStoreItem({ name: USER_CREDENTIALS, data });
      toast.success(`Welcome ${data?.username}`);
      return prevState;
    },
    handleLogout: (state) => {
      localStorage.clear();
      removeCookie();
      const prevState = {
        ...state,
        credentials: {},
      };
      toast.success(`successfully logged out`);
      return prevState;
    },
  },
});

export const { toggleModal, handleAuthentication, handleLogout } = authentication.actions;

export default authentication.reducer;
