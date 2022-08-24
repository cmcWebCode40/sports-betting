import React from 'react';
import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
// import SvgIcon from '@material-ui/core/SvgIcon';
// import Menu from '@material-ui/core/Menu';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import Close from '@material-ui/icons/Close';
import { useComparisonTabsStyles } from '../styles/bookmakers-details.styles';
import { TAppBookMaker } from '../../../models/bookmarkers.model';
import genRandomId from '../../../helpers/gen-random-Id';
// import { ReactComponent as ArrowDropUpIcon } from '../../../assets/icons/arrow.svg';
// import { ReactComponent as DropDownIcon } from '../../../assets/icons/dropdown_arrow.svg';

interface IComparisonTabs {
  bookmarkers: TAppBookMaker[] | any;
  selectedBk: TAppBookMaker[];
  setSelectedBk: any;
  onRemove: (arg0: string | number) => void;
  onAdd: (arg0: string | number) => void;
}

const ComparisonTabs = ({
  onRemove,
  bookmarkers,
  selectedBk,
  setSelectedBk,
  onAdd,
}: IComparisonTabs): JSX.Element => {
  const classes = useComparisonTabsStyles();
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedBk();
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      {selectedBk.map((list: any) => (
        <Button
          className={classes.selectedButton}
          key={genRandomId()}
          endIcon={<Close onClick={() => onRemove(list?.id as string | number)} />}
        >
          {list.name}
        </Button>
      ))}
      {bookmarkers.map((list: any) => (
        <Button
          onClick={() => onAdd(list?.id as string | number)}
          className={classes.button}
          key={genRandomId()}
        >
          {list.name}
        </Button>
      ))}
      {/* <Button
        className={classes.toggleBtn}
        aria-controls="simple-menu"
        variant="outlined"
        endIcon={<SvgIcon className={classes.iconDown} component={DropDownIcon} />}
        aria-haspopup="true"
        onClick={handleClickOpen}
      >
        All Leagues
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
            All Leagues
          </Button>
          <List component="nav" disablePadding aria-labelledby="nested-list-subheader">
            {bookmarkers.map((item: any) => (
              <ListItem button key={genRandomId()}>
                <li className={classes.listChild}>{item.name}</li>
              </ListItem>
            ))}
          </List>
        </Box>
      </Menu> */}
    </div>
  );
};

export default ComparisonTabs;
