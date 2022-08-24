import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../../themes/theme';

export const useLeagueViewStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        borderBottom: `1px solid ${theme.palette.brownGrey.main}`,
      },
    },
    wrapper: {
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      margin: theme.spacing(1.1, 1.5),
      padding: theme.spacing(3, 2),
      background: theme.palette.veryLightPink.main,
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1.1, 0.5),
      },
    },
    grid: {
      margin: '1rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      '& > *': {
        margin: '0.4rem 1rem ',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0',
        justifyContent: 'center',
        flexFlow: 'column nowrap',
        '& > *': {
          margin: '0.4rem ',
        },
      },
    },
    scoreParent: {
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        // flexFlow: 'column nowrap',
        '& > *': {
          margin: '0.6rem ',
        },
      },
    },
    addMatch: {
      color: theme.palette.oceanGreen.main,
    },
    title: {
      height: '22px',
      width: '6rem',
      minWidth: '6rem',
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: 600,
      margin: '2px 0 0',
      color: theme.palette.nastyGreen.main,
      [theme.breakpoints.down('sm')]: {},
    },
    gameText: {
      height: '19px',
      width: '7rem',
      minWidth: '7rem',
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.grayishBrown.main,
      '&:hover': {
        color: `${theme.palette.primary.main}`,
        fontWeight: 600,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
    scores: {
      height: '19px',
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: 500,
      textAlign: 'right',
      color: theme.palette.black,
    },

    link: {
      textDecoration: 'none',
      display: 'block',
      '&:hover': {
        fontWeight: 600,
        '& gameText': {
          color: `${theme.palette.primary.main}`,
          fontWeight: 600,
        },
      },
    },
    addMatchIcon: {
      margin: '4px',
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.oceanGreen.main,
      textTransform: 'capitalize',
    },
    league: {
      margin: '0.4rem 0 1rem',
      padding: '0.4rem  0.8rem',
      borderRadius: '4px',
      textTransform: 'capitalize',
      fontSize: theme.typography.subtitle1.fontSize,
      color: theme.palette.white,
      backgroundImage: theme.palette.primary.light,
    },
    sport: {
      justifyContent: 'space-between',
      borderRadius: '4px',
      backgroundColor: theme.palette.white,
    },
    sportTitle: {
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: 600,
      margin: '0 0 -10px 0px',
      textTransform: 'uppercase',
      padding: '8px 5px 5px 5px',
      color: theme.palette.primary.main,
    },
    sportLink: {
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'right',
      color: theme.palette.grayishBrown.main,
    },
    liveScoreLink: {
      margin: theme.spacing(0, 1),
      padding: theme.spacing(0.5),
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  }),
);

export const useHomeStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {},
    matchView: {
      background: theme.palette.veryLightPink.main,
    },
    toSelectButton: {
      marginLeft: '5.25rem',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },
    divider: {
      height: '1px',
      margin: '-1px 0 21px',
      background: theme.palette.oceanGreen.main,
    },
  }),
);
export const useTimezoneBookmakerStyle = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down('sm')]: {
        // display: 'block',
      },
    },
    boxChild1: {
      margin: theme.spacing(0, 3, 0, -9),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 3, 0, 1),
      },
    },
    boxChild2: {
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 1, 0, 1),
      },
    },
    toggleBtn1: {
      margin: '5px 0px',
      background: 'transparent',
      fontWeight: 600,
      padding: '6px 20px',
      textTransform: 'capitalize',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      color: theme.palette.oceanGreen.main,
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      [theme.breakpoints.down('sm')]: {
        borderRadius: theme.shape.borderRadius,
      },
    },
    toggleBtn: {
      margin: '5px 0px',
      padding: '6px 20px',
      background: 'transparent',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
    },
    iconDown: {
      margin: theme.spacing(0.4, 1.5, -0.9, 0.8),
    },
  }),
);
export const useAdsStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      height: '362px',
      margin: theme.spacing(2),
      display: 'inline-block',
      padding: '142px 130px 165px 140px',
      background: theme.palette.veryLightPink.main,
      fontSize: '6rem',
      fontWeight: 600,
      color: theme.palette.brownGrey.main,
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        margin: theme.spacing(2, 'auto'),
      },
      [theme.breakpoints.down('md')]: {
        display: 'block',
        padding: '142px 120px 165px 120px',
      },
    },
    title: {
      fontSize: '60px',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap',
      color: theme.palette.brownGrey.main,
    },
  }),
);
export const useBookmakerPlatformStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      top: 0,
      left: 10,
      zIndex: 2,
      width: '289px',
      height: '387px',
      borderRadius: '5px',
      position: 'absolute',
      margin: '59px 73px 16px 20px',
      padding: '7px 25px 14px 25px',
      border: `solid 4px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.white,
    },
    bookMakerLogo: {
      width: '132px',
      height: '22px',
      margin: '5px 7px 11px 11px',
      padding: '3px 37px 4px 39px',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexFlow: 'column nowrap',
    },
    boxText: {
      margin: '10px 32px 6px -4px',
      fontSize: theme.typography.subtitle1.fontSize,
      color: theme.palette.grayishBrown.main,
      textAlign: 'right',
    },
    boxSpan: {
      margin: '9px 0px -4px 0px',
      fontWeight: 600,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.grayishBrown.main,
    },
    boxContent: {
      margin: '0px 10px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonWrapper: {},
    button: {
      width: '155px',
      margin: '8px 0px 8px 3px',
      fontWeight: 600,
    },
    fullPreview: {
      margin: '7px 5px 0px 33px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      textDecoration: 'none',
      color: theme.palette.grayishBrown.main,
    },
    fullPreviewLink: {
      textDecoration: 'none',
      color: theme.palette.grayishBrown.main,
    },
  }),
);

export const useTopBookmakerStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'block',
      margin: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        margin: theme.spacing(1, 'auto'),
      },
    },
    appShell: {
      height: 150,
      background: theme.palette.veryLightPink.main,
    },
    bonusIcon: {
      color: theme.palette.white,
      position: 'absolute',
      textAlign: 'center',
      fontSize: '0.8rem',
      margin: '-1.6rem 0 0 17rem',
      borderRadius: '6px',
    },
    topHeader: {
      background: theme.palette.primary.main,
      height: '40px',
      padding: '6px 6px 6px 8px',
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      color: theme.palette.white,
      position: 'relative',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
    },
    title: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      color: theme.palette.white,
    },
    boxList: {
      position: 'relative',
      margin: theme.spacing(1, 1.3),
      '&> h4': {
        minWidth: '20%',
        maxWidth: '20%',
      },
    },
    arrowIcon: {
      minWidth: '20%',
      maxWidth: '20%',
    },
    logo: {
      minWidth: '20%',
      maxWidth: '20%',
      // display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        width: '82px',
        height: '22px',
      },
    },
    ratingSelected: {
      width: '25%',
      fontWeight: 600,
      margin: '2px 17px 15px 32px',
      fontSize: theme.typography.h5.fontSize,
      textAlign: 'center',
      color: '#2f353d',
    },
    s_number: {
      fontWeight: 600,
      margin: '0px 10px 20px 8px',
      fontSize: theme.typography.h6.fontSize,
    },
    ratingTotal: {},
    discountedAmount: {
      margin: '2px 8px 8px 10px',
      fontSize: theme.typography.h4.fontSize,
      textAlign: 'center',
      color: '#2f353d',
    },
    listBg: {
      padding: '27px 0px 27px 0px',
      // width: '80%',
      background: theme.palette.veryLightPink.main,
    },
  }),
);
