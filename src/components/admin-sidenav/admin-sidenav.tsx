import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamepadOutlinedIcon from '@material-ui/icons/GamepadOutlined';
import SportsIcon from '@material-ui/icons/Sports';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';

const betNav = [
  {
    title: 'Bookmarkers',
    icon: <GamepadOutlinedIcon />,
    path: '/admin/bookmakers',
  },
  {
    title: 'Live Bet',
    icon: <SportsIcon />,
    path: '/admin/dashboard',
  },
];
const websiteMgt = [
  {
    title: 'Users',
    icon: <PersonOutlineIcon />,
    path: '/admin/dashboard',
  },
  {
    title: 'Content Management',
    icon: <ListOutlinedIcon />,
    path: '/admin/content-management',
  },
  {
    title: 'Setting',
    icon: <SettingsIcon />,
    path: '/admin/settings/site-map',
  },
];

export const AdminSideNav = (): JSX.Element => {
  const history = useHistory();
  const onRoute = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <List>
        {betNav.map((text) => (
          <ListItem button key={text.title} onClick={() => onRoute(text.path)}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {websiteMgt.map((text) => (
          <ListItem button key={text.title} onClick={() => onRoute(text.path)}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AdminSideNav;
