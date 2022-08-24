import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Box, SvgIcon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as ArrowDropUpIcon } from '../../../assets/icons/arrow.svg';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/dropdown_arrow.svg';
import { ITheme } from '../../../themes/theme';
import genRandomId from '../../../helpers/gen-random-Id';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    box: {
      minHeight: 250,
      background: theme.palette.oceanGreen.main,
      color: theme.palette.white,
      margin: theme.spacing(-1),
      padding: theme.spacing(1.2, 3),
    },
    listItem: {
      textTransform: 'capitalize',
      color: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      background: theme.palette.oceanGreen.main,
    },
    listChild: {
      textTransform: 'capitalize',
      color: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
    },
    toggleBtn: {
      height: '36px',
      margin: '20px 5px',
      background: 'transparent',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: theme.palette.oceanGreen.main,
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.oceanGreen.main}`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        // fontSize: theme.typography.subtitle2.fontSize,
      },
    },
    openedButton: {
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.white}`,
      background: theme.palette.white,
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 600,
      color: theme.palette.oceanGreen.main,
    },
    icon: {
      margin: theme.spacing(0.4, 0, -0.4, 0),
    },
    iconDown: {
      margin: theme.spacing(0.4, 0, -0.9, 0),
    },
  }),
);

const FilterPanelSelect = ({ title }: { title: string }): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.toggleBtn}
        aria-controls="simple-menu"
        variant="outlined"
        endIcon={<SvgIcon className={classes.iconDown} component={DropDownIcon} />}
        aria-haspopup="true"
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.box}>
          <Button
            variant="contained"
            onClick={handleClose}
            size="small"
            fullWidth
            className={classes.openedButton}
            endIcon={<SvgIcon className={classes.icon} component={ArrowDropUpIcon} />}
          >
            {title}
          </Button>
          <List component="nav" disablePadding aria-labelledby="nested-list-subheader">
            {[].map((item) => (
              <ListItem button key={genRandomId()}>
                <li className={classes.listChild}>{item}</li>
              </ListItem>
            ))}
          </List>
        </Box>
      </Menu>
    </div>
  );
};

export default FilterPanelSelect;
