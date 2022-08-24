import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useWidHeader = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      margin: theme.spacing(0, 2),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rootLogo: {
      height: 60,
      margin: '-11px 85px 4px -30px',
    },
    link: {
      textDecoration: 'none',
      width: '75px',
      height: '29px',
      textTransform: 'capitalize',
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 3, 0, 0),
      },
    },
    language: {
      margin: theme.spacing(1, 0, 0, 0),
    },
  }),
);

export const useWidHome = makeStyles((theme: ITheme) =>
  createStyles({
    bannerWrapper: {
      margin: theme.spacing(0),
      backgroundImage: theme.palette.primary.light,
    },
  }),
);
export const useWidBettingStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    title: {
      margin: theme.spacing(5, 2),
      padding: theme.spacing(5, 2),
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.h1.fontSize,
      fontWeight: 600,
      fontStyle: 'italic',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
    textContent: {
      margin: '28px 0',
      padding: theme.spacing(1, 5),
      fontSize: theme.typography.h4.fontSize,
      textAlign: 'center',
      color: '#2f353d',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
    imgContent: {
      textAlign: 'center',
      margin: '28px 0',
      padding: theme.spacing(5, 0),
    },
  }),
);

export const useWidTestimoniesStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      textAlign: 'center',
      color: theme.palette.white,
      padding: theme.spacing(8, 4),
      margin: theme.spacing(0, 0, -7, 0),
      backgroundImage: theme.palette.primary.light,
    },
    title: {
      margin: theme.spacing(5, 2),
      color: theme.palette.white,
      fontSize: theme.typography.h1.fontSize,
      fontWeight: 600,
      fontStyle: 'italic',
    },
    textContent: {
      position: 'relative',
      width: '313px',
      height: '297px',
    },
    quoteTop: {
      width: '34px',
      height: '101px',
      fontSize: '80px',
      textAlign: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      margin: '1rem 0 0 0',
    },
    quoteBottom: {
      width: '34px',
      height: '101px',
      fontSize: '80px',
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: '0 0 -3rem 1rem',
    },
    words: {
      padding: theme.spacing(1.3, 1),
      color: theme.palette.white,
    },
    divider: {
      margin: theme.spacing(1),
    },
    gridContent: {
      alignItems: 'center !important',
      textAlign: 'center',
    },
  }),
);
export const useWidSportStyles = makeStyles((theme: ITheme) =>
  createStyles({
    icon: {
      height: '48px',
      width: '48px',
      margin: theme.spacing(0, 0, -2.5, 0),
      fill: theme.palette.primary.main,
    },
    iconFix: {
      height: '48px',
      width: '48px',
      margin: theme.spacing(0, 0, -3.5, 0),
      fill: theme.palette.primary.main,
    },
    root: {
      padding: theme.spacing(8, 2.5),
      background: theme.palette.veryLightPink.main,
    },
    title: {
      // margin: theme.spacing(5, 2),
      // padding: theme.spacing(2, 0),
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.h1.fontSize,
      fontWeight: 600,
      fontStyle: 'italic',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
    sportIcon: {
      padding: theme.spacing(4, 0, 0, 0),
    },
    sportTitle: {
      margin: '5px 8px ',
      color: theme.palette.primary.main,
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
  }),
);

export const useWidBanner = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 4),
      margin: theme.spacing(0, 'auto'),
      alignItems: 'center',
      textAlign: 'center',
    },
    title: {
      // margin: theme.spacing(0),
      color: theme.palette.white,
      margin: '25px auto',
      fontSize: theme.typography.h1.fontSize,
      fontWeight: 600,
      fontStyle: 'italic',
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
    listItem: {
      margin: '20px 0',
      fontSize: theme.typography.h2.fontSize,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h6.fontSize,
      },
      listStyle: 'none',
      color: theme.palette.white,
    },
    box: {
      display: 'flex',
      justifyItems: 'center !important',
      alignItems: 'center !important',
      // margin: 'auto',
      flexFlow: 'row wrap',
      margin: theme.spacing(2, 4),
    },
    boxImg: {
      [theme.breakpoints.down('sm')]: {
        // height: '100px',
        display: 'none',
      },
    },
    button: {
      fontWeight: 'bold',
      margin: theme.spacing(4, 0),
    },
  }),
);
