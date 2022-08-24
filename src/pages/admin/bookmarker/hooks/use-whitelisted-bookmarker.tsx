/* eslint-disable react/display-name */
import { Avatar } from '@material-ui/core';
import React, { useMemo } from 'react';

type TOriginal = {
  title: string;
  logo: string;
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

const useWhiteListedBookMarker = (): TUseAllBookmarker => {
  const whiteListedHeader = useMemo(
    () => [
      {
        Header: 'Logo',
        Cell: ({ row }: TRow) => (
          <Avatar alt={row?.original?.title} src={row?.original?.logo} variant="square" />
        ),
      },
      {
        Header: 'Web Name',
        accessor: 'WebName',
      },
      {
        Header: 'ID Provider',
        accessor: 'idProvider',
      },
    ],
    [],
  );
  return {
    whiteListedHeader,
  };
};

export default useWhiteListedBookMarker;
