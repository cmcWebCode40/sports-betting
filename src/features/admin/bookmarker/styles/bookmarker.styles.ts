import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { ITheme } from '../../../../themes/theme';

export const useBookmakerStyles = makeStyles((theme: ITheme) => ({
  root: {
    // flexGrow: 1,
    margin: theme.spacing(0, 1.2),
    padding: '0 0 11px ',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '2px 2px 6px 0 rgba(45, 45, 45, 0.5)',
    outline: 'none',
    [theme.breakpoints.up('md')]: {},
  },
  appBar: {
    borderBottom: `0.7px ${theme.palette.white} solid`,
  },
  indicator: {
    color: ` ${theme.palette.white}`,
  },
}));

export const useAddBookMarkers = makeStyles((theme: ITheme) =>
  createStyles({
    square: {
      width: 80,
      height: 80,
      color: theme.palette.black,
      backgroundColor: theme.palette.white,
    },
    content: {},
    button: {
      margin: theme.spacing(0.9, 0),
    },
    uploadButton: {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: theme.palette.white,
      margin: theme.spacing(1, 0),
    },
    uploadButtonSave: {
      padding: '4px 35px',
    },
    avatarThumb: {
      height: ' 170px',
      backgroundSize: 'cover',
      margin: theme.spacing(0.8),
      backgroundColor: theme.palette.veryLightPink.main,
    },
    thumbContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },
    imgContainer: {
      margin: theme.spacing(2, 0),
    },
    contentWrapper: {
      padding: theme.spacing(1, 1.5),
    },
  }),
);
