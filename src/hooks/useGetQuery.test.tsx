import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import Axios from 'axios';
import { useGetQuery } from './useGetQuery';
import { apiServer } from '../services/services';

export const userAuthenticationFn = async <T, K>(data: T): Promise<K> => {
  return apiServer.post(`/auth/`, data);
};

jest.mock('axios');

const mockedAxiosFn = Axios as jest.Mocked<typeof Axios>;

const client = new QueryClient();

interface IWrapper {
  children: React.ReactNode;
}

const wrapper = ({ children }: IWrapper) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

test('render custom react query hook', async () => {
  mockedAxiosFn.get.mockImplementationOnce(() => Promise.resolve({ data: 'data' }));
  screen.debug();
  const { result } = renderHook(
    () =>
      useGetQuery({
        queryFn: (data) => userAuthenticationFn<unknown, unknown>(data),
        queryKey: 'query-id',
      }),
    {
      wrapper,
    },
  );
  // await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(undefined);
});

test('test for returned error value', async () => {
  const errorMessage = 'Something Went Wrong';
  mockedAxiosFn.get.mockImplementationOnce(() => Promise.reject(errorMessage));
  screen.debug();
  const { result, waitFor } = renderHook(
    () =>
      useGetQuery({
        queryFn: (data) => userAuthenticationFn<unknown, unknown>(data),
        queryKey: 'query-id',
      }),
    {
      wrapper,
    },
  );
  await waitFor(() => result.current.isError);
  expect(result.current.error).toEqual(null);
});
