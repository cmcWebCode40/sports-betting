/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import LeagueMatchView from './components/league-match-view';
import { BettingSortingPanel, CustomLoader, DatePanel } from '../../components';
import { useHomeStyles } from './components/style/home.styles';
import TopBookmakerList from './components/top-bookmarker-list';
import AdsCenter from './components/Ads-center';
import TimezoneBookmakers from './components/timezone-bookmarkers';
import { getAllSports } from '../../logic/home/home.logic';
import { useAppSelector } from '../../provider/hooks/hooks';
import {
  groupMatchesByLeague,
  sortByStartTime,
  sortLettersAlphabetically,
} from '../../utils/common.helpers';
import { TFormattedMatches, TMatches, TSortType } from '../../models';

const loaderStyle = {
  margin: '6rem 0',
};

const Home: React.FC = () => {
  const classes = useHomeStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TSortType>('Country');
  const [sportsData, setSportsData] = useState<TFormattedMatches[] | TMatches[]>([]);
  const [matches, setMatches] = useState({
    data: [],
    hasMore: true,
    length: 0,
  });
  const [totalPage] = useState(25);
  const [totalGames, setTotalGames] = useState(0);
  const [sportsDataInCache, setSportsDataInCache] = useState<any[]>([]);

  const [activeFilter, setActiveFilter] = useState(3);
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  function initScroll(data: any[]) {
    setTotalGames(data.length);
    const nextItems = data.splice(0, totalPage);
    setMatches((value) => ({ ...value, data: nextItems as any }));
  }

  const filterOptions = (sortType: TSortType): void => {
    switch (sortType) {
      case 'Country': {
        setType(sortType);
        const tt = groupMatchesByLeague(sportsDataInCache);
        const result = sortLettersAlphabetically<any>(tt || [], 'country');
        setSportsData(result);
        initScroll(result);
        break;
      }
      case 'Start Time': {
        setType(sortType);
        const result = sortByStartTime(sportsDataInCache);
        setSportsData(result);
        initScroll(result);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const date = moment.utc(startDate).format('YYYY-MM-DD');

    if (activeSport.id) {
      setLoading(true);
      getAllSports({ sports: activeSport?.id, date })
        .then((data) => {
          const games = data?.data?.data;
          const response = groupMatchesByLeague(games);
          setSportsData(response);
          setSportsDataInCache(games);
          initScroll(response);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // Set filter options to country due to change in sorting UI
    setActiveFilter(3);
    filterOptions('Country');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, activeSport]);

  const fetchMoreData = () => {
    if (totalGames === matches.data.length) {
      setMatches({ ...matches, hasMore: false });
      return;
    }
    setTimeout(() => {
      const nextItems = sportsData.splice(0, totalPage);
      setMatches((value) => ({ ...value, data: value.data.concat(nextItems as any) }));
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.toSelectButton}>
        <Grid item md={8}>
          <div />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TimezoneBookmakers />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={8} xs={12}>
          <DatePanel startDate={startDate} setStartDate={setStartDate} maxDate={3} />
          <Divider className={classes.divider} />
          <Box my={2}>
            <BettingSortingPanel
              onFilter={filterOptions}
              activeState={activeFilter}
              setActiveState={setActiveFilter}
            />
          </Box>
          {loading ? (
            <CustomLoader styles={loaderStyle} />
          ) : matches.data.length ? (
            <LeagueMatchView fetchMoreData={fetchMoreData} matches={matches} sortType={type} />
          ) : (
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              height={500}
              bgcolor="#f0f0f0"
              borderRadius={6}
              boxShadow={3}
            >
              <h3> no data</h3>
            </Box>
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <TopBookmakerList />
          <AdsCenter />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
