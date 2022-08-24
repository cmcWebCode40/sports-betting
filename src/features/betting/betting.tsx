import React, { useEffect, useState } from 'react';
import { createStyles, Divider, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Bets from '../../components/bets';
import { AllLeagues, BettingSortingPanel, Coupons, DatePanel } from '../../components';
import { ITheme } from '../../themes/theme';
import genRandomId from '../../helpers/gen-random-Id';

const listOfLeagues = [
  {
    id: 1,
    timeScore: 23,
    opp1: 'Man city',
    opp1Score: 0,
    opp2: 'Chelsea',
    opp2Score: 1,
    bookmakers: [
      {
        id: 1,
        title: 'Bets365',
        odd: '1',
        value: 3.86,
      },
      {
        id: 2,
        title: '3peoe',
        odd: '1',
        value: 4.86,
      },
      {
        id: 3,
        title: 'Bets365',
        odd: '1',
        value: 2.86,
      },
    ],
  },
  {
    id: 2,
    timeScore: 23,
    opp1: 'Man city',
    opp1Score: 0,
    opp2: 'Chelsea',
    opp2Score: 1,
    bookmakers: [
      {
        id: 14,
        title: 'name',
        odd: 'x',
        value: 2.86,
      },
    ],
  },
  {
    id: 3,
    timeScore: 23,
    opp1: 'Man city',
    opp1Score: 0,
    opp2: 'Chelsea',
    opp2Score: 1,
    bookmakers: [
      {
        id: 19,
        title: 'name',
        odd: 'x',
        value: 2.86,
      },
    ],
  },
  {
    id: 4,
    timeScore: 23,
    opp1: 'Man city',
    opp1Score: 0,
    opp2: 'Chelsea',
    opp2Score: 1,
    bookmakers: [
      {
        id: 10,
        title: 'name',
        odd: 'x',
        value: 2.86,
      },
    ],
  },
  {
    id: 5,
    timeScore: 23,
    opp1: 'Man city',
    opp1Score: 0,
    opp2: 'Chelsea',
    opp2Score: 1,
    bookmakers: [
      {
        id: 122,
        title: 'name',
        odd: 'x',
        value: 2.86,
      },
    ],
  },
];

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {},
    divider: {
      height: '1px',
      margin: '-1px 0 21px',
      background: ` ${theme.palette.oceanGreen.main}`,
    },
    panelTab: {
      margin: theme.spacing(0, 4),
    },
    bookmakersRoot: {
      margin: '10px 50px 0',
      [theme.breakpoints.down('md')]: {
        margin: '10px 10px 0',
      },
    },
    bookmakers: {
      position: 'relative',
      padding: '19px 0 0 29px',
      margin: '20px 0',
      backgroundColor: theme.palette.veryLightPink.main,
      [theme.breakpoints.down('md')]: {},
    },
  }),
);

const Betting = (): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState(0);

  const filterOptions = () => {};

  useEffect(() => {}, [location]);

  return (
    <div className={classes.root}>
      <div className={classes.panelTab}>
        <AllLeagues />
      </div>
      <DatePanel startDate={startDate} setStartDate={setStartDate} />
      <Divider className={classes.divider} />
      <div className={classes.bookmakersRoot}>
        <BettingSortingPanel
          onFilter={filterOptions}
          activeState={activeFilter}
          setActiveState={setActiveFilter}
        />
        <div className={classes.bookmakers}>
          {listOfLeagues.map((list) => (
            <Bets key={genRandomId()}>
              <Bets.BetLeaguesTitle data={list} />
              <Bets.BetBookmakers bookmakers={list} />
            </Bets>
          ))}
        </div>
      </div>
      <Coupons />
    </div>
  );
};

export default Betting;
