import classnames from 'classnames';
import { makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ActionMenuComponentProps } from './action-menu.component.props';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    position: 'relative',
    fontSize: '0.875rem',
    // color: $grey-text;
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    transition: '0.2s background ease-in-out',
    background: 'transparent',

    '&:hover': {
      background: 'grey',
    },

    '& .action--menu': {
      position: 'absolute',
      top: '2rem',
      right: 0,
      minWidth: '6.25rem',
      backgroundColor: 'white',
      zIndex: '1',
      boxShadow:
        '0 6px 21px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      borderRadius: '0.3125rem',

      '& span': {
        cursor: 'pointer',
        display: 'block',
        padding: '0.625rem 0',
        color: 'grey',
        '&:hover': {
          background: 'hsl(0, 0%, 96%)',
        },
      },

      '&.is-hidden': {
        display: 'none',
      },
    },
  },
});

export const ActionMenuComponent: React.FC<ActionMenuComponentProps> = (props) => {
  const { menuComponent, menuIndex, openMenu, openMenuIndex } = props;
  const classes = useStyles();

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    event.preventDefault();
    if (openMenuIndex === index) {
      openMenu(undefined);
    } else {
      openMenu(index);
    }
  };

  return (
    <div
      className={classes.root}
      aria-hidden="true"
      onClick={(event) => handleOpenMenu(event, menuIndex)}
    >
      <MoreVertIcon data-testid="action" />
      <div className={classnames('action--menu', { 'is-hidden': openMenuIndex !== menuIndex })}>
        {openMenuIndex === menuIndex && menuComponent}
      </div>
    </div>
  );
};
