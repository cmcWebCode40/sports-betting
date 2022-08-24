/* eslint-disable react/jsx-key */
import React from 'react';
import PerfectScroll from 'react-perfect-scrollbar';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import TableToolbar from './table-toolbar';
import TablePaginationActions from './table-pagination-action';

interface ICustomViewTable {
  columns: any;
  data: any;
  tableTitle?: string | number;
  setData?: any;
  updateMyData?: any;
  skipPageReset?: any;
  onClick?: any;
  actionKey?: string;
  withSearchBar?: boolean;
}

export const CustomViewTable = ({
  columns,
  data,
  tableTitle,
  updateMyData,
  onClick,
  actionKey,
  withSearchBar,
}: ICustomViewTable): JSX.Element => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      // defaultColumn,
      // autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    // (hooks: any) => {
    //   hooksResolver(hooks);
    // },
  );

  const handleChangePage = (event: any, newPage: any) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  if (!data.length) {
    return <p>No Data </p>;
  }

  const onClickAction = (value: any) => {
    if (onClick && actionKey) {
      onClick(value?.original[actionKey]);
    }
  };

  // Render the UI for your table
  return (
    <PerfectScroll>
      <TableContainer style={{ maxHeight: 900 }}>
        <TableToolbar
          tableTitle={tableTitle}
          withSearchBar={withSearchBar}
          numSelected={Object.keys(selectedRowIds).length}
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
        <MaUTable stickyHeader aria-label="sticky table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow key={Math.random()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...(column.id === 'selection'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render('Header')}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                    {column?.Filter ? column.render('Filter') : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow hover {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <TableCell {...cell.getCellProps()} onClick={() => onClickAction(cell?.row)}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                colSpan={10}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </PerfectScroll>
  );
};

export default CustomViewTable;
