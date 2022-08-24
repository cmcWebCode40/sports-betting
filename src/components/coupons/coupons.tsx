import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Box from '@material-ui/core/Box';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useTranslation } from 'react-i18next';
import { useCouponStyles } from './styles/coupons.styles';
import {
  onRemoveAllCoupon,
  onRemoveCoupon,
  toggleCouponModal,
} from '../../provider/features/coupon/coupon';
import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { ClubLogo } from '..';

export const Coupons: React.FC = () => {
  const classes = useCouponStyles();
  const dispatch = useAppDispatch();
  const { isCouponModalOpened, selectedCoupon } = useAppSelector((state) => state.coupons);
  const toggleCoupon = () => {
    dispatch(toggleCouponModal());
  };
  const { t } = useTranslation();

  const pathToTranslation = 'common.cupons_component';

  const IconType = isCouponModalOpened ? ArrowDropDownIcon : ArrowDropUpIcon;

  return (
    <Box
      borderRadius={6}
      boxShadow={3}
      className={isCouponModalOpened ? classes.rootOpen : classes.root}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.appBar}
        onClick={toggleCoupon}
        borderRadius={6}
        boxShadow={3}
      >
        {t(`${pathToTranslation}.title`)} | {selectedCoupon.length}
        <IconType />
      </Box>
      {selectedCoupon.map((item: any) => (
        <div key={item.id} className={classes.bookMarkerContainer}>
          <Box justifyContent="space-between" display="flex">
            <Box display="flex" fontSize={13}>
              <Box display="flex">
                <ClubLogo src={item.homeLogo} />
                <Box component="span" mx={1}>
                  {item.home}
                </Box>
              </Box>
              <Box component="span" mx={2}>
                -
              </Box>
              <Box display="flex">
                <ClubLogo src={item.awayLogo} />
                <Box component="span" mx={1}>
                  {item.away}
                </Box>
              </Box>
            </Box>
            <span>
              {item.odd} ({item.type})
            </span>
          </Box>
          <Box display="flex" justifyContent="space-around">
            <img src={item?.bookmakers[0].logo} className={classes.bSelect} alt="logo" />
            <Button
              className={classes.bSite}
              href={item?.link}
              target="_blanck"
              variant="contained"
            >
              {t(`${pathToTranslation}.site_text`)}
            </Button>
            <HighlightOffIcon
              className={classes.removeIcon}
              onClick={() => dispatch(onRemoveCoupon(item.id))}
            />
          </Box>
        </div>
      ))}
      <Typography
        variant="h6"
        align="right"
        onClick={() => dispatch(onRemoveAllCoupon())}
        className={classes.deleteAll}
      >
        {t(`${pathToTranslation}.delete_all_text`)}
      </Typography>
    </Box>
  );
};

export default Coupons;
