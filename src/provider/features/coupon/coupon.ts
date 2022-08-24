import { createSlice } from '@reduxjs/toolkit';
import { BET_COUPON } from '../../../constants/local-storage.constants';
import { AppUtils } from '../../../utils/functions/app-utils';

const { saveLocalStoreItem, getLocalStoreItem } = AppUtils;

const couponsData = getLocalStoreItem({ name: BET_COUPON, type: [] });

interface ICouponState {
  coupons: any;
  selectedCoupon: any;
  isCouponModalOpened: boolean;
}

const initialState: ICouponState = {
  coupons: couponsData,
  selectedCoupon: couponsData,
  isCouponModalOpened: false,
};

export const appCoupons = createSlice({
  name: 'user_coupon',
  initialState,
  reducers: {
    toggleCouponModal: (state) => {
      const prevState = {
        ...state,
        isCouponModalOpened: !state.isCouponModalOpened,
      };
      return prevState;
    },
    onAddCoupon: (state, action) => {
      const item = action.payload;
      const isItemExist = state.selectedCoupon.filter((coup: any) => coup.id === item.away);

      if (isItemExist.length) {
        const newState = state.selectedCoupon.map((coup: any) =>
          coup.id === item.id ? item : coup,
        );
        state.selectedCoupon = newState;
        state.isCouponModalOpened = true;
        saveLocalStoreItem({
          data: newState,
          name: BET_COUPON,
        });
      } else {
        state.selectedCoupon.push(item);
        state.isCouponModalOpened = true;
        saveLocalStoreItem({
          data: state.selectedCoupon,
          name: BET_COUPON,
        });
      }
      return state;
    },
    onRemoveAllCoupon: (state /* action */) => {
      state.selectedCoupon = [];
      saveLocalStoreItem({
        data: [],
        name: BET_COUPON,
      });
      return state;
    },
    onRemoveCoupon: (state, action) => {
      const itemId = action.payload;
      const newState = state.selectedCoupon.filter((coup: any) => coup.id !== itemId);
      state.selectedCoupon = newState;
      saveLocalStoreItem({
        data: newState,
        name: BET_COUPON,
      });
      return state;
    },
  },
});

export const { onAddCoupon, onRemoveCoupon, onRemoveAllCoupon, toggleCouponModal } =
  appCoupons.actions;

export default appCoupons.reducer;
