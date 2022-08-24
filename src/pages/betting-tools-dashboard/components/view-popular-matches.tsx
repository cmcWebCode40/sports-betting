import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import BettingToolGames from '../../../components/betting-tools/betting-tool-games';
import PageTitleBar from './page-title-bar';
import { ITheme } from '../../../themes/theme';
import BetBookmakers from '../../../components/bets/bet-bookmakers';
import BettingToolMatches from '../../../components/betting-tools/betting-tool-matches';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '0 0 20px 54px',
      padding: '8px 20px',
      borderRadius: '4px',
    },
    box: {
      background: theme.palette.veryLightPink.main,
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '20px 5px',
      margin: '0 14px 0px 14px',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      },
      '& > *': {
        margin: '10px 0',
      },
    },
    tableTitle: {
      height: '20px',
      margin: '15px 10px 15px 10px',
      fontSize: '16px',
      fontWeight: 300,
      textAlign: 'center',
      color: theme.palette.grayishBrown.main,
    },
  }),
);

const ViewPopularMatches = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <PageTitleBar title="Popular Matches" />
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <Box key={item} display="flex" className={classes.box}>
          <BettingToolMatches />
          <Box display="flex">
            <BetBookmakers bookmakers={[1, 2, 3]} />
          </Box>
          <BettingToolGames />
        </Box>
      ))}
    </div>
  );
};

export default ViewPopularMatches;
