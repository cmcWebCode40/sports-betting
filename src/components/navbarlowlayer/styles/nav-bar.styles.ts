import { makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useNavBarStyle = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme.palette.veryLightPink.main,
    padding: '6px 0px',
  },
  nav: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    margin: '0px 15px',
  },
  button: {
    textTransform: 'inherit',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 600,
    margin: '0px 10px',
  },
  icon: {
    margin: '0px 0px -3px 0px',
  },
  iconFix: {
    margin: '0px 0px -5px 0px',
  },
}));
