import React, { useState } from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { ITheme } from '../../themes/theme';
import { betsApiMiddleware } from '../../logic/bets.logic';
import { standingResponse } from '../../resources/stadings';
import genRandomId from '../../helpers/gen-random-Id';
import { TGameType, TypeStandingRecords } from '../../models';
import { ClubLogo } from '../../components';
import { truncateString } from '../../utils/common.helpers';
import { queryUrl } from '../../helpers/query-params';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.veryLightPink.main,
    },
    table: {
      minWidth: 650,
      backgroundColor: theme.palette.veryLightPink.main,
      '& tr': {
        '& th': {
          fontSize: '1rem',
          textTransform: 'capitalize',
        },
        '& td': {
          fontWeight: 500,
          fontSize: '0.9rem',
        },
      },
    },
    wrapper: {
      padding: theme.spacing(1),
      margin: theme.spacing(4, 'auto'),
      backgroundColor: theme.palette.veryLightPink.main,
    },
    tableWrapper: {
      padding: theme.spacing(1),
      margin: theme.spacing(1, 1.5),
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(0, 0, 0, 23),
      '& > *': {
        margin: theme.spacing(0.3, 0.7),
      },
    },
    divider: {
      height: '1px',
      margin: '-1px 0 21px',
      background: ` ${theme.palette.oceanGreen.main}`,
    },
    CGreen: {
      margin: '5px 3px 10px 14px',
      color: theme.palette.nastyGreen.main,
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
    },
    CRed: {
      margin: '5px 3px 10px 14px',
      color: theme.palette.paleRed.main,
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
    },
    CYellow: {
      margin: '5px 3px 10px 14px',
      color: '#ffc948',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
    },
    title: {
      margin: theme.spacing(0, 0, 0, 3),
      fontSize: theme.typography.h5.fontSize,
      color: '#4a4a4a',
    },
    s_n: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    activeButton: {
      padding: '6px 15px 8px 16px',
      textTransform: 'capitalize',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.white,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,

      color: theme.palette.oceanGreen.main,
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    boxParent: {
      margin: theme.spacing(0, 2),
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
      '& >*': {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down('md')]: {
          margin: theme.spacing(0),
        },
      },
    },
    tableContainer: {
      maxHeight: 640,
    },
  }),
);

const BettingLeagueMatches = (): JSX.Element => {
  const classes = useStyles();
  const [data] = useState<TypeStandingRecords>(standingResponse);
  const [activeState, setActiveState] = useState(0);
  const [gameType, setGameType] = useState<TGameType>('all');
  const [url, setUrl] = useState<number | undefined>();
  const location = useLocation();
  const leagueUrl = queryUrl(location).get('url');
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  const { refetch } = useQuery<any>({
    queryFn: () =>
      betsApiMiddleware<{ data: { data: any[] } }>({
        method: 'get',
        url: url
          ? `/standings/${activeSport.id}/${leagueUrl}?season=${url}`
          : `/standings/${activeSport.id}/${leagueUrl}`,
      }),
    queryKey: 'team-standings',
    retry: false,
    refetchOnWindowFocus: false,
  });

  const onSelectType = (index: number): void => setActiveState(index);

  const handleSeasonChangeEvent = (season: number, index: number) => {
    onSelectType(index);
    setUrl(season);
    setTimeout(() => {
      refetch();
    }, 200);
  };

  return (
    <Box boxShadow={3} borderRadius={6} className={classes.wrapper}>
      <Box py={3} display="flex" justifyContent="space-between">
        <Box
          className={classes.boxParent}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.title} variant="h5">
            Season :
          </Typography>
          {data.seasons.map((item, index: number) => (
            <Button
              onClick={() => {
                handleSeasonChangeEvent(item, index);
              }}
              className={activeState === index ? classes.activeButton : classes.button}
              key={item}
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box className={classes.boxParent} display="flex">
          {(['all', 'home', 'away'] as TGameType[]).map((item) => (
            <Button
              onClick={() => {
                setGameType(item);
              }}
              className={gameType === item ? classes.activeButton : classes.button}
              key={item}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>

      <div className={classes.tableWrapper}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Desk</TableCell>
                <TableCell padding="default" align="left">
                  Team
                </TableCell>
                <TableCell>played </TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Form</TableCell>
                <TableCell>GoalDiff</TableCell>
                <TableCell>status</TableCell>
                <TableCell>W</TableCell>
                <TableCell>D</TableCell>
                <TableCell>L</TableCell>
                <TableCell>D</TableCell>
                <TableCell>G(For)</TableCell>
                <TableCell>G(Against)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.standing.map((item, index) => (
                <TableRow key={genRandomId()}>
                  <TableCell className={classes.s_n} align="left" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell width={200} padding="default" align="left">
                    <Box display="flex" component="span" alignItems="center">
                      <ClubLogo src="" />
                      <Typography className={classes.title} variant="h5">
                        {truncateString('Man city')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.all.played}</TableCell>
                  <TableCell>{item.season}</TableCell>
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.points}</TableCell>
                  <TableCell>{item.form}</TableCell>
                  <TableCell
                    className={
                      Math.sign(Number(item.goalsDiff)) === -1 ? classes.CRed : classes.CGreen
                    }
                  >
                    {item.goalsDiff}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className={classes.CGreen}>{item[gameType].win}</TableCell>
                  <TableCell className={classes.CYellow}>{item[gameType].draw}</TableCell>
                  <TableCell className={classes.CRed}>{item[gameType].lose}</TableCell>
                  <TableCell>{item[gameType].goals.for}</TableCell>
                  <TableCell>{item[gameType].goals.against}</TableCell>
                  <TableCell>{item[gameType].played}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default BettingLeagueMatches;
