import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'inline-block',
      borderRadius: '50%',
      flexGrow: 0,
      flexShrink: 0,
      margin: theme.spacing(0, 0.6),
    },
    sm: {
      height: theme.spacing(1),
      width: theme.spacing(1),
    },
    md: {
      height: theme.spacing(2),
      width: theme.spacing(2),
    },
    lg: {
      height: theme.spacing(3),
      width: theme.spacing(3),
    },
    neutral: {
      backgroundColor: theme.palette.background.default,
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
    },
    info: {
      backgroundColor: theme.palette.info.main,
    },
    warning: {
      backgroundColor: theme.palette.warning.main,
    },
    danger: {
      backgroundColor: theme.palette.error.main,
    },
    success: {
      backgroundColor: theme.palette.success.main,
    },
  }),
);

interface IStatusBullet {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color: 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
}

export const StatusBullet = (props: IStatusBullet): JSX.Element => {
  const { className, size = 'md', color = 'neutral', ...rest } = props;

  const classes = useStyles();

  return (
    <span
      {...rest}
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color,
        },
        className,
      )}
    />
  );
};

export default StatusBullet;
