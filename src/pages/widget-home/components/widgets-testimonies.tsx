import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useWidTestimoniesStyles } from '../styles/widgets-styles';

const WidgetsTestimonies = (): JSX.Element => {
  const classes = useWidTestimoniesStyles();

  return (
    <div className={classes.root}>
      {' '}
      <Typography className={classes.title} variant="h4" align="center">
        Testimonies
      </Typography>
      <Grid container alignItems="center" spacing={4} className={classes.gridContent}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item sm={12} md={3} key={item}>
            <div className={classes.textContent}>
              <span className={classes.quoteTop}>&ldquo;</span>
              <span className={classes.quoteBottom}>&ldquo;</span>
              <Typography className={classes.words} variant="body1" align="center">
                Lorem ipsum dolor sit amet consectetur adipising.elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat
              </Typography>
              <Divider className={classes.divider} />
              <Typography variant="h5" align="center" color="secondary">
                Michael Chinwieke
              </Typography>
              <Typography variant="h6" align="center" color="secondary">
                Frontend Developer
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WidgetsTestimonies;
