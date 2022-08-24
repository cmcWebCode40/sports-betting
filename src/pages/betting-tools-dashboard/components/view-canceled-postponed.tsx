import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BettingToolGames from '../../../components/betting-tools/betting-tool-games';
import BettingToolMatches from '../../../components/betting-tools/betting-tool-matches';
import OddsDroppingBlocked from './odds-dropping-blocked';
import PageTitleBar from './page-title-bar';
import SortingPanel from './sorting-panel';
import { ITheme } from '../../../themes/theme';

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
    itemTitle: {
      '& > *': {
        margin: '10px 15px',
        fontSize: '15px',
        color: theme.palette.grayishBrown.main,
      },
    },
  }),
);

const ViewCanceledPostPone = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <PageTitleBar title="Canceled / Postponed Games" />
      <SortingPanel />
      <Box display="flex">
        <div
          style={{
            flexGrow: 0.5,
          }}
        />
        <div
          style={{
            flexGrow: 0.3,
          }}
        >
          <Typography variant="h3" className={classes.tableTitle}>
            Canceled / Postponed
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 0,
          }}
        >
          {' '}
          <Typography variant="h3" className={classes.tableTitle}>
            League
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 0.1,
          }}
        >
          {' '}
          <Typography variant="h3" className={classes.tableTitle}>
            Country
          </Typography>
        </div>
      </Box>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <Box key={item} display="flex" className={classes.box}>
          <BettingToolMatches />
          <OddsDroppingBlocked type="canceled" />
          <Box key={item} display="flex" className={classes.itemTitle}>
            <Typography variant="h3">Country</Typography>
            <Typography variant="h3">China</Typography>
          </Box>
          <BettingToolGames />
        </Box>
      ))}
    </div>
  );
};

export default ViewCanceledPostPone;
