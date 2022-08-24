import { Box } from '@material-ui/core';
import React from 'react';
import WidgetsBanners from './components/widgets-banners';
import WidgetsBetting from './components/widgets-betting';
import WidgetsHeader from './components/widgets-header';
import WidgetsSports from './components/widgets-sports';
import WidgetsTestimonies from './components/widgets-testimonies';
import { useWidHome } from './styles/widgets-styles';

const WidgetsHome = (): JSX.Element => {
  const classes = useWidHome();

  return (
    <Box>
      <Box className={classes.bannerWrapper}>
        <WidgetsHeader />
        <WidgetsBanners />
      </Box>
      <WidgetsSports />
      <WidgetsBetting />
      <WidgetsTestimonies />
    </Box>
  );
};

export default WidgetsHome;
