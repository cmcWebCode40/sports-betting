/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../themes/theme';
import BetBookmakers from './bet-bookmakers';
import BetLeaguesTitle from './bet-leagues-title';

const useStyles = makeStyles((_theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      flexBasis: '70%',
      // flexFlow: 'row nowrap',
      // justifyContent: 'space-between',
      // alignItems: 'flex-start',
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
