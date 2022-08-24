import React, { SetStateAction } from 'react';
import Box from '@material-ui/core/Box';
import { createStyles, IconButton, makeStyles, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ITheme } from '../../themes/theme';
import BetViewTable from './betsview-table';
import { TMatches } from '../../models/leagues.model';
import { ReactComponent as CloseMenuIcon } from '../../assets/icons/icon_remove.svg';
import { useAppSelector } from '../../provider/hooks/hooks';
import { ClubLogo } from '..';
import TimeZoneUtils from '../../utils/common.helpers';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.veryLightPink.main,
      width: '100%',
      height: '100%',
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      backgroundImage: theme.palette.primary.light,
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      height: '100px',
      margin: '0 0 11px',
      padding: '0.7px 0.7px 25px 10px',
    },
    sportTitle: {
      margin: '2px auto',
      fontSize: '15px',
      textAlign: 'center',
      color: theme.palette.white,
    },
    dashed: {
      fontWeight: 600,
    },
    score: {
      fontWeight: 600,
      color: theme.palette.white,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexFlow: 'column nowrap',
      '& > *': {
        color: theme.palette.white,
      },
    },
    time: {
      margin: '0px 22px 0px 39px',
    },
    closeWrapper: {
      display: 'flex',
    },
    flexGrow: {
      flexGrow: 1,
    },
    closeIcon: {
      width: '20px',
      height: '20px',
      margin: '5px 0',
    },
    teamTitle: {
      padding: '0px 7px',
      justifyContent: 'space-evenly',
      alignContent: 'center',
    },
    link: {
      textDecoration: 'none',
    },
  }),
);

const clubStyles = {
  width: '50px',
  height: '50px',
};
interface IV2BetDetails {
  matchTitle: TMatches;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

const V2BetDetails = ({ matchTitle, setModal }: IV2BetDetails): JSX.Element => {
  const classes = useStyles();
  const { activeLeagueUrl } = useAppSelector((state) => state.sportsLeagues);
  const {
    timezone: { active },
  } = useAppSelector((state) => state.bookmarkers);

  return (
    <Box boxShadow={3} borderRadius={6} className={classes.root}>
      <div className={classes.header}>
        <div className={classes.closeWrapper}>
          <div className={classes.flexGrow} />
          <IconButton size="small" onClick={() => setModal(false)}>
            <SvgIcon component={CloseMenuIcon} className={classes.closeIcon} />
          </IconButton>
        </div>
        <Link
          target="_blanck"
          href={`/bet/soccer/premier?current_league=${activeLeagueUrl}&code=${matchTitle.code}`}
          className={classes.link}
        >
          <Box display="flex" className={classes.teamTitle}>
            <ClubLogo styles={clubStyles} src={matchTitle.homeLogo} />
            <Typography className={classes.sportTitle}>{matchTitle.home}</Typography>
            <Box className={classes.score}>
              <Typography>
                <span>-</span> - <span>-</span>
              </Typography>
              <Typography>
                {TimeZoneUtils.convertTz({ tz: active, time: matchTitle.hour })}
              </Typography>
              <br />
            </Box>
            <Typography className={classes.sportTitle}>{matchTitle.away}</Typography>
            <ClubLogo styles={clubStyles} src={matchTitle.awayLogo} />
          </Box>
        </Link>
      </div>
      <div>
        <Box maxWidth={100}>{/* <DynamicSelectButton urlCode={matchTitle.code} /> */}</Box>

        <BetViewTable />
      </div>
    </Box>
  );
};

export default V2BetDetails;
