import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Box, Divider, SvgIcon } from '@material-ui/core';
import { useAllLeagueStyles } from './styles/all-leagues.styles';
import genRandomId from '../../helpers/gen-random-Id';
import { ReactComponent as ArrowDropUpIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as DropDownIcon } from '../../assets/icons/dropdown_arrow.svg';
import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { getBySports } from '../../provider/features/leagues/leagues';
import LeaguesCountry from './leagues-countries';

interface ILeague {
  dateValue?: string;
  fullWidth?: boolean;
}

export const AllLeagues = ({ dateValue, fullWidth }: ILeague): JSX.Element => {
  const classes = useAllLeagueStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { popularLeagues } = useAppSelector((state) => state.sportsLeagues);
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getBySports(activeSport.id));
  }, [dispatch, activeSport]);

  return (
    <div className={classes.root}>
      <Button
        className={classes.toggleBtn}
        aria-controls="simple-menu"
        variant="outlined"
        aria-haspopup="true"
        fullWidth={fullWidth}
        onClick={handleClickOpen}
      >
        <span className={classes.buttonText}>All Leagues</span>
        <SvgIcon className={classes.iconDown} component={DropDownIcon} />
      </Button>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menuBar}
      >
        {[1].map((list) => (
          <Box className={classes.box} key={list}>
            <Button
              variant="contained"
              onClick={handleClose}
              size="small"
              className={classes.openedButton}
            >
              <span className={classes.buttonText}>All Leagues</span>
              <SvgIcon className={classes.iconDown} component={ArrowDropUpIcon} />
            </Button>
            <List
              component="nav"
              disablePadding
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  className={classes.listItem}
                  component="div"
                  id="nested-list-subheader"
                >
                  Popular Leagues
                  <Divider className={classes.divider} />
                </ListSubheader>
              }
            >
              {popularLeagues.map((item) => (
                <ListItem button key={genRandomId()}>
                  <li className={classes.listChild}>{item.name}</li>
                </ListItem>
              ))}
            </List>
            <LeaguesCountry dateValue={dateValue} />
          </Box>
        ))}
      </Menu>
    </div>
  );
};

export default AllLeagues;
