import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useAboutStyles } from '../styles/bookmakers-details.styles';
import { StatusBullet } from '../../../components';
import { TPlayableSports } from '../../../models/bookmarkers.model';
import genRandomId from '../../../helpers/gen-random-Id';

interface IPlayableSports {
  playableSports: TPlayableSports[];
}
const PlayableSports = ({ playableSports }: IPlayableSports): JSX.Element => {
  const classes = useAboutStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.titleWrapper} variant="h3">
        Sports that can be played
      </Typography>
      <Grid container spacing={0}>
        <Grid item md={6}>
          {playableSports.map((item) => (
            <Typography className={classes.content} key={genRandomId()} variant="body1">
              <StatusBullet color="primary" size="sm" /> {item.name}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayableSports;
