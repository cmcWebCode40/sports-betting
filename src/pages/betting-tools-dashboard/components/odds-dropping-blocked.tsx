import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ITheme } from '../../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      width: '200px',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '-10px 10px 20px 10px',
      padding: '8px 20px',
      borderRadius: '4px',
      backgroundColor: theme.palette.white,
    },
    variant1: {
      width: '28px',
      height: '18px',
      margin: '4.9px 13px 3.1px 0',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.grayishBrown.main,
    },
    variant2: {
      width: '28px',
      height: '18px',
      margin: '4.9px 20px 3.1px 14px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.paleRed.main,
    },
    variant3: {
      margin: '4px 0 0 20px',
      padding: '2px 10px',
      fontSize: theme.typography.h6.fontSize,
      borderRadius: '2px',
      color: theme.palette.white,
      backgroundColor: theme.palette.paleRed.main,
    },
    box: {
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    oddTitle: {
      alignItems: 'center',
      margin: '0.4rem auto',
    },
    canceled: {
      fontWeight: 600,
      padding: '15px 10px',
      color: theme.palette.paleRed.main,
      fontSize: theme.typography.h6.fontSize,
    },
  }),
);

type TType = 'blocked-odds' | 'canceled';

const OddsDroppingBlocked = ({ type }: { type?: TType }): JSX.Element => {
  const classes = useStyles();

  const oddsView = () => {
    switch (type) {
      case 'blocked-odds':
        return (
          <>
            <Typography className={classes.variant2} variant="h5">
              2.62
            </Typography>
            <span className={classes.variant1}>|</span>
            <Typography className={classes.variant1} variant="h5">
              5.86
            </Typography>
          </>
        );
      case 'canceled':
        return (
          <Typography className={classes.canceled} variant="h5">
            Canceled
          </Typography>
        );
      default:
        return (
          <>
            <Typography className={classes.variant1} variant="h5">
              5.86
            </Typography>
            <Typography className={classes.variant2} variant="h5">
              2.62
            </Typography>
            <Typography className={classes.variant3} variant="h5">
              67%
            </Typography>
          </>
        );
    }
  };

  return (
    <div className={classes.root}>
      {type !== 'canceled' && (
        <div>
          <Typography className={classes.oddTitle} variant="h5">
            2
          </Typography>
        </div>
      )}

      <Box className={classes.box} display="flex">
        {oddsView()}
      </Box>
    </div>
  );
};

export default OddsDroppingBlocked;
