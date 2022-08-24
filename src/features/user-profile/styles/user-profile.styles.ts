import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

export const useStylesProfile = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexBasis: '10%',
    },
    formLabel: {
      margin: '1.5rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& label': {
        // fontSize: theme.typography.style17.fontSize,
        fontSize: '18px',
        margin: '0 1rem',
        color: theme.palette.grayishBrown.main,
      },
    },
    input: {
      margin: '-0.6rem 1rem  0 3rem ',
    },
    buttonActive: {
      margin: '0.5rem 1rem  0 2rem ',
      borderRadius: 0,
      borderBottom: `1px solid ${theme.palette.primary.main} `,
    },
    dataText: {
      fontSize: '20px',
      fontWeight: 600,
      color: theme.palette.grayishBrown.main,
    },
    button: {
      width: '13rem',
      margin: '0.5rem 1rem  0 8rem ',
    },
  }),
);

export const useStylesProfilePics = makeStyles((theme: ITheme) =>
  createStyles({
    square: {
      width: 80,
      height: 80,
      color: theme.palette.black,
      backgroundColor: theme.palette.white,
    },
    content: {
      height: 230,
      width: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap',
      [theme.breakpoints.down('sm')]: {
        height: 230,
        width: 280,
      },
    },
    button: {
      borderRadius: 0,
      borderBottom: `1px solid ${theme.palette.primary.main} `,
    },
    uploadButton: {
      padding: '10px 17px 8px 24px',
      borderRadius: '3px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: theme.palette.white,
    },
    uploadButtonSave: {
      padding: '4px 35px',
    },
    avatarThumb: {
      width: ' 170px',
      height: ' 170px',
      borderRadius: '50%',
      margin: theme.spacing(0.8),
      backgroundColor: theme.palette.veryLightPink.main,
    },
  }),
);
