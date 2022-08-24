import React from 'react';
import { createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../../themes/theme';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home_icon.svg';
import { useAppSelector } from '../../../provider/hooks/hooks';

interface INavLinks {
  title: string;
  path: string;
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    listChild: {
      margin: '30px 0px',
    },
    listItem: {
      top: 0,
      fontWeight: 500,
      cursor: 'pointer',
      listStyle: 'none',
      textAlign: 'center',
      position: 'relative',
      margin: '10px 10px 0 10px',
      textTransform: 'uppercase',
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.veryLightPink.main,
      '& a': {
        textDecoration: 'none',
        color: theme.palette.veryLightPink.main,
        fontSize: theme.typography.h6.fontSize,
      },
    },
  }),
);

export const navLinks = (selectedSport: string): INavLinks[] => {
  return [
    {
      title: 'home',
      path: `/sport/${selectedSport}`,
    },
    {
      title: 'Bet',
      path: `/bet/sport/${selectedSport}`,
    },
    {
      title: 'Live score',
      path: `/live-scores/sport/${selectedSport}`,
    },
    {
      title: 'Live Bets',
      path: `/live-bets/sport/${selectedSport}`,
    },
    {
      title: 'Tip',
      path: '/tip',
    },
    {
      title: 'Bookmakers',
      path: '/bookmakers',
    },
  ];
};

const activeStyle = {
  borderBottom: `3px solid #fff`,
  padding: '14px 0',
  fontWeight: 600,
};
const homeStyle = {
  borderBottom: `3px solid #fff`,
  padding: '4px 0px 4px 6px',
  fontWeight: 600,
};

const NavBarPanel: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { activeSport } = useAppSelector((state) => state.bookmarkers);

  return (
    <ul className={classes.root}>
      {navLinks(activeSport.name).map((list, index) => (
        <li className={classes.listItem} key={list.title}>
          <NavLink
            exact
            to={list.path}
            className={classes.listItem}
            activeStyle={index === 0 ? homeStyle : activeStyle}
            title={t(`header.navLink.${index}.title`)}
          >
            {index === 0 ? (
              <SvgIcon
                fill="#fff"
                style={{
                  fill: '#fff',
                }}
                component={HomeIcon}
              />
            ) : (
              <span className={classes.listChild}>{t(`header.navLink.${index}.title`)}</span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavBarPanel;
