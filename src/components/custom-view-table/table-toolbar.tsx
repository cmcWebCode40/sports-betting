import React from 'react';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import GlobalFilter from './global-filter';
import { useToolBarStyles } from './styles/table.styles';

interface ITableToolbar {
  numSelected: any;
  deleteUserHandler?: any;
  preGlobalFilteredRows: any;
  setGlobalFilter: any;
  globalFilter: any;
  tableTitle?: string | number;
  withSearchBar?: boolean;
}

const TableToolbar = ({
  numSelected,
  deleteUserHandler,
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  tableTitle,
  withSearchBar,
}: ITableToolbar): JSX.Element => {
  const classes = useToolBarStyles();
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteUserHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          withSearchBar={withSearchBar}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};
export default TableToolbar;
