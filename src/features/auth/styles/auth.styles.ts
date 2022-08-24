import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ITheme } from '../../../themes/theme';

export const useAuthStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: theme.spacing(0.6),
      color: theme.palette.white,
      width: 300,
      // padding: '11px 33px',
      [theme.breakpoints.up('md')]: {
        width: 400,
      },
    },
    title: {
      color: theme.palette.white,
      margin: theme.spacing(1.6, 0.2, 2, 0.2),
      fontSize: '1.2rem',
    },
    formControl: {},
    error: {
      color: theme.palette.white,
      background: theme.palette.error.light,
      padding: '8px',
      display: 'block',
      borderRadius: '4px',
    },
    actionArea: {
      '& > * ': {
        margin: theme.spacing(1, 0.25),
      },
    },
    checkBox: {
      color: `${theme.palette.white}`,
      margin: theme.spacing(0.3, 0),
    },
    subButton: {
      color: `${theme.palette.white}`,
      textTransform: 'inherit',
    },
    checkBoxForm: {
      color: `${theme.palette.white}`,
    },
    facebookButton: {
      backgroundColor: theme.palette.facebookBlue.main,
    },
    test: {
      zIndex: 50,
    },
    btn: {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: '#fff',
    },
  }),
);

export const customInputStyles = {
  root: {
    color: '#fff ',
    backgroundColor: 'rgba(30, 104, 192,0.9)',
    '& label.Mui-focused': {
      color: '#fff',
    },
    '&.MuiInput-underline:after': {
      borderBottomColor: 'white',
      color: 'white !important',
    },
    '& .MuiOutlinedInput-root': {
      color: '#fff !important',
      '& fieldset': {
        color: '#fff',
        borderColor: '#fff',
        // backgroundColor: 'rgba(30, 104, 192,0.9)',
        background: 'none',
      },
      '&:hover fieldset': {
        color: '#fff',
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        color: '#fff !important',
        borderColor: 'white',
      },
    },
  },
};
