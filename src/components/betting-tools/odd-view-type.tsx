import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    box: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 10px',
    },
    OddView1Root: {
      width: '60px',
      height: '54px',
      margin: '0 10px 0 0',
      padding: '4px 17px 9px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.white,
    },
    OddView1Caption: {
      textAlign: 'center',
      margin: '0 9px 5px',
      fontSize: '10px',
      fontWeight: 600,
      // fontSize: theme.typography.h6.fontSize,
      color: theme.palette.veryLightPink.main,
    },
    OddView1Odds: {
      fontWeight: 600,
      textAlign: 'center',
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.grayishBrown.main,
    },
    oddView2Root: {
      width: '140px',
      height: '54px',
      margin: '1px 11px 16px 10px',
      padding: '7px 18px 9px 19px',
      borderRadius: '4px',
      textAlign: 'center',
      backgroundColor: theme.palette.white,
    },
    oddView2Caption: {
      fontWeight: 600,
    },
    oddView2Odds: {
      margin: '2px 0 0',
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.paleRed.main,
    },
    oddView3Root: {
      width: '140px',
      height: '81px',
      borderRadius: '4px',
      padding: '10px 4px 4px',
      margin: '5px 16px 32px 21px',
      backgroundColor: theme.palette.white,
    },
    oddView3Caption: {
      textAlign: 'center',
      fontWeight: 600,
    },
    oddView4Caption: {
      textAlign: 'center',
    },
    oddView3Odds: {
      margin: '4px 0 0',
      borderRadius: '2px',
      padding: '1px 54px 1px 55px',
      border: 'solid 1px #cecdcd',
      backgroundColor: '#027b5b',
    },
    oddView4Root: {
      width: '140px',
      height: '54px',
      borderRadius: '4px',
      margin: '21px 17px 16px 21px',
      padding: '6px 20px 7.7px 19px',
      backgroundColor: theme.palette.white,
    },
    odds1: {
      margin: '0 52px 6px 6px',
      fontSize: '15px',
      fontWeight: 600,
      color: theme.palette.black,
    },
    odds2: {
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.primary.main,
    },
    odds14: {
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.black,
    },
    odds24: {
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.paleRed.main,
    },
    boxOdds4: {
      justifyContent: 'space-around',
    },
  }),
);

type TView = 'oddview-1' | 'oddview-2' | 'oddview-3' | 'oddview-4' | 'oddview-5';

interface IOddViewType {
  view?: TView | string;
}

const OddViewType = ({ view = 'oddview-1' }: IOddViewType): JSX.Element => {
  const classes = useStyles();

  const OddView1 = (
    <Box display="flex" className={classes.box}>
      {[1, 2].map((item) => (
        <div className={classes.OddView1Root} key={item}>
          <Typography className={classes.OddView1Caption} variant="caption">
            1
          </Typography>
          <Typography className={classes.OddView1Odds} variant="h6">
            2.86
          </Typography>
        </div>
      ))}
    </Box>
  );

  const OddView2 = (
    <Box display="flex" className={classes.box}>
      {[1].map((item) => (
        <div className={classes.oddView2Root} key={item}>
          <Typography className={classes.OddView1Caption} variant="caption">
            1 x 2
          </Typography>
          <Typography className={classes.oddView2Odds} variant="h6">
            6 | 16 bookmaker
          </Typography>
        </div>
      ))}
    </Box>
  );
  const OddView5 = (
    <Box display="flex" className={classes.box}>
      {[1].map((item) => (
        <div className={classes.oddView2Root} key={item}>
          <Typography className={classes.oddView2Odds} variant="h6">
            Canceled
          </Typography>
        </div>
      ))}
    </Box>
  );

  const OddView3 = (
    <Box display="flex" className={classes.box}>
      {[1].map((item) => (
        <div className={classes.oddView3Root} key={item}>
          <Box>
            <Typography className={classes.odds1} variant="caption">
              302.86
            </Typography>
            <Typography className={classes.odds2} variant="caption">
              2.20
            </Typography>
          </Box>
          <Typography className={classes.oddView3Caption} variant="caption">
            EH+2 | 2
          </Typography>
          <Typography className={classes.oddView3Odds} variant="h6">
            Logo
          </Typography>
        </div>
      ))}
    </Box>
  );
  const OddView4 = (
    <Box display="flex" className={classes.box}>
      {[1].map((item) => (
        <div className={classes.oddView4Root} key={item}>
          <Typography className={classes.oddView4Caption} variant="caption">
            2
          </Typography>
          <Box display="flex" className={classes.boxOdds4}>
            <Typography className={classes.odds14} variant="caption">
              302.86
            </Typography>
            <Typography className={classes.odds24} variant="caption">
              2.20
            </Typography>
          </Box>
        </div>
      ))}
    </Box>
  );

  const displayView = (key: string) => {
    switch (key) {
      case 'oddview-1':
        return OddView1;
      case 'oddview-2':
        return OddView2;
      case 'oddview-3':
        return OddView3;
      case 'oddview-4':
        return OddView4;
      case 'oddview-5':
        return OddView5;
      default:
        return OddView1;
    }
  };
  return <div>{displayView(view)}</div>;
};

export default OddViewType;
