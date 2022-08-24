import React from 'react';
import SearchInputField from '../searchbar/search-input-field';
import { useGlobalSearchStyles } from './styles/table.styles';

interface IGlobalFilter {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  withSearchBar?: boolean;
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  withSearchBar,
}: IGlobalFilter): JSX.Element => {
  const classes = useGlobalSearchStyles();
  const count = preGlobalFilteredRows.length;

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <div className={classes.search}>
      {withSearchBar ? (
        <SearchInputField
          style={{ width: 400 }}
          value={globalFilter || ''}
          onChange={(e) => {
            setGlobalFilter(e.target.value || undefined);
          }}
          placeholder={`${count} records...`}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default GlobalFilter;
