import { makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useAuthModalStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1, 1.2),
    padding: '0 0 11px ',
    borderRadius: '4px',
    boxShadow: '2px 2px 6px 0 rgba(45, 45, 45, 0.5)',
    backgroundColor: 'rgba(30, 104, 192, 0.75)',
    outline: 'none',
    [theme.breakpoints.up('md')]: {},
  },
  appBar: {
    borderBottom: `0.7px ${theme.palette.white} solid`,
  },
  indicator: {
    color: ` ${theme.palette.white}`,
  },
  closeIcon: {
    position: 'absolute',
    cursor: 'pointer',
    right: 0,
    top: 0,
    color: theme.palette.white,
    height: 25,
    width: 25,
    margin: theme.spacing(1.6),
  },
}));
