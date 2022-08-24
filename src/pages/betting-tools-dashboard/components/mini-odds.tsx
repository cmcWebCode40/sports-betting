import React from 'react';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';
import { ReactComponent as DroppingIcon } from '../../../assets/icons/arrow_below.svg';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '0 12px 20px 12px',
      padding: '8px 10px',
      borderRadius: '4px',
      backgroundColor: theme.palette.white,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
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
    box: {
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    oddTitle: {
      alignItems: 'center',
      margin: '0.4rem auto',
    },
    iconDown: {
      margin: '0 0 -12px 0',
    },
  }),
);

const MiniOdds = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.oddTitle} variant="h5">
          2
        </Typography>
      </div>
      <Box className={classes.box} display="flex">
        <Typography className={classes.variant1} variant="h5">
          5.86
        </Typography>
        <SvgIcon className={classes.iconDown} component={DroppingIcon} />
      </Box>
    </div>
  );
};

export default MiniOdds;
