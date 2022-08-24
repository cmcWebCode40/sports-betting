/* eslint-disable react/display-name */
import { makeStyles, createStyles } from '@material-ui/core';
import moment from 'moment';
import React, { useState, useMemo } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ITheme } from '../../../../themes/theme';
import DeleteSiteMap from '../components/delete-sitemap';
import EditSiteMap from '../components/EditSiteMap';

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
  siteMapHeader: unknown;
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
  const [openE, setOpenE] = useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePermission = () => setOpenW(!openW);

  return (
    <div>
      <DeleteSiteMap refetch={refetch} id={row?.original?.id} open={openW} setOpen={setOpenW} />
      <EditSiteMap refetch={refetch} id={row?.original?.id} open={openE} setOpen={setOpenE} />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem className={classes.menuItem} onClick={() => setOpenE(!openE)}>
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

const useSiteMapHeader = ({ refetch }: { refetch?: any }): TUseAllBookmarker => {
  const siteMapHeader = useMemo(
    () => [
      {
        Header: 'Website Path',
        accessor: 'name',
      },
      {
        Header: 'Reg. Date',
        Cell: ({ row }: TRow) => <>{moment(row?.original?.createdAt).format('LLL')}</>,
      },
      {
        Header: 'Actions',
        Cell: (props) => <ActionMenu {...props} refetch={refetch} />,
      },
    ],
    [refetch],
  );
  return {
    siteMapHeader,
  };
};

export default useSiteMapHeader;
