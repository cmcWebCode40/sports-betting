export const actionHandler = (selectedRowIds: number): void => {
  Object.keys(selectedRowIds)
    .map((x) => Number(x))
    .filter((_, i, check) => check.includes(i));
};
