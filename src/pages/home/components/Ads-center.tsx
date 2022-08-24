import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useAdsStyles } from './style/home.styles';

const AdsCenter = (): JSX.Element => {
  const classes = useAdsStyles();
  return (
    <Box borderRadius={6} boxShadow={3} className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Ads
      </Typography>
    </Box>
  );
};

export default AdsCenter;
