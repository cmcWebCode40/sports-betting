import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useWidBettingStyles } from '../styles/widgets-styles';
import imgDemo from '../../../assets/demo/betting_view1.png';

const WidgetsBetting = (): JSX.Element => {
  const classes = useWidBettingStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4" align="center">
        BETTING WIDGETS
      </Typography>
      <Typography className={classes.textContent} variant="body1" align="center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora nihil, maxime saepe earum
        quod porro ipsa odio aperiam? Nisi, nihil soluta rerum ipsa laudantium reiciendis magni,
        temporibus iusto accusantium maiores dicta sequi perspiciatis in a sed error beatae eos nam
        libero minima? Repellat ipsum iste necessitatibus molestias! Iusto, perferendis animi?
      </Typography>
      <div className={classes.imgContent}>
        <img src={imgDemo} height="200" alt="name" />
      </div>
    </div>
  );
};

export default WidgetsBetting;
