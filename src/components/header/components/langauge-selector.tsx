import React, { useEffect, useCallback } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TLangauage } from '../../../models/bookmarkers.model';
import { useAppSelector } from '../../../provider/hooks/hooks';
import { ITheme } from '../../../themes/theme';
import { setActiveLanguages } from '../../../provider/features/bookmarkers';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      margin: 'auto 0 -0.3rem 0 ',
    },
    selectButton: {
      height: '30px',
      width: 90,
      padding: '2px 11px 2px 2px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 400,
      borderRadius: '16px',
      border: `solid 1px ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
      background: 'transparent',
      '&:hover': {
        background: 'transparent',
      },
    },
    icon: {},
    imageIcon: {
      margin: '0 .3rem 0 0.1rem',
      borderRadius: '50%',
      height: '1.5rem',
      width: '1.5rem',
    },
  }),
);

export default function CustomizedMenus(): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<null | TLangauage>(null);
  const { languages, selectedLanguage } = useAppSelector((state) => state.bookmarkers);
  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const handleLanguageChange = useCallback(
    (value: string) => {
      i18n.changeLanguage(value?.toLowerCase());
    },
    [i18n],
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectItem = (item: TLangauage) => {
    setSelected(item);
    handleLanguageChange(item.code);
    dispatch(setActiveLanguages(item));
    handleClose();
    const url = `${window.origin}/${item.code}${location.pathname}`;
    window.location.assign(url);
  };

  useEffect(() => {
    if (selectedLanguage?.code) {
      setSelected(selectedLanguage);
      handleLanguageChange(selectedLanguage.code);
    }
  }, [selectedLanguage, handleLanguageChange]);

  return (
    <div className={classes.root}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        className={classes.selectButton}
        onClick={handleClick}
        endIcon={
          anchorEl ? (
            <ArrowDropUpIcon fontSize="large" className={classes.icon} />
          ) : (
            <ArrowDropDown fontSize="large" className={classes.icon} />
          )
        }
      >
        <img className={classes.imageIcon} src={selected?.icon} alt={selected?.name} />
        {selected?.code}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((item: TLangauage) => (
          <StyledMenuItem onClick={() => handleSelectItem(item)} key={item.code}>
            <img
              className={classes.imageIcon}
              style={{ margin: '0 0.4rem' }}
              src={item.icon}
              alt={item.name}
            />
            <ListItemText primary={item.name} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
