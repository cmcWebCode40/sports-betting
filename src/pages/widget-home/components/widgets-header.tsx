import React from 'react';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from 'react-router-dom';
import { useWidHeader } from '../styles/widgets-styles';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home_icon.svg';
import LanguageSelector from '../../../components/header/components/langauge-selector';
import LogoIcon from '../../../assets/icons/oddsbug_logotype-01.svg';

const WidgetsHeader = (): JSX.Element => {
  const classes = useWidHeader();

  return (
    <Box className={classes.root} display="flex">
      <SvgIcon
        fill="#fff"
        style={{
          fill: '#fff',
        }}
        component={HomeIcon}
      />
      <Link to="/" className={classes.link}>
        <img src={LogoIcon} className={classes.rootLogo} alt="company" />
      </Link>
      <div className={classes.language}>
        <LanguageSelector />
      </div>
    </Box>
  );
};

export default WidgetsHeader;
