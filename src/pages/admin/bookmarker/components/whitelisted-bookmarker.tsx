import React from 'react';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ITheme } from '../../../../themes/theme';
import AddWhiteListedBookmarker from '../../../../features/admin/bookmarker/components/add-whitelisted-bookmarker';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '96%',
      margin: theme.spacing(0.5, 'auto'),
    },
    Paper: {
      backgroundColor: theme.palette.background.paper,
    },
    addBtn: {
      margin: theme.spacing(1, 'auto'),
    },
    title: {
      margin: theme.spacing(1, 'auto'),
      textAlign: 'center',
    },
    link: {
      textDecoration: 'none',
    },
  }),
);

const WhiteListedBookmarkers = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link className={classes.link} to="/admin/dashboard">
          Dashboard
        </Link>
        <Link className={classes.link} to="/admin/bookmakers">
          Bookmakers
        </Link>
      </Breadcrumbs>
      <Typography
        className={classes.title}
        variant="h3"
        id="tableTitle"
        color="primary"
        component="div"
      >
        BookMaker View
      </Typography>
      <Divider />
      <AddWhiteListedBookmarker />
    </div>
  );
};

export default WhiteListedBookmarkers;
