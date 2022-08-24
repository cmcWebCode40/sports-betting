import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import { ReactComponent as SortIcon } from '../../../assets/icons/filter_icon.svg';
import { ITheme } from '../../../themes/theme';
import FilterPanelSelect from './filter-panel-select-button';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.3, 1),
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    button: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    activeButton: {
      padding: '6px 15px 8px 16px',
      textTransform: 'capitalize',
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,

      color: theme.palette.oceanGreen.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    boxParent: {
      margin: theme.spacing(0, 2),
      '& >*': {
        margin: theme.spacing(0, 0.6),
      },
    },
    sortButton: {
      textTransform: 'capitalize',
      color: theme.palette.grayishBrown.main,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        margin: '0rem 0 -3rem 0',
      },
    },
  }),
);

const SortingPanel = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button className={classes.sortButton} startIcon={<SvgIcon component={SortIcon} />}>
        Filter:
      </Button>
      <SvgIcon className={classes.sortButtonMobile} component={SortIcon} />
      <Box className={classes.boxParent} display="flex" justifyContent="space-between">
        <FilterPanelSelect title="Last 24 hours" />
        <FilterPanelSelect title="% 20 dropping" />
        <FilterPanelSelect title="All odd types" />
      </Box>
    </div>
  );
};

export default SortingPanel;
