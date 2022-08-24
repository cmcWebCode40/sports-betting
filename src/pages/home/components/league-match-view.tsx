import React, { Fragment, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import genRandomId from '../../../helpers/gen-random-Id';
import { useLeagueViewStyles } from './style/home.styles';
import { TMatches } from '../../../models/leagues.model';
import { useAppSelector } from '../../../provider/hooks/hooks';
import { ClubLogo } from '../../../components';
import { TSortType } from '../../../models';

import MatchUI from './match-ui';

const countryLogoStyles = {
  borderRadius: '50%',
  height: '20px',
  width: '20px',
  marginTop: '0.1rem',
};
interface ILeagueMatchView {
  sortType: TSortType;
  fetchMoreData: any;
  matches: any;
}

const V2MatchesDisplay = ({ matches }: any) => (
  <>
    {matches.data.map((item: TMatches) => (
      <MatchUI match={item} key={genRandomId()} />
    ))}
  </>
);

const V1MatchesDisplay = ({ matches, classes }: any) => (
  <>
    {matches.data.map((item: any) => (
      <Fragment key={genRandomId()}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.league}
        >
          <Box>{item.league}</Box>
          <Box display="flex" alignItems="center" justifyContent="center" fontSize={16}>
            <Box component="span">{item.country}</Box>
            <Box mx={2}>
              <ClubLogo styles={countryLogoStyles} src={item.countryLogo} />
            </Box>
          </Box>
        </Box>
        {item.matches.map((game: TMatches) => (
          <MatchUI match={game} key={genRandomId()} />
        ))}
      </Fragment>
    ))}
  </>
);

const LeagueMatchView = ({ sortType, fetchMoreData, matches }: ILeagueMatchView): JSX.Element => {
  const classes = useLeagueViewStyles();
  const {
    activeSport,
    timezone: { active },
  } = useAppSelector((state) => state.bookmarkers);
  const history = useHistory();

  useEffect(() => {}, [active]);

  const handleSportSelection = (query: string) => {
    history.push(`/bet/sport/${query}`);
  };

  return (
    <InfiniteScroll
      dataLength={matches.data.length}
      next={fetchMoreData}
      hasMore={matches.hasMore}
      loader={<h4>Loading...</h4>}
      height={780}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Box borderRadius={6} mt={2} boxShadow={3} className={classes.wrapper}>
        <Box display="flex" className={classes.sport}>
          <Typography className={classes.sportTitle}>{activeSport.name}</Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => handleSportSelection(activeSport.name)}
            className={classes.sportLink}
          >
            {`Go to ${activeSport.name} Bets`}
          </Button>
        </Box>
        {sortType === 'Start Time' ? (
          <V2MatchesDisplay matches={matches} />
        ) : (
          <V1MatchesDisplay classes={classes} matches={matches} />
        )}
      </Box>
    </InfiniteScroll>
  );
};

export default LeagueMatchView;
