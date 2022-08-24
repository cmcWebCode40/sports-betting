import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    bookmaker: {
      width: '120px',
      height: '60px',
      margin: '0 0 8px 10px',
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
      fontSize: ' 15px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.black,
    },
    subTitle: {
      fontSize: ' 14px',
      color: theme.palette.brownGrey.main,
    },
  }),
);

type IMakers = {
  componentType?: any;
  value: number;
};
const V2BetBookmakers = ({ componentType = 'div', value }: IMakers): JSX.Element => {
  const classes = useStyles();

  return (
    <Box component={componentType} className={classes.bookmaker}>
      <Typography className={classes.title} variant="h4">
        {value}
      </Typography>
      <Typography className={classes.subTitle} variant="body1" />
    </Box>
  );
};

export default V2BetBookmakers;
