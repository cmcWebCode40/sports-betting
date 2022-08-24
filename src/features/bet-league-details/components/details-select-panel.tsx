import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(1.3, 0),
    },
    button: {
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    activeButton: {
      // margin: '21px 29px 24px 24px',
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
        margin: theme.spacing(0, 1),
      },
    },
    sortButton: {
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sortButtonMobile: {
      display: 'none',
      margin: '0.3rem 0 -1.8rem 0',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
  }),
);

const betSortList = [
  {
    title: 'Popularity',
  },
  {
    title: 'Start Time',
  },
  {
    title: 'Country',
  },
];
const DetailsSelectPanel = (): JSX.Element => {
  const classes = useStyles();
  const [activeState, setActiveState] = useState(0);

  const onSelectType = (index: number): void => setActiveState(index);

  return (
    <div className={classes.root}>
      <Box className={classes.boxParent} display="flex" justifyContent="space-between">
        {betSortList.map((list, index) => (
          <Button
            onClick={() => onSelectType(index)}
            className={activeState === index ? classes.activeButton : classes.button}
            key={list.title}
          >
            {list.title}
          </Button>
        ))}
      </Box>
      <Button className={classes.sortButton}>Ranking Criteria:</Button>
    </div>
  );
};

export default DetailsSelectPanel;
