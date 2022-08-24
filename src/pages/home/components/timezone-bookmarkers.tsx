import React from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import TimeZoneSelector from '../../../components/time-zone-selector/timezone-selector';
import { ITheme } from '../../../themes/theme';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'end',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }),
);

const TimezoneBookmakers = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TimeZoneSelector />
    </Box>
  );
};

export default TimezoneBookmakers;
