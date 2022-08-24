import React, { useEffect, useState } from 'react';
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';

import { ITheme } from '../../themes/theme';
import { ClubLogo } from '..';
import TimeZoneUtils from '../../utils/common.helpers';

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    grid: {
      [theme.breakpoints.down('sm')]: {
        // display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        '& > *': {
          margin: '0.4rem  0',
        },
      },
      '& > *': {
        margin: '0 2.5rem ',
      },
    },
    title: {
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: 600,
      width: '3rem',
      minWidth: '3rem',
      margin: '0 0 0.5rem 0',
      color: theme.palette.nastyGreen.main,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    gameText: {
      height: 'auto',
      width: '8rem',
      minWidth: '8rem',
      margin: '0 0.6rem',
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.grayishBrown.main,
      '&:hover': {
        color: `${theme.palette.primary.main}`,
        fontWeight: 600,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        textAlign: 'center',
      },
    },
    scores: {
      height: '19px',
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: 600,
      textAlign: 'right',
      color: theme.palette.black,
    },
    dashedLine: {
      height: '1px',
      width: '7rem',
      fontSize: '1rem',
      minWidth: '7rem',
      '& > *': {
        margin: '0.3rem 1rem -0.7rem 1rem ',
      },
      '& span': {
        fontWeight: 600,
        color: theme.palette.black,
      },
    },
  }),
);

type BetLeaguesProps = {
  data: any;
};
const { convertSecToMin } = TimeZoneUtils;
const BetLeaguesTitle = ({ data: item }: BetLeaguesProps): JSX.Element => {
  const classes = useStyles();
  const [score, setScore] = useState({
    homeScore: '',
    awayScore: '',
  });

  const formatDate = (timeSec: number) => {
    const InSeconds = convertSecToMin(timeSec);

    return InSeconds;
  };

  useEffect(() => {
    if (item.score) {
      const scores = item.score.replace(':', ' ').split(' ');
      setScore({
        homeScore: scores[0],
        awayScore: scores[1],
      });
    }
  }, [item?.score]);

  return (
    <Box display="flex" className={classes.grid}>
      <Typography className={classes.title}>{`${formatDate(item.timeSec) || ''}"`}</Typography>
      <Typography className={classes.gameText}>{item.home}</Typography>
      <Box>
        <ClubLogo src={item.homeLogo} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.dashedLine}
      >
        <span>{score.homeScore}</span> <span>-</span> <span>{score.awayScore}</span>
      </Box>
      <Box>
        <ClubLogo src={item.awayLogo} />
      </Box>
      <Typography className={classes.gameText}>{item.away}</Typography>
    </Box>
  );
};

export default BetLeaguesTitle;
