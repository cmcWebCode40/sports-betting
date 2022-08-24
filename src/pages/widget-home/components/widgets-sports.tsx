import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as SportsSoccerIcon } from '../../../assets/icons/icon_active_Football.svg';
import { ReactComponent as SportsBasketballIcon } from '../../../assets/icons/icon_active_Basketball.svg';
import { ReactComponent as SportsBaseballIcon } from '../../../assets/icons/icon_Tennis.svg';
import { ReactComponent as MotorcycleIcon } from '../../../assets/icons/icon_active_Esport.svg';
import { useWidSportStyles } from '../styles/widgets-styles';

const WidgetsSports = (): JSX.Element => {
  const classes = useWidSportStyles();
  const sportsLinks = [
    {
      title: 'Football',
      icon: <SvgIcon className={classes.icon} color="primary" component={SportsSoccerIcon} />,
      path: '?sport=soccer',
      value: 'soccer',
    },
    {
      title: 'Basketball',
      icon: <SvgIcon className={classes.icon} color="primary" component={SportsBasketballIcon} />,
      path: '?sport=basketball',
      value: 'basketball',
    },
    {
      title: 'Tennis',
      icon: <SvgIcon className={classes.icon} color="primary" component={SportsBaseballIcon} />,
      path: '?sport=tennis',
      value: 'tennis',
    },
    {
      title: 'E-Sport',
      icon: <SvgIcon className={classes.iconFix} color="primary" component={MotorcycleIcon} />,
      path: '?sport=esports',
      value: 'esports',
    },
  ];

  return (
    <div className={classes.root}>
      {' '}
      <Typography className={classes.title} variant="h4" align="center">
        BETTING WIDGETS LOREM IPSUM
      </Typography>
      <Grid container spacing={2} className={classes.sportIcon}>
        {sportsLinks.map((sport) => (
          <Grid item md={3} key={sport.title} sm={6}>
            <Typography className={classes.sportTitle} variant="h4" align="center">
              {sport.icon} {sport.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WidgetsSports;
