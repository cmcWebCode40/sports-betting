import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import userEvent from '@testing-library/user-event';
import SignUpConfirmation from './signup-confirmation';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { wrapper } from '../../../test-utils/test-utils';

jest.mock('../../../logic/auth/user-authentication.logic');

const mockedAxiosFn = mocked(userAuthenticationFn);

const renderComponent = () => {
  return render(<SignUpConfirmation />, { wrapper });
};

describe('Test for Account Confirmation', () => {
  test('Component should Render Without Crashing', () => {
    renderComponent();
    const sendMail = screen.getByRole('button', { name: /SEND AGAIN/i });
    expect(sendMail).toHaveTextContent(/SEND AGAIN/i);
  });

  describe('Test Api Call Behavior ', () => {
    test.skip('Test for successful confirmation request', async () => {
      mockedAxiosFn.mockResolvedValueOnce({ message: 'successful' });

      renderComponent();

      userEvent.click(screen.getByRole('button', { name: /SEND AGAIN/i }));
      screen.debug();
      const alertMessage = await screen.findByText('Resending mail');
      // expect(mockedAxiosFn).toHaveBeenCalledTimes(1);
      expect(alertMessage).not.toBeInTheDocument();
    });

    test('Test for failed Request', async () => {
      mockedAxiosFn.mockRejectedValueOnce('An Error occurred');
      renderComponent();
      userEvent.click(screen.getByRole('button', { name: /SEND AGAIN/i }));

      const errorAlert = screen.queryAllByText(/Something went wrong/i);
      expect(errorAlert[0]).toBeInTheDocument();
    });
  });
});
