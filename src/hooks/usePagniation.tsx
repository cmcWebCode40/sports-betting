import { useState } from 'react';

const usePagination = (data: any[], itemsPerPage: number): any => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPg: number) => Math.min(currentPg + 1, maxPage));
  }

  function prev() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function jump(pg: number) {
    const pageNumber = Math.max(1, pg);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
