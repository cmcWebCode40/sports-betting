import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  closeIcon: {
    position: 'fixed',
    right: '0.6rem',
    bottom: '0',
    color: '#fff',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface AppDrawerProps {
  anchorProps: Anchor;
  buttonText: string;
  children: React.ReactNode;
  buttonProps?: unknown;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  anchorProps,
  buttonProps,
  buttonText,
  children,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {children}
    </div>
  );

  return (
    <div>
      <Button {...buttonProps} onClick={toggleDrawer(anchorProps, true)}>
        {buttonText}
      </Button>
      <SwipeableDrawer
        anchor={anchorProps}
        open={state[anchorProps]}
        onClose={toggleDrawer(anchorProps, false)}
        onOpen={toggleDrawer(anchorProps, true)}
      >
        {list(anchorProps)}
        <IconButton onClick={toggleDrawer(anchorProps, false)} className={classes.closeIcon}>
          <CloseIcon />
        </IconButton>
      </SwipeableDrawer>
    </div>
  );
};

export default AppDrawer;
