import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useAdminAuthStyles = makeStyles((theme: ITheme) =>
  createStyles({
    paper: {
      margin: theme.spacing(8, 0, 0),
      padding: theme.spacing(3, 3, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1, 0, 0),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      margin: theme.spacing(1, 0, 0),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);
