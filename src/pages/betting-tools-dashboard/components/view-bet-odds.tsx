import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ITheme } from '../../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexBasis: '10%',
      '& > * ': {
        display: 'block',
      },
    },
    subRoot: {
      display: 'flex',
      textAlign: 'center',
    },
    bookmaker: {
      width: '140px',
      margin: '0 30px 20px 20px',
      padding: '8px 4px 0px 4px',
      borderRadius: '4px',
      backgroundColor: theme.palette.white,
      [theme.breakpoints.down('sm')]: {
        width: '60px',
        margin: '0 8px 10px 8px',
      },
    },
    bookmakerLogo: {
      margin: '6px 0 ',
      padding: '2px 5px',
      borderRadius: '2px',
      border: 'solid 1px#cecdcd',
      backgroundColor: '#027b5b',
    },
    title: {
      margin: '0 44px 7px 45px',
      fontSize: '15px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.black,
    },
  }),
);

type IMakers = {
  bookmakers: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentType?: any;
};
const ViewBetOdds = ({ bookmakers, componentType = 'div' }: IMakers): JSX.Element => {
  const classes = useStyles();

  return (
    <Box component={componentType} className={classes.root}>
      <Box component={componentType} className={classes.subRoot}>
        {bookmakers.map((list: number) => (
          <Box component={componentType} key={list} className={classes.bookmaker}>
            <Typography className={classes.title} variant="h4">
              407.00
            </Typography>
            <Box component={componentType} className={classes.bookmakerLogo}>
              logo
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ViewBetOdds;
