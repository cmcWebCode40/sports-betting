import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { createStyles, makeStyles } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ITheme } from '../../../themes/theme';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: '15px auto',
      alignItems: 'center',
    },
    title: {
      margin: '0px 10px 0px 10px',
      fontSize: theme.typography.h3.fontSize,
      fontWeight: 600,
      color: theme.palette.grayishBrown.main,
    },
  }),
);

const PageTitleBar = ({ title }: { title: string }): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.root}>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/betting-tools-dashboard/" />
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default PageTitleBar;
