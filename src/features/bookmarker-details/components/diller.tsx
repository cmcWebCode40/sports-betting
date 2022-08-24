import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useAboutStyles } from '../styles/bookmakers-details.styles';
import { StatusBullet } from '../../../components';
import { TDiller } from '../../../models/bookmarkers.model';

interface IDiller {
  diller: TDiller[];
}
const Diller = ({ diller }: IDiller): JSX.Element => {
  const classes = useAboutStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.titleWrapper} variant="h3">
        Sports that can be played
      </Typography>
      <Grid container spacing={0}>
        <Grid item md={6}>
          {diller.map((item: TDiller) => (
            <Typography className={classes.content} key={item.id} variant="body1">
              <StatusBullet color="primary" size="sm" /> {item.name}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Diller;
