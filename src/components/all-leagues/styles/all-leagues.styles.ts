import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ITheme } from '../../../themes/theme';

export const useAllLeagueStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    unusedFlex: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    buttonText: {
      margin: '0 1.3rem  0 0',
    },
    nested: {},
    muiPadding: {
      paddingTop: ' 0px !important',
      paddingBottom: ' 0px !important',
    },
    menuBar: {
      margin: theme.spacing(13, 0, 0, 0),
    },
    box: {
      minHeight: 500,
      top: 1,
      left: 1,
      zIndex: 9999,
      overflow: '',
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
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
    },
    icon: {
      margin: theme.spacing(0.7, 1.5, -0.4, 0.8),
    },
    iconDown: {
      margin: theme.spacing(0.8, -1.9, -1, 0.8),
    },
  }),
);
