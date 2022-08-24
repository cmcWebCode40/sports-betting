import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as SportsSoccerIconActive } from '../../../assets/icons/icon_active_Football.svg';
import { ReactComponent as SportsBasketballIconActive } from '../../../assets/icons/icon_active_Basketball.svg';
import { ReactComponent as SportsBaseballIconActive } from '../../../assets/icons/icon_Tennis.svg';
import { ReactComponent as MotorcycleIconActive } from '../../../assets/icons/icon_active_Esport.svg';
import { ELiveIcon } from '../../../models/leagues.model';

interface ILiveIcon {
  type: ELiveIcon;
}

const LiveSportIcon = ({ type }: ILiveIcon): JSX.Element => {
  switch (type) {
    case ELiveIcon.SOCCER:
      return <SvgIcon component={SportsSoccerIconActive} />;
    case ELiveIcon.BASKETBALL:
      return <SvgIcon component={SportsBasketballIconActive} />;
    case ELiveIcon.TENNIS:
      return <SvgIcon component={SportsBaseballIconActive} />;
    case ELiveIcon.ESPORTS:
      return <SvgIcon component={MotorcycleIconActive} />;
    default:
      return <SvgIcon component={SportsSoccerIconActive} />;
  }
};

export default LiveSportIcon;
