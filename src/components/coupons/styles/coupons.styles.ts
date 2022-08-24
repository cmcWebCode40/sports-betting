import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useCouponStyles = makeStyles((theme: ITheme) =>
  createStyles({
    coupon: {},
    root: {
      position: 'fixed',
      top: 'auto',
      bottom: 0,
      right: 70,
      height: 40,
      zIndex: 4,
      minWidth: 350,
      transition: 'all ease-in-out 5s',
      background: `${theme.palette.white}`,
      [theme.breakpoints.down('md')]: {
        bottom: 49,
        left: 0,
      },
    },
    bookMarkerContainer: {
      width: '330px',
      margin: '16px 15px 20px 20px',
      padding: '14px 12px 11px 14px',
      backgroundColor: `${theme.palette.veryLightPink.main}`,
    },
    rootOpen: {
      position: 'fixed',
      top: 'auto',
      bottom: 0,
      right: 70,
      margin: '0 auto',
      height: 'auto',
      zIndex: 4,
      minWidth: 350,
      maxHeight: 500,
      overflowY: 'auto',
      transition: 'all ease-in-out 5s',
      background: `${theme.palette.white}`,
      [theme.breakpoints.down('md')]: {
        bottom: 49,
        left: 0,
      },
    },
    appBar: {
      padding: '0.6rem 3rem 0.6rem 0.8rem',
      color: `${theme.palette.white}`,
      textAlign: 'left',
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      textTransform: 'capitalize',
      background: `${theme.palette.oceanGreen.main}`,
      '&:hover': {
        background: `${theme.palette.oceanGreen.main}`,
      },
    },
    totalText: {
      fontSize: '15px',
      fontWeight: 600,
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 43px 18px 3px',
      color: theme.palette.oceanGreen.main,
    },
    grow: {
      flexGrow: 1,
    },
    listNav: {
      display: 'flex',
      textAlign: 'right',
      padding: '2rem 0.4rem',
    },
    listItem: {
      color: `${theme.palette.white} !important`,
    },
    bTitle: {
      fontSize: '13px',
      color: theme.palette.greenishBrown.main,
    },

    bOdds: {
      margin: '1px 10px 17px 86px',
      color: theme.palette.black,
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
    },
    bSite: {
      height: '30px',
      margin: '13px 10px 0 31px',
      padding: '6.5px 5.7px 5.5px 7.7px',
      borderRadius: '3px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: theme.palette.white,
    },
    removeIcon: {
      height: '30px',
      margin: '13px 0px 0 0px',
      padding: '6.5px 0px 5.5px 0px',
    },
    bSiteTotal: {
      width: '121px',
      height: '30px',
      margin: '13px 10px 0 31px',
      padding: '6.5px 5.7px 5.5px 7.7px',
      borderRadius: '3px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    },
    bSelect: {
      height: 'auto',
      width: '3rem',
      margin: ' 1rem 0.4rem 0.4rem 0.4rem ',
      '&:hover': {
        background: `${theme.palette.black}`,
      },
    },
    totalCouponBox: {
      width: '339px',
      height: '108px',
      margin: '11px 15px 10px 16px',
      padding: '13px 37px 27px 14px',
      borderRadius: '4px',
      border: `solid 1px ${theme.palette.oceanGreen.main} `,
      backgroundColor: theme.palette.veryLightPink.main,
    },
    deleteAll: {
      margin: '0px 20px',
    },
  }),
);
