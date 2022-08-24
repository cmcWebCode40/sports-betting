/* eslint-disable react/display-name */
import { makeStyles, Avatar, createStyles } from '@material-ui/core';
import moment from 'moment';
import React, { useState, useMemo } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useHistory } from 'react-router-dom';
import { ITheme } from '../../../../themes/theme';
import { StatusBullet } from '../../../../components';
import DeleteBookmaker from '../components/delete-bookmaker';

type TOriginal = {
  title: string;
  logo: string;
  status: string;
  name: string;
  createdAt: string;
};

type TRow = {
  row: IRow;
};

interface IRow {
  original: TOriginal;
}

type TUseAllBookmarker = {
  whiteListedHeader: unknown;
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    menuItem: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

function ActionMenu({ row, refetch }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openW, setOpenW] = useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePermission = () => setOpenW(!openW);
  const onRoute = () => history.push(`/admin/bookmakers-list?id=${row?.original?.slug}`);

  return (
    <div>
      <DeleteBookmaker refetch={refetch} id={row?.original?.id} open={openW} setOpen={setOpenW} />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem className={classes.menuItem} onClick={() => onRoute()}>
          <EditIcon color="primary" />
          Edit
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handlePermission}>
          <DeleteIcon color="error" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

const useWhiteListedBookMarker = ({ refetch }: { refetch?: any }): TUseAllBookmarker => {
  const whiteListedHeader = useMemo(
    () => [
      {
        Header: 'Logo',
        Cell: ({ row }: TRow) => (
          <Avatar alt={row?.original?.name} src={row?.original?.logo} variant="square" />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        Cell: ({ row }) => (
          <>
            {row?.original?.status}
            <StatusBullet
              color={row?.original?.status === 'active' ? 'success' : 'danger'}
              size="sm"
            />
          </>
        ),
      },
      {
        Header: 'Reg. Date',
        Cell: ({ row }) => <>{moment(row?.original?.createdAt).format('LLL')}</>,
      },
      {
        Header: 'Actions',
        Cell: (props) => <ActionMenu {...props} refetch={refetch} />,
      },
    ],
    [refetch],
  );
  return {
    whiteListedHeader,
  };
};

export default useWhiteListedBookMarker;
