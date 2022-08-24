import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '33px 20px 35px 35px',
      padding: '20px 20px 21px 19px',
      backgroundColor: theme.palette.veryLightPink.main,
    },
    box: {
      justifyContent: 'space-around',
      alignItems: 'center',
      '& > *': {
        margin: '0rem 0.7rem',
      },
    },
    header: {
      height: '40px',
      borderRadius: '4px',
      margin: '0 0 21px 1px',
      padding: '10px 30px 8px 19px',
      backgroundColor: theme.palette.white,
    },
    date: {
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'right',
      margin: '0 1px 2px 2px',
      color: theme.palette.grayishBrown.main,
    },
    time: {
      fontSize: '17px',
      fontWeight: 600,
      textAlign: 'right',
      margin: '2px 0 0',
      color: theme.palette.grayishBrown.main,
    },
     teamImg1: {
      width: '24px',
      height: '24px',
      background: '#ccc',
      margin:'0 0rem 0 -2rem'
    },
     teamImg2: {
      width: '24px',
      height: '24px',
      background: '#ccc',
      margin:'0  -2rem 0 0'
    },
     dashed: {
      margin:'0 0.5rem '
    },
    match: {
      fontWeight: 600,
      fontFamily: 'Ubuntu',
      fontSize: '13px',
      textAlign: 'right',
      margin: '3px 39px 3px 21px',
      color: theme.palette.grayishBrown.main,
    },
  }),
);

const BettingToolMatches = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.box}>
      <div>
        <Typography className={classes.date}>Today</Typography>
        <Typography className={classes.time}>19:00</Typography>
      </div>
      <Typography className={classes.match}>Dagenham and Redbridge</Typography>
       <img src="" className={classes.teamImg1} alt="team" />
      <Typography className={classes.dashed}>-</Typography>
       <img src="" className={classes.teamImg2} alt="team" />
      <Typography className={classes.match}>Hapoel Tirat Ha Carmel</Typography>
    </Box>
  );
};

export default BettingToolMatches;
