import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTitleStyles } from '../styles/bookmakers-details.styles';
import RatingModal from './rating-modal';
import { TAppBookMaker } from '../../../models/bookmarkers.model';

const TitleHeader = ({ data }: { data: TAppBookMaker }): JSX.Element => {
  const classes = useTitleStyles();
  return (
    <div>
      <Box display="flex" className={classes.grid}>
        <div>
          <Box display="flex" className={classes.firstLayerFlex}>
            <div className={classes.bookmarkerLogo}>
              <img src={data?.logo} alt={data?.name} />
            </div>
            <div className={classes.ratingWrapper}>
              <Rating name="read-only" className={classes.rating} value={2.5} readOnly />
              <Typography className={classes.ratingValue}>3.5</Typography>
              <RatingModal name={data.name} />
            </div>
          </Box>
        </div>
        <div>
          <Box display="flex">
            <div>
              <Button
                variant="contained"
                className={classes.websiteLink}
                size="small"
                href={data?.registrationLink}
                color="primary"
              >
                GO TO WEBSITE
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.websiteLink}
                size="small"
                href={data?.registrationLink}
                color="secondary"
              >
                GO TO WEBSITE
              </Button>
              <br />
              <Typography className={classes.buttonCaptionText} variant="overline" color="primary">
                WIN BONUS!
              </Typography>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default TitleHeader;
