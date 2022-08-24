import { render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Account from './verify-account';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { wrapper } from '../../../test-utils/test-utils';

jest.mock('../../../logic/auth/user-authentication.logic');

const mockedAxiosFn = mocked(userAuthenticationFn);

const renderComponent = (tokenId: string) => {
  return render(<Account tokenId={tokenId} />, { wrapper });
};

describe('Test for Account Verification', () => {
  describe('Test Api Call Behavior ', () => {
    test('Test for successful confirmation request', async () => {
      mockedAxiosFn.mockResolvedValueOnce({ message: 'successful' });
      renderComponent('token123455');
      await waitFor(() => {
        expect(
          screen.getByText(/Congratulations! Your membership has been approved./i),
        ).toBeInTheDocument();
      });
    });

    test('Test for failed Request', async () => {
      mockedAxiosFn.mockRejectedValueOnce('An Error occurred');
      renderComponent('');
      const errorAlert = screen.queryAllByText(/No token Provided/i);
      expect(errorAlert[0]).toHaveTextContent(/No token Provided/i);
    });
  });
});
