/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

import BetBookmakers from './bet-bookmakers';
import BetLeaguesTitle from './bet-leagues-title';
import { ITheme } from '../../../../themes/theme';

const useStyles = makeStyles((_theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  }),
);

interface IBest {
  children: React.ReactNode;
}

export const Bets = ({ children }: IBest): JSX.Element => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

Bets.BetBookmakers = BetBookmakers;
Bets.BetLeaguesTitle = BetLeaguesTitle;

export default Bets;
