import React from 'react';
import { Button, SvgIcon, useMediaQuery, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useNavBarStyle } from './styles/nav-bar.styles';
import { smMobileView } from '../../themes/theme.constants';

import { ReactComponent as SportsSoccerIconActive } from '../../assets/icons/icon_active_Football.svg';
import { ReactComponent as SportsBasketballIconActive } from '../../assets/icons/icon_active_Basketball.svg';
import { ReactComponent as SportsBaseballIconActive } from '../../assets/icons/icon_Tennis.svg';
import { ReactComponent as MotorcycleIconActive } from '../../assets/icons/icon_active_Esport.svg';

import { useAppDispatch, useAppSelector } from '../../provider/hooks/hooks';
import { IAllSport } from '../../models/leagues.model';
import { setActiveSport } from '../../provider/features/bookmarkers';

export interface NavBarProps {
  title?: string;
}

export const NavBarLowLayer: React.FC<NavBarProps> = ({ title }) => {
  const classes = useNavBarStyle();
  const { t } = useTranslation();
  const matches = useMediaQuery(`(max-width:${smMobileView})`);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { sports, activeSport } = useAppSelector((state) => state.bookmarkers);

  const sportActiveIcon: any = {
    Football: {
      activeIcon: (
        <SvgIcon className={classes.icon} color="primary" component={SportsSoccerIconActive} />
      ),
    },
    BasketBall: {
      activeIcon: (
        <SvgIcon className={classes.icon} color="primary" component={SportsBasketballIconActive} />
      ),
    },
    Tennis: {
      activeIcon: (
        <SvgIcon className={classes.icon} color="primary" component={SportsBaseballIconActive} />
      ),
    },
    ESport: {
      activeIcon: (
        <SvgIcon className={classes.icon} color="primary" component={MotorcycleIconActive} />
      ),
    },
  };

  const handleSportSelection = (item: any) => {
    dispatch(setActiveSport(item));
    if (title === '') {
      history.push(`/sport/${item.name}`);
    } else {
      history.push(`/${title}/sport/${item.name}`);
    }
  };

  const renderIcon = (list: IAllSport) => {
    if (activeSport.id === String(list.id)) {
      return sportActiveIcon[list.name]?.activeIcon;
    }
    return <img src={list.icon} alt={list.id as unknown as string} />;
  };

  return (
    <section className={classes.root}>
      <Container fixed>
        <div className={classes.nav}>
          {sports.map((list, index: any) => (
            <Button
              className={classes.button}
              key={list.name}
              color={activeSport?.id === list.id ? 'primary' : 'default'}
              onClick={() => handleSportSelection(list)}
              startIcon={renderIcon(list)}
            >
              {!matches ? t(`header.navLowerLinks.${index}.title`) : ''}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NavBarLowLayer;
