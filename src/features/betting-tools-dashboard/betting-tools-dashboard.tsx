import React from 'react';
import Grid from '@material-ui/core/Grid';
import BettingTools from '../../components/betting-tools/betting-tools';

const BettingToolDashboard = (): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <BettingTools title="POPULAR MATCHES" view="oddview-1" />
      </Grid>
      <Grid item md={6}>
        <BettingTools title="LOW BET POSSIBILITIES" view="oddview-4" />
      </Grid>
      <Grid item md={6}>
        <BettingTools title="BLOCKED BETTING POSSIBILITIES" view="oddview-2" />
      </Grid>
      <Grid item md={6}>
        <BettingTools title="VALUE BETTINGS" view="oddview-3" />
      </Grid>
      <Grid item md={6}>
        <BettingTools title="POSTPONED-CANCELED MATCHES" view="oddview-5" />
      </Grid>
    </Grid>
  );
};

export default BettingToolDashboard;
