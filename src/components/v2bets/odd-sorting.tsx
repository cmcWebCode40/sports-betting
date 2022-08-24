import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(2, 0),
    },
    button: {
      fontWeight: 600,
      textTransform: 'capitalize',
      width: '151px',
      height: '40px',
      margin: '11px 5px 23px 10px',
      padding: '10px 10px 8px 10px',
      borderRadius: '4px',
      color: theme.palette.grayishBrown.main,
      backgroundColor: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.white,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h6.fontSize,
        width: 'auto',
      },
    },
    activeButton: {
      width: '151px',
      height: '40px',
      margin: '11px 5px 23px 10px',
      padding: '10px 10px 8px 10px',
      borderRadius: '4px',
      textTransform: 'capitalize',
      backgroundColor: theme.palette.white,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      fontWeight: 600,
      color: theme.palette.oceanGreen.main,
      '&:hover': {
        backgroundColor: theme.palette.white,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.h6.fontSize,
        width: 'auto',
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

const data = [
  {
    title: 'The match result',
  },
  {
    title: 'First half',
  },
  {
    title: '2nd Half',
  },
];

const DynamicOddSorting = (): JSX.Element => {
  const classes = useStyles();
  const [activeState, setActiveState] = useState(0);

  const onSelectType = (index: number): void => setActiveState(index);

  return (
    <div className={classes.root}>
      <Box className={classes.boxParent} display="flex" justifyContent="space-between">
        {data.map((list, index) => (
          <Button
            color="secondary"
            onClick={() => onSelectType(index)}
            className={activeState === index ? classes.activeButton : classes.button}
            key={list.title}
          >
            {list.title}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default DynamicOddSorting;
