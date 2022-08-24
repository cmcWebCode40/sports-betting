import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

interface IUseGetQuery<T> {
  queryKey: string;
  queryFn: QueryFunction<T, QueryKey>;
  options?: UseQueryOptions<T, unknown, T, QueryKey>;
}

export const useGetQuery = <T>({
  queryKey,
  queryFn,
  options,
}: IUseGetQuery<T>): UseQueryResult<T> => {
  return useQuery<T>(queryKey, queryFn, options);
};
