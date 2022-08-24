import React from 'react';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ITheme } from '../../themes/theme';
import V2BetBookmakers from './v2bookmaker';
import { ReactComponent as ArrowDropUpIcon } from '../../assets/icons/arrow_up.svg';
import { ReactComponent as DropDownIcon } from '../../assets/icons/arrow_below.svg';
import { useAppSelector } from '../../provider/hooks/hooks';
import genRandomId from '../../helpers/gen-random-Id';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: '30px 10px 3px 0',
      justifyContent: 'space-between',
    },
    rootOdds: {
      display: 'flex',
    },
    root2: {
      display: 'flex',
      margin: '4px',
      padding: '3px',
      justifyContent: 'space-between',
    },
    bookmakerWrapper: {
      margin: '0 10px',
    },
    sportTitle: {
      padding: '0px 10px',
      fontSize: '20px',
      color: theme.palette.grayishBrown.main,
      [theme.breakpoints.down('md')]: {
        margin: '0',
        padding: '0 20px',
      },
    },
    odds: {
      width: '120px',
      margin: '0 8px 0 0',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.palette.black,
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: '0 8px',
      },
    },
    oddsType: {
      width: '120px',
      margin: '0 8px 0 0',
      fontSize: '16px',
      textAlign: 'center',
      color: theme.palette.grayishBrown.main,
    },
    oddsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    bLogo: {
      height: '37px',
      padding: '4px 29px',
    },
    oddsCompare: {
      margin: '0 10px',
    },
    arrowIcon: {
      margin: '0 0.5rem -0.7rem  0.3rem',
    },
    overlap: {
      margin: '0 0 0 8rem',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  }),
);

const BetViewTable = (): JSX.Element => {
  const classes = useStyles();
  // const [betsOdds] = useState<any>({});
  const { betsOdds } = useAppSelector((state) => state.sportsLeagues);

  const arrowUpIcon = <SvgIcon className={classes.arrowIcon} component={ArrowDropUpIcon} />;
  const arrowDownIcon = <SvgIcon className={classes.arrowIcon} component={DropDownIcon} />;

  const getMaxOdds = (odds: any) => {
    const odd = Object.values(odds as number[]).reduce((a, b) => {
      return Math.max(a, b);
    });
    return odd;
  };

  if (betsOdds.length && betsOdds.bookieOdds.length) {
    return (
      <div>
        <Box>
          <span
            style={{
              flexGrow: 1,
            }}
            className={classes.sportTitle}
          />
          <Box display="flex" className={classes.bookmakerWrapper}>
            <Box className={classes.overlap}>
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
              <Typography className={classes.sportTitle} />
            </Box>
            <span className={classes.oddsType}>{betsOdds?.oddsName[0]}</span>
            <span className={classes.oddsType}>{betsOdds?.oddsName[1]}</span>
            <span className={classes.oddsType}>{betsOdds?.oddsName[2]}</span>
          </Box>
        </Box>
        <Box className={classes.root}>
          {betsOdds.bookieOdds.length ? (
            <>
              <Typography className={classes.sportTitle}>Best odds</Typography>
              <Box display="flex" className={classes.bookmakerWrapper}>
                {betsOdds.bookieOdds.map((odds: any) => (
                  <V2BetBookmakers key={genRandomId()} value={getMaxOdds(odds.odds)} />
                ))}
              </Box>
            </>
          ) : (
            ''
          )}
        </Box>
        {betsOdds.bookieOdds.length ? (
          betsOdds.bookieOdds.map((item: any) => (
            <Box className={classes.root2} key={genRandomId()}>
              <img className={classes.bLogo} src={item.bookieLogo} alt={item.name} />
              <Box display="flex" className={classes.oddsWrapper}>
                <Typography className={classes.odds}>
                  {item.mvt[0] === 'up' ? (
                    <span>
                      {item.odds[0]}
                      {arrowUpIcon}
                    </span>
                  ) : (
                    <span>
                      {item.odds[0]}
                      {arrowDownIcon}
                    </span>
                  )}
                </Typography>
                <Typography className={classes.odds}>
                  {item.mvt[1] === 'up' ? (
                    <span>
                      {item.odds[1]}
                      {arrowUpIcon}
                    </span>
                  ) : (
                    <span>
                      {item.odds[1]}
                      {arrowDownIcon}
                    </span>
                  )}
                </Typography>
                <Typography className={classes.odds}>
                  {item.mvt[2] === 'up' ? (
                    <span>
                      {item.odds[2]}
                      {arrowUpIcon}
                    </span>
                  ) : (
                    <span>
                      {item.odds[2]}
                      {arrowDownIcon}
                    </span>
                  )}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box />
        )}
      </div>
    );
  }

  return <div />;
};

export default BetViewTable;
