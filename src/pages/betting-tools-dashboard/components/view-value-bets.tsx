import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ITheme } from '../../../themes/theme';
import BettingToolMatches from '../../../components/betting-tools/betting-tool-matches';
import BettingToolGames from '../../../components/betting-tools/betting-tool-games';
import PageTitleBar from './page-title-bar';
import SortingPanel from './sorting-panel';
import ViewBetOdds from './view-bet-odds';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {},
    table: {
      minWidth: 650,
      background: theme.palette.veryLightPink.main,
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0.3, 0.7),
      },
    },
    tableHead: {
      background: theme.palette.white,
    },
    tableCells: {
      margin: '20px 64px 40px 42px',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
      color: '#2f353d',
    },
  }),
);

const ViewValueBets = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <PageTitleBar title="Value Bets" />
      <SortingPanel />
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" />
              <TableCell padding="default" align="left">
                Odd
              </TableCell>
              <TableCell align="justify">Bet Type</TableCell>
              <TableCell align="justify">Outcome</TableCell>
              <TableCell align="justify">Value</TableCell>
              <TableCell align="justify">Probability</TableCell>
              <TableCell align="justify" />
            </TableRow>
          </TableHead>
          <TableBody>
            {[1].map((row) => (
              <TableRow key={row}>
                <TableCell align="left" component="div" scope="row">
                  <BettingToolMatches />
                </TableCell>
                <TableCell align="justify">
                  <ViewBetOdds bookmakers={[1]} />
                </TableCell>
                <TableCell align="justify" className={classes.tableCells}>
                  EH+2
                </TableCell>
                <TableCell align="justify" className={classes.tableCells}>
                  2
                </TableCell>
                <TableCell align="justify" className={classes.tableCells}>
                  2.32
                </TableCell>
                <TableCell align="justify" className={classes.tableCells}>
                  5.12%
                </TableCell>
                <TableCell align="justify" component="div">
                  <BettingToolGames />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewValueBets;
