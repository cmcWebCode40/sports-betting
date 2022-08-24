import { useEffect, useState } from 'react';
import { useGetQuery } from '../../../../hooks/useGetQuery';
import {
  bookmakerApiMiddleware,
  IBookMarkerResponse,
} from '../../../../logic/admin/all-bookmarkers.logic';
import { TAppBookMaker } from '../../../../models/bookmarkers.model';

const queryOptions = {
  queryKey: 'admin-bookmaker-view',
  options: {
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
  },
};
interface IUseBookmakerDetails {
  id: string;
}
type TReturnedValues = {
  response: any;
  isLoading: boolean;
};

const useBookmakerDetails = ({ id }: IUseBookmakerDetails): TReturnedValues => {
  const [response, setResponse] = useState<TAppBookMaker[]>([]);
  const { data, isLoading, refetch } = useGetQuery<IBookMarkerResponse>({
    queryFn: () =>
      bookmakerApiMiddleware<IBookMarkerResponse>({ method: 'get', url: `/bookmakers/${id}` }),
    ...queryOptions,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  useEffect(() => {
    if (data?.data?.data) {
      setResponse(data?.data?.data);
    }
  }, [data?.data?.data]);

  return {
    response,
    isLoading,
  };
};

export default useBookmakerDetails;
