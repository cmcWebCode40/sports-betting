/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, Fragment } from 'react';
import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ITheme } from '../../themes/theme';
import V2BetsTitle from '../../components/v2bets/v2bets-title';
import V2BetDetails from '../../components/v2bets/v2bet-details';
import {
  AllLeagues,
  BettingSortingPanel,
  ClubLogo,
  CustomLoader,
  DatePanel,
} from '../../components';
import { useAppSelector } from '../../provider/hooks/hooks';
import { TMatches } from '../../models/leagues.model';
import { betsApiMiddleware, TBetsOddsResponse } from '../../logic/bets.logic';
import { setBetsOdds, setSelectedLeague } from '../../provider/features/leagues/leagues';
import TimeZoneSelector from '../../components/time-zone-selector/timezone-selector';
import {
  groupMatchesByLeague,
  sortByStartTime,
  sortLettersAlphabetically,
} from '../../utils/common.helpers';
import { TSortType } from '../../models';
import genRandomId from '../../helpers/gen-random-Id';
import { mdTabletView } from '../../themes/theme.constants';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '1.2rem 0',

      [theme.breakpoints.down('md')]: {
        margin: '20px auto',
      },
    },
    betView: {
      margin: '20px 0px',
      '& > *': {
        flexBasis: '50%',
      },
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    detailView: {
      margin: '0 0px 0px 10px ',
      [theme.breakpoints.down('md')]: {
        margin: 'auto',
      },
    },
    betViewList1: {
      // maxHeight: 700,
      margin: '0 10px 0px 0px ',
      cursor: 'pointer',

      backgroundColor: theme.palette.veryLightPink.main,
      [theme.breakpoints.down('md')]: {
        margin: '20px auto ',
      },
    },
    betViewListBox: {
      height: 300,
      backgroundColor: theme.palette.veryLightPink.main,
    },
    betViewList2: {
      margin: '0 0px 0px 10px ',
    },
    divider: {
      height: '1px',
      margin: '-1px 0 21px',
      background: ` ${theme.palette.oceanGreen.main}`,
    },

    activeTitle: {
      background: '#cecdcd',
    },
    normal: {
      background: '#000',
    },
    selectArrow: {
      backgroundColor: '#cecdcd',
      position: 'absolute',
      top: '0',
      right: '-4%',
      height: '6.55rem',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ads: {
      backgroundColor: theme.palette.veryLightPink.main,
      width: '100%',
      height: '100%',
      padding: '15rem 8rem 16rem 9rem',
      fontSize: '60px',
      fontWeight: 600,
      color: theme.palette.brownGrey.main,
    },
    league: {
      padding: '0.4rem  0.8rem',
      textTransform: 'capitalize',
      fontSize: theme.typography.subtitle1.fontSize,
      color: theme.palette.white,
      backgroundImage: theme.palette.primary.light,
    },
    timezonePanel: {
      marginLeft: '5.75rem',
      [theme.breakpoints.down('md')]: {
        margin: '0.5rem auto ',
      },
    },
  }),
);

const countryLogoStyles = {
  borderRadius: '50%',
  height: '20px',
  width: '20px',
};

const bookies = { market: '', oddsName: '', bookieOdds: [] };

const V2BettingView = (): JSX.Element => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<any>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMatchEnded, setHasMatchEnded] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [sortType, setSortType] = useState<TSortType>('Country');
  const [matchTitle, setMatchTitle] = useState<TMatches | any>({});
  const mobileView = useMediaQuery(`(max-width:${mdTabletView})`);
  const { selectedMatchesByLeague, defaultMatchesData, processingMatches } = useAppSelector(
    (state) => state.sportsLeagues,
  );
  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const [activeState, setActiveState] = useState('');
  const [activeFilter, setActiveFilter] = useState(2);
  const [matches, setMatches] = useState({
    data: [],
    hasMore: true,
    length: 0,
  });
  const [totalPage] = useState(25);
  const [totalGames, setTotalGames] = useState(0);
  const dispatch = useDispatch();

  const p = mobileView ? 3 : 7;

  function initScroll(data: any[]) {
    setMatchTitle(data);
    if (data.length) {
      const newData = [...data];
      setTotalGames(newData.length);
      const nextItems = newData.splice(0, totalPage);
      setMatches((value) => ({ ...value, data: nextItems as any }));
    }
  }

  const filterOptions = (type: TSortType): void => {
    switch (type) {
      case 'Country': {
        setSortType(type);
        const groupByLeagues = groupMatchesByLeague(defaultMatchesData);
        const sortedData = sortLettersAlphabetically<TMatches[]>(groupByLeagues, 'country');
        dispatch(setSelectedLeague(sortedData));
        initScroll(sortedData);
        break;
      }
      case 'Start Time': {
        setSortType(type);
        const byStartTime = sortByStartTime(defaultMatchesData);
        dispatch(setSelectedLeague(byStartTime));
        initScroll(byStartTime);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    initScroll(selectedMatchesByLeague);
  }, [selectedMatchesByLeague, totalPage]);

  useEffect(() => {
    setSortType('Country');
    filterOptions('Country');
  }, [startDate]);

  const onSelectType = (index: string): void => setActiveState(index);

  const BestsOddsHandler = (item: TMatches, index: string) => {
    onSelectType(index);
    if (!item.status) {
      setHasMatchEnded(true);
      return;
    }
    setMatchTitle(item);

    setIsLoading(!isLoading);
    betsApiMiddleware<{ data: TBetsOddsResponse }>({
      method: 'get',
      url: `/sports/${activeSport.id}/default-odds?url=${item.url}`,
    })
      .then((res) => {
        if (res?.data) {
          setOpenView(true);

          dispatch(setBetsOdds(res?.data));
        } else {
          setOpenView(false);
        }
      })
      .catch(() => {
        dispatch(setBetsOdds({ data: bookies }));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {}, [activeSport]);

  const fetchMoreData = () => {
    if (totalGames === matches.data.length) {
      setMatches({ ...matches, hasMore: false });
      return;
    }
    setTimeout(() => {
      const newData = [...selectedMatchesByLeague];
      const nextItems = newData.splice(0, totalPage);
      setMatches((value) => ({ ...value, data: value.data.concat(nextItems as any) }));
    }, 500);
  };

  return (
    <div className={classes.root}>
      <AllLeagues dateValue={startDate} />
      <DatePanel startDate={startDate} setStartDate={setStartDate} maxDate={4} />
      <Divider className={classes.divider} />
      <Grid container>
        <Grid item md={8}>
          <BettingSortingPanel
            onFilter={filterOptions}
            activeState={activeFilter}
            setActiveState={setActiveFilter}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12} className={classes.timezonePanel}>
          <TimeZoneSelector />
        </Grid>
      </Grid>
      <Box display="flex" className={classes.betView}>
        <Box boxShadow={3} borderRadius={6} className={classes.betViewList1}>
          {processingMatches ? (
            <Box display="flex" alignItems="center" justifyContent="center" padding={30}>
              <CustomLoader />
            </Box>
          ) : matches.data.length ? (
            <InfiniteScroll
              key={genRandomId()}
              dataLength={matches.data.length}
              next={fetchMoreData}
              hasMore={matches.hasMore}
              style={{ maxHeight: 700 }}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {matches.data.map((item: any) => (
                <Fragment key={genRandomId()}>
                  {sortType === 'Country' ? (
                    <Box
                      key={genRandomId()}
                      style={{
                        position: 'relative',
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.league}
                      >
                        <Box>{item.league}</Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize={16}
                        >
                          <Box component="span">{item.country}</Box>
                          <Box mx={2}>
                            <ClubLogo styles={countryLogoStyles} src={item.countryLogo} />
                          </Box>
                        </Box>
                      </Box>
                      {item.matches.map((match: TMatches) => (
                        <Box
                          key={genRandomId()}
                          onClick={() => BestsOddsHandler(match, match.home)}
                        >
                          <V2BetsTitle data={match} titleStyle={activeState === match.home} />
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box key={genRandomId()} onClick={() => BestsOddsHandler(item, item.home)}>
                      <V2BetsTitle data={item} titleStyle={activeState === item.home} />
                    </Box>
                  )}
                </Fragment>
              ))}
            </InfiniteScroll>
          ) : (
            <Box height={500} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h3" color="primary">
                No Data
              </Typography>
            </Box>
          )}
        </Box>
        <div className={classes.detailView}>
          {isLoading ? (
            <Box
              boxShadow={3}
              borderRadius={6}
              className={classes.betViewListBox}
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={10}
            >
              <CustomLoader />
            </Box>
          ) : openView ? (
            <V2BetDetails setModal={setOpenView} matchTitle={matchTitle} />
          ) : (
            <Box
              boxShadow={3}
              borderRadius={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.ads}
            >
              {hasMatchEnded ? (
                <Typography variant="h4" color="primary">
                  The fees for the event have ended
                </Typography>
              ) : (
                'Ads'
              )}
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
};

export default V2BettingView;
