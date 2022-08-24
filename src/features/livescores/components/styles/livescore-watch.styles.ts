import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../../themes/theme';

export const useWatchListStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      transition: 'all ease-in-out 5s',
      flexBasis: '35%',
      backgroundColor: `${theme.palette.veryLightPink.main}`,
    },
    teamImg2: {
      width: '24px',
      height: '24px',
    },
    bookMarkerContainer: {
      margin: '10px 15px 20px 16px',
      padding: '9px 15px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.white,
    },

    rootOpen: {
      height: 'auto',
      transition: 'all ease-in-out 5s',
      background: `${theme.palette.white}`,
    },
    appBar: {
      padding: '0.6rem 3rem 0.6rem 0.8rem',
      color: `${theme.palette.white}`,
      background: `${theme.palette.primary.main}`,
      textAlign: 'left',
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      textTransform: 'capitalize',
    },
    grow: {
      flexGrow: 1,
    },
    listNav: {
      display: 'flex',
      textAlign: 'right',
      padding: '2rem 0.4rem',
    },
    listItem: {
      color: `${theme.palette.white} !important`,
    },
    bTitle: {
      margin: '1px 53px 18px 8px',
      fontSize: '13px',
      color: theme.palette.greenishBrown.main,
    },

    bOdds: {
      margin: '1px 10px 17px 86px',
      color: theme.palette.black,
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
    },
    bSite: {
      width: '121px',
      height: '30px',
      margin: '13px 10px 0 31px',
      padding: '6.5px 5.7px 5.5px 7.7px',
      borderRadius: '3px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: theme.palette.white,
    },
    bSelect: {
      width: '136px',
      height: '22px',
      margin: '18px 30px 3px 0',
      padding: '1px 9px 4px 56px',
      borderRadius: '2px',
      color: theme.palette.white,
      backgroundColor: theme.palette.black,
    },
    box: {
      '& > *': {
        margin: '0rem 1.4rem',
      },
    },
    lsTopHead: {
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > *': {},
    },
    lsTopBottom: {
      alignItems: 'center',
      textAlign: 'right',
      margin: '0.2rem 1rem 0 0',
      wordBreak: 'break-word',
      justifyContent: 'space-around',
      '& > *': {
        margin: '0.4rem',
      },
    },
    league: {
      width: '18%',
    },
    lsTopCenter: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.nastyGreen.main,
    },
    lsTopCenterFinished: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.paleRed.main,
    },
    leagueTitle: {
      fontSize: theme.typography.h6.fontSize,
      textAlign: 'center',
      color: theme.palette.grayishBrown.main,
    },
    leagueTitleDate: {
      backgroundColor: 'var(--greyish-brown)',
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 600,
      textAlign: 'right',
      color: theme.palette.grayishBrown.main,
      '& > *': {
        margin: '0 0.4rem',
      },
    },
    sil: {
      margin: '3px 10px',
      fontSize: theme.typography.h5.fontSize,
      color: '#a95d5d',
    },
    body1: {
      margin: '10px 15px 20px 16px',
      padding: '6px 10px',
      fontSize: '1rem',
      fontWeight: 300,
      width: '330px',
      color: theme.palette.grayishBrown.main,
    },
  }),
);
