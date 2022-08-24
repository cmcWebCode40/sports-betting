import { useMemo } from 'react';

type TUseAllBookmarker = {
  AllBookmarkerHeader: unknown;
};

const useAllBookmarker = (): TUseAllBookmarker => {
  const AllBookmarkerHeader = useMemo(
    () => [
      {
        Header: 'Bookmaker Name',
        accessor: 'name',
      },
    ],
    [],
  );
  return {
    AllBookmarkerHeader,
  };
};

export default useAllBookmarker;
