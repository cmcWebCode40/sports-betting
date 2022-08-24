import { useMemo } from 'react';

type TUseAllBookmarker = {
  AllBookmarkerHeader: unknown;
};

const useAllBookmarker = (): TUseAllBookmarker => {
  const AllBookmarkerHeader = useMemo(
    () => [
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
    AllBookmarkerHeader,
  };
};

export default useAllBookmarker;
