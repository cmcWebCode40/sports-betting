import { createStyles, fade, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useSearchBarStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paperRoot: {
      backgroundColor: 'red',
    },
    paper: {
      marginRight: theme.spacing(2),
      height: 200,
    },
    search: {
      width: '170px',
      height: '36px',
      margin: '0 51px 0 45px',
      // padding: '9px 54px 7px 10px',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.white}`,
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    searchMobile: {
      // display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        order: 1,
      },
    },
    searchIconMobile: {
      fontSize: theme.spacing(4),
      color: theme.palette.white,
    },
    searchIcon: {
      padding: theme.spacing(0.5, 0.1),
      height: '100%',
      top: 1,
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.spacing(3),
      color: theme.palette.white,
    },
    inputRoot: {
      color: 'inherit',
      textAlign: 'center',
      margin: '-1rem 0rem 0 0rem ',
      '& input::placeholder': {
        textAlign: 'center',
      },
    },
    inputInput: {
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    },
  }),
);
export const useSearchInputStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      borderRadius: '4px',
      alignItems: 'center',
      padding: theme.spacing(1),
      display: 'flex',
      flexBasis: 420,
    },
    icon: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    input: {
      flexGrow: 1,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.05px',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);
