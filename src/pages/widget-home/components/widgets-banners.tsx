import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useWidBanner } from '../styles/widgets-styles';
import imgDemo from '../../../assets/demo/betting_view1.png';

const WidgetsBanners = (): JSX.Element => {
  const classes = useWidBanner();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title} align="center">
        BETTING WIDGETS LOREM IPSUM
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyItems: 'center !important',
          alignItems: 'center !important',
          flexFlow: 'row wrap',
        }}
      >
        <Grid container className={classes.box}>
          <Grid item md={6} sm={12}>
            <ul>
              {[1, 2, 3, 4, 5, 6].map((list: number) => (
                <li className={classes.listItem} key={list}>
                  Lorem Ipsium
                </li>
              ))}
            </ul>
          </Grid>
          <Grid md={6} item className={classes.boxImg}>
            <img src={imgDemo} height="250" alt="name" />
          </Grid>
        </Grid>
      </div>

      <Button className={classes.button} variant="contained" color="secondary">
        Register to try widget
      </Button>
    </div>
  );
};

export default WidgetsBanners;
