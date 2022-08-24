import React from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useAboutStyles } from '../styles/bookmakers-details.styles';
import { TAbout, TDiller } from '../../../models/bookmarkers.model';

interface IAbout {
  data: TAbout;
  diller: TDiller[];
}
const About = ({ data, diller }: IAbout): JSX.Element => {
  const classes = useAboutStyles();

  const dillerFormat = (values: TDiller[]) => {
    const items = values.map((list: TDiller) => list.name).join(',');
    return items;
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.titleWrapper} variant="h3">
        About
      </Typography>
      <Grid container spacing={0}>
        <Grid item md={6}>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Year of foundation
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {moment(data?.dateFounded).format('LLL')}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Country
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data.hq}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Diller
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {dillerFormat(diller)}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              License
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data.license}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Website
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data?.website}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Telephone
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data?.telephone}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              Email
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data?.email}
            </Typography>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography className={classes.subtitle} align="right" variant="subtitle1">
              live help
            </Typography>
            <Typography className={classes.content} align="left" variant="body1">
              {data?.helpDesk}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
