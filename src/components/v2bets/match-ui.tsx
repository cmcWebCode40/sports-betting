import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, Divider, makeStyles } from '@material-ui/core';
import { ITheme } from '../../themes/theme';
import { TMatches } from '../../models/leagues.model';
import { ClubLogo } from '..';
import TimeZoneUtils, { truncateString } from '../../utils/common.helpers';
import { useAppSelector } from '../../provider/hooks/hooks';

const useLeagueViewStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        borderBottom: `1px solid ${theme.palette.brownGrey.main}`,
      },
    },
    grid: {
      padding: '20px 10px',
      backgroundColor: theme.palette.veryLightPink.main,
      '& > *': {
        margin: '0.9rem 0.3rem ',
        width: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0',
        justifyContent: 'center',
        flexFlow: 'row nowrap',
        '& > *': {
          margin: '0.4rem ',
        },
      },
    },
    activeGrid: {
      padding: '20px 10px',
      backgroundColor: '#cecdcd',
      '& > *': {
        margin: '0.9rem 0.3rem ',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0',
        justifyContent: 'center',
        flexFlow: 'row nowrap',
        '& > *': {
          margin: '0.4rem ',
        },
      },
    },
    title: {
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: 600,
      margin: '0rem 0.5rem 0 0',
      color: theme.palette.nastyGreen.main,
      [theme.breakpoints.down('sm')]: {},
    },
    gameText: {
      height: '19px',
      minWidth: '7rem',
      width: '7rem',
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.grayishBrown.main,
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
    link: {
      textDecoration: 'none',
      display: 'block',
    },
    score: {
      margin: '0 0 0 -3rem',
      fontWeight: 600,
      minWidth: '8rem',
      color: theme.palette.black,
    },
  }),
);

const { convertTz } = TimeZoneUtils;

const clubStyles = {
  margin: '0 0.4rem 0em 0.4rem  ',
};
interface IV2Bet {
  data: TMatches;
  titleStyle: boolean;
}
const MatchUI = ({ data, titleStyle }: IV2Bet): JSX.Element => {
  const classes = useLeagueViewStyles();
  const [score, setScore] = useState({
    homeScore: '',
    awayScore: '',
  });
  const {
    timezone: { active },
  } = useAppSelector((state) => state.bookmarkers);

  useEffect(() => {
    if (data.status !== 'waiting to start') {
      const scores = data.status.replace(':', ' ').split(' ');
      setScore({
        homeScore: scores[0],
        awayScore: scores[1],
      });
    }
  }, [data.status]);

  return (
    <>
      <Box
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        className={titleStyle ? classes.activeGrid : classes.grid}
      >
        <Box display="flex">
          <span className={classes.title}>{convertTz({ tz: active, time: data.hour })}</span>
          <span className={classes.gameText}>{truncateString(data.home)}</span>
        </Box>
        <Box
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          className={classes.score}
        >
          <ClubLogo styles={clubStyles} src={data.homeLogo} /> <span>{score.homeScore}</span>
          <Typography>-</Typography>
          <span>{score.awayScore}</span> <ClubLogo styles={clubStyles} src={data.away} />
        </Box>
        <Typography className={classes.gameText}>{truncateString(data.away)}</Typography>
      </Box>
      <Divider
        style={{
          background: '#ddd',
        }}
      />
    </>
  );
};

export default MatchUI;
