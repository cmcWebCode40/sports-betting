import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useTitleStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 5),
    },
    rating: {
      color: theme.palette.grayishBrown.main,
      // margin: '11px 3px -10px 0',
    },
    bookmarkerLogo: {
      width: '150px',
      height: '40px',
      margin: ' 5px 50px 2px 0',
      padding: '9px 17px 10px',
    },
    ratingValue: {
      margin: '0px 0px 0px 24px',
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: '#2f353d',
    },
    currencyValue: {
      margin: '0px 15px',
      fontSize: theme.typography.h4.fontSize,
      textAlign: 'center',
      color: '#2f353d',
    },
    websiteLink: {
      margin: '10px',
      borderRadius: ' 3px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 'bold',
    },
    buttonCaptionText: {
      margin: '5px 45px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    grid: {
      background: theme.palette.veryLightPink.main,
      padding: theme.spacing(1.5, 1, 0.5, 1),
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    ratingWrapper: {
      margin: '17px 0 0 50px',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        margin: '17px 0 0 00px',
      },
    },
    firstLayerFlex: {
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
  }),
);

export const useBookmarkerStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 6),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2, 2),
      },
    },
    titleWrapper: {
      background: theme.palette.veryLightPink.main,
    },
    tableHeaders: {
      fontWeight: 600,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    goBackIcon: {
      margin: '14px 42px 8px 0',
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 600,
      color: theme.palette.grayishBrown.main,
    },
  }),
);

export const useRatingModalStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 6),
    },
    boxContent: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      height: '230px',
      padding: '23px 21px 50px 35px',
    },
    titleHeader: {
      margin: '22px 14px 6px 0',
      padding: '7px 35px 4px 35px',
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 100,
      textAlign: 'center',
    },
    rating: {
      margin: '3px 14px 6px 0',
      padding: '7px 35px 4px 35px',
    },
    submitButton: {
      padding: '7px 35px 4px 35px',
      margin: '20px 14px 6px 0',
      width: '170px',
    },
    rateOpen: {
      color: '#2f353d',
      textAlign: 'center',
      textTransform: 'capitalize',
      margin: '-12px 0px 0px 24px',
      fontSize: theme.typography.h4.fontSize,
    },
  }),
);

export const useAboutStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0),
    },
    titleWrapper: {
      fontWeight: 600,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    subtitle: {
      margin: '18px 27px 7px 10px',
      width: '30%',
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    content: {
      fontWeight: 600,
      width: '60%',
      margin: '18px 27px 7px 2px',
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    box: {
      // alignItems: 'center',
      // justifyContent: 'space-around',
      // width: '70%',
    },
  }),
);

export const useDepositStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0.3),
    },
    tableBody: {
      backgroundColor: theme.palette.veryLightPink.main,
    },
    tableHead: {
      fontSize: '16px',
      color: theme.palette.grayishBrown.main,
    },
    title: {
      fontWeight: 600,
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    firstItem: {
      fontWeight: 600,
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.greenishBrown.main,
    },
  }),
);

export const useComparisonTabsStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0.3),
    },
    selectedButton: {
      fontSize: '16px',
      fontWeight: 600,
      margin: theme.spacing(0.5),
      color: theme.palette.oceanGreen.main,
      backgroundColor: theme.palette.veryLightPink.main,
      border: `1.4px solid ${theme.palette.oceanGreen.main}`,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      margin: theme.spacing(0.5),
      border: `1.4px solid ${theme.palette.grayishBrown.main}`,
      color: theme.palette.grayishBrown.main,
    },
    unusedFlex: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    nested: {},
    muiPadding: {
      paddingTop: ' 0px !important',
      paddingBottom: ' 0px !important',
    },
    box: {
      minHeight: 500,
      background: theme.palette.oceanGreen.main,
      color: theme.palette.white,
      margin: theme.spacing(-1),
      padding: theme.spacing(1.2, 3),
    },
    listItem: {
      textTransform: 'capitalize',
      color: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      background: theme.palette.oceanGreen.main,
    },
    listChild: {
      textTransform: 'capitalize',
      color: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
    },
    subListItem: {
      textTransform: 'capitalize',
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 500,
      display: 'flex',
      width: '180px',
    },
    divider: {
      background: theme.palette.white,
    },
    toggleBtn: {
      height: '36px',
      margin: '20px 5px',
      background: 'transparent',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
    },
    openedButton: {
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.white}`,
      background: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      color: theme.palette.oceanGreen.main,
    },
    icon: {
      margin: theme.spacing(0.4, 1.5, -0.4, 0.8),
    },
    iconDown: {
      margin: theme.spacing(0.4, 1.5, -0.9, 0.8),
    },
  }),
);
export const useComparisonStyles = makeStyles((theme: ITheme) =>
  createStyles({
    title: {
      fontWeight: 600,
      padding: '16px 0',
      fontSize: theme.typography.h3.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    root: {
      top: 0,
      textAlign: 'center',
      position: 'relative',
      margin: theme.spacing(2, 0.2),
      backgroundColor: theme.palette.veryLightPink.main,
    },
    rating: {
      color: theme.palette.grayishBrown.main,
      margin: ' 10px 3px -10px 0',
    },
    bookmarkerLogo: {
      width: '170px',
      height: '40px',
      margin: ' 0px auto',
      padding: '9px 17px 10px',
      borderRadius: '2px',
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.white,
    },
    subtitle1: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    caption: {
      fontWeight: 600,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.greenishBrown.main,
    },
    blockDisplay: {
      margin: theme.spacing(1, 0.3),
      padding: theme.spacing(1, 0.2),
      borderBottom: `1px solid ${theme.palette.white}`,
    },
    closeIcon: {
      position: 'absolute',
      top: 15,
      right: 1,
      margin: theme.spacing(0, 3),
    },
  }),
);
