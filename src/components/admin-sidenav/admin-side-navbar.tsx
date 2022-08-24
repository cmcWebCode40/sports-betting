import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link, NavLink, useHistory } from 'react-router-dom';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import {
  PeopleAltRounded,
  BusinessCenterRounded,
  DashboardRounded as DashboardIcon,
  AccountTreeRounded,
} from '@material-ui/icons';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import classnames from 'classnames';

import SubtitlesIcon from '@material-ui/icons/Subtitles';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LanguageIcon from '@material-ui/icons/Language';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PollIcon from '@material-ui/icons/Poll';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../provider/features/auth/auth';

const isActiveLink = (link?: string): boolean => {
  return window.location.pathname.includes(link as string);
};

const RoleBasedNavBar = [
  {
    title: 'Content Management',
    href: '#',
    icon: DashboardIcon,
    child: [
      {
        title: 'Pages',
        href: '/admin/content-management',
        icon: MenuBookIcon,
      },
      {
        title: 'Banners',
        href: '/admin/banners',
        icon: PhotoLibraryIcon,
      },
      {
        title: 'Headlines',
        href: '/admin/headlines',
        icon: DynamicFeedIcon,
      },
      {
        title: 'Slugs',
        href: '/admin/settings/site-map',
        icon: SubtitlesIcon,
      },
      {
        title: 'Site Settings',
        href: '/admin/site-settings',
        icon: AccountTreeRounded,
      },
      {
        title: 'Manage Languages',
        href: '/admin/manage-language',
        icon: LanguageIcon,
      },
    ],
  },
  {
    title: 'Users',
    href: '/admin/user-settings',
    icon: GroupAddIcon,
  },
  {
    title: 'Web Management',
    href: '#',
    icon: LanguageIcon,
    child: [
      {
        title: 'Club Logos',
        href: '#',
        icon: BusinessCenterRounded,
      },
      {
        title: 'Bookmakers',
        href: '/admin/bookmakers',
        icon: SportsSoccerIcon,
      },
      {
        title: 'Affiliates',
        href: '#',
        icon: PollIcon,
      },
      {
        title: 'Tips',
        href: '#',
        icon: AssignmentTurnedInIcon,
      },
    ],
  },
];

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  isOpen?: boolean;
  isActive?: boolean;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
      margin: '1.5rem 0',
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
      width: '1.2em',
      height: '1.2em',
    },
    labelText: {
      fontWeight: 'bold',
      flexGrow: 1,
      visibility: ({ isOpen }: { isOpen?: boolean }) => (isOpen ? 'visible' : 'hidden'),
      fontSize: '0.85rem',
    },
    isActive: {
      padding: '0.25rem',
      background: theme.palette.primary.main,
      color: 'white',
      borderRadius: '.5rem',
      '& p': { color: 'white' },
    },
  }),
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    isOpen,
    isActive,
    ...other
  } = props;
  const classes = useTreeItemStyles({ isOpen });

  return (
    <TreeItem
      label={
        <div
          className={classnames(classes.labelRoot, {
            [classes.isActive]: isActive,
          })}
        >
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
    active: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
    link: {
      textDecoration: 'none',
    },
    navlink: {
      fontSize: '1.3rem',
    },
  }),
);

type AdminNavBarProps = {
  isOpen?: boolean;
};
const AdminNavBar: FC<AdminNavBarProps> = ({ isOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  const onLogout = () => {
    dispatch(handleLogout());
    history.push('/');
  };

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {RoleBasedNavBar.map((page) => (
          <NavLink
            activeClassName={classes.active}
            className={classes.navlink}
            key={page.title}
            to={page.href}
          >
            <StyledTreeItem
              bgColor="#fff"
              color="inherit"
              nodeId={page.title}
              labelText={page.title}
              labelIcon={page.icon}
              isOpen={isOpen}
              isActive={isActiveLink(page.href !== '#' ? page.href : undefined)}
            >
              {page.child &&
                page.child.map((list) => (
                  <Link className={classes.link} color="inherit" key={list.title} to={list.href}>
                    <StyledTreeItem
                      color="inherit"
                      nodeId={list.title}
                      labelText={list.title}
                      labelIcon={list.icon}
                      bgColor="#fff"
                      labelInfo=""
                      isOpen={isOpen}
                      isActive={isActiveLink(!list.href.includes('#') ? list.href : undefined)}
                    />
                  </Link>
                ))}
            </StyledTreeItem>
          </NavLink>
        ))}
        <StyledTreeItem
          bgColor="#fff"
          labelInfo=""
          nodeId="logout"
          labelText="logout"
          onClick={onLogout}
          labelIcon={PeopleAltRounded}
          color="inherit"
          isOpen={isOpen}
        />
      </TreeView>
    </>
  );
};

export default AdminNavBar;
