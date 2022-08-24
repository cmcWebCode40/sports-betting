import React from 'react';
import { makeStyles, createStyles, SvgIcon } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ITheme } from '../../../themes/theme';
// import BetBookmakers from '../../../components/bets/bet-bookmakers';
import DynamicSelectButton from './dynamic-select-button';
import { TBookieOdds, TMatches } from '../../../models/leagues.model';
import { ReactComponent as ArrowDropUpIcon } from '../../../assets/icons/arrow_up.svg';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/arrow_below.svg';
import { useAppSelector } from '../../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0.3),
      backgroundColor: theme.palette.veryLightPink.main,
    },
    table: {
      minWidth: 650,
      textTransform: 'capitalize',
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0.3, 0.7),
      },
    },
    arrowIcon: {
      margin: '0 0.5rem -0.7rem  0.3rem',
    },
    odds: {
      width: '120px',
      margin: '0 8px 0 0',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.black,
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: '0 8px',
      },
    },
    bLogo: {
      height: '37px',
      padding: '4px 29px',
    },
    title: {
      margin: theme.spacing(1, 0, 0, 0),
      fontSize: '20px',
      color: '#4a4a4a',
    },
  }),
);

interface IDetailsHeader {
  match?: TMatches;
}

export default function DetailsTable({ match }: IDetailsHeader): JSX.Element {
  const classes = useStyles();
  const { betsOdds } = useAppSelector((state) => state.sportsLeagues);

  const arrowUpIcon = <SvgIcon className={classes.arrowIcon} component={ArrowDropUpIcon} />;
  const arrowDownIcon = <SvgIcon className={classes.arrowIcon} component={DropDownIcon} />;

  return (
    <div className={classes.root}>
      <DynamicSelectButton urlCode={match} />
      <Typography />
      <Box className={classes.box}>
        <Typography />
        <Typography />
        <Typography />
        <Typography />
        <Typography />
      </Box>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell padding="default" align="left" />
              <TableCell align="justify" />
              <TableCell align="justify" />
              <TableCell align="justify" />
              <TableCell align="justify" />
            </TableRow>
          </TableHead>

          <TableBody>
            {betsOdds?.bookieOdds &&
              betsOdds.bookieOdds.map((item: TBookieOdds) => (
                <TableRow key={item.name}>
                  <TableCell align="left" component="th" scope="row">
                    <Box display="flex" component="span">
                      <img className={classes.bLogo} src={item.bookieLogo} alt={item.name} />
                      <span className={classes.title}>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell padding="default" align="left">
                    <Typography className={classes.odds}>
                      {item.mvt[0] === 'up' ? (
                        <span>
                          {item.odds[0]}
                          {arrowUpIcon}
                        </span>
                      ) : (
                        <span>
                          {item.odds[0]}
                          {arrowDownIcon}
                        </span>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="justify">
                    {' '}
                    <Typography className={classes.odds}>
                      {item.mvt[1] === 'up' ? (
                        <span>
                          {item.odds[1]}
                          {arrowUpIcon}
                        </span>
                      ) : (
                        <span>
                          {item.odds[1]}
                          {arrowDownIcon}
                        </span>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="justify">
                    {' '}
                    <Typography className={classes.odds}>
                      {item.mvt[2] === 'up' ? (
                        <span>
                          {item.odds[2]}
                          {arrowUpIcon}
                        </span>
                      ) : (
                        <span>
                          {item.odds[2]}
                          {arrowDownIcon}
                        </span>
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
