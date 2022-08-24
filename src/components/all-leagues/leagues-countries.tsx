import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import { Divider } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useAllLeagueStyles } from './styles/all-leagues.styles';
import genRandomId from '../../helpers/gen-random-Id';
import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { ITLeagues } from '../../logic/all-leagues.logic';
import {
  addLeaguesByCountry,
  setMatches,
  setProcessingMatches,
} from '../../provider/features/leagues/leagues';
import { betsApiMiddleware, generateBetDetailsQueryUrl } from '../../logic/bets.logic';

type TData = {
  data: ITLeagues[];
};

interface ILeagueCountry {
  dateValue?: string;
}

type LeagueParams = {
  name: string;
  country: string;
  eid: string;
  url: string;
};

const LeaguesCountry = ({ dateValue }: ILeagueCountry): JSX.Element => {
  const classes = useAllLeagueStyles();
  const { allCountry, leaguesByCountry } = useAppSelector((state) => state.sportsLeagues);
  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const [open, setOpen] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leagueQueries, setLeagueQueries] = useState({
    name: '',
    country: '',
    eid: '',
    url: '',
  });

  const dispatch = useAppDispatch();

  const handleClick = (country: string, idx?: number) => {
    if (open === idx) {
      setOpen(null);
    } else {
      setOpen(idx as number);
      setIsLoading(true);
      betsApiMiddleware<TData>({
        method: 'get',
        url: `/sports/${activeSport.id}/country/${country}`,
      }).then((res) => {
        dispatch(addLeaguesByCountry(res?.data));
        setIsLoading(false);
      });
    }
  };

  const fetchMatchesByLeague = (item: LeagueParams) => {
    const url = generateBetDetailsQueryUrl({
      country: item.country,
      name: item.name,
      date: dateValue,
      sport: activeSport?.id,
    });

    dispatch(setProcessingMatches());
    betsApiMiddleware<any>({ method: 'get', url: `${url}` })
      .then((res) => {
        dispatch(setMatches({ data: res?.data, url }));
      })
      .catch(() => {
        dispatch(setProcessingMatches());
      });
  };

  useEffect(() => {
    fetchMatchesByLeague(leagueQueries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue, activeSport]);

  return (
    <List
      component="nav"
      disablePadding
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.listItem} component="div" id="nested-list-subheader">
          Countries
          <Divider className={classes.divider} />
        </ListSubheader>
      }
    >
      {allCountry.map((item, idx) => (
        <List key={genRandomId()}>
          <ListItem button onClick={() => handleClick(item, idx)}>
            <li className={classes.subListItem}>{item}</li>
            {open === idx ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </ListItem>
          <Collapse in={open === idx} timeout="auto" unmountOnExit>
            {isLoading
              ? [1, 2, 3, 4].map((shell) => <Skeleton key={shell} animation="wave" />)
              : leaguesByCountry.map((league) => (
                  <List component="div" key={genRandomId()} disablePadding>
                    <ListItem
                      button
                      onClick={() => {
                        setLeagueQueries(league);
                        setTimeout(() => {
                          fetchMatchesByLeague(league);
                        }, 200);
                      }}
                      className={classes.nested}
                    >
                      <li className={classes.listChild}>{league.name}</li>
                    </ListItem>
                  </List>
                ))}
          </Collapse>
        </List>
      ))}
    </List>
  );
};

export default LeaguesCountry;
