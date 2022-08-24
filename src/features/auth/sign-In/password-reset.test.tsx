import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import PasswordReset from './password-reset';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { wrapper } from '../../../test-utils/test-utils';
import { passwordResetResponse } from '../../../mock/authentication.mock';

jest.mock('../../../logic/auth/user-authentication.logic');

const mockedAxiosFn = mocked(userAuthenticationFn);

const renderComponent = () => {
  return render(<PasswordReset />, { wrapper });
};

describe('Password Reset Testing', () => {
  test('Component should Render Without Crashing', () => {
    renderComponent();
    const signup = screen.getByRole('button', { name: /Sign up/i });
    const sendMail = screen.getByRole('button', { name: /SEND AN EMAIL/i });
    expect(signup).toBeInTheDocument();
    expect(sendMail).toBeInTheDocument();
  });

  describe('Test Api Call Behavior ', () => {
    test('Test for successful Password Reset Request', async () => {
      mockedAxiosFn.mockImplementationOnce(() => Promise.resolve(passwordResetResponse));

      renderComponent();

      userEvent.type(screen.getByLabelText(/Registered e-mail address/i), 'email@gmail.com');

      userEvent.click(screen.getByRole('button', { name: /SEND AN EMAIL/i }));

      const alertMessage = await screen.findByTestId('success');

      expect(mockedAxiosFn).toHaveBeenCalledTimes(1);
      expect(alertMessage).toHaveTextContent(
        /The reset Email has been sent. Please check your Email address/i,
      );
    });

    test('Test for failed Request', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockedAxiosFn.mockRejectedValueOnce('An Error occurred');

      renderComponent();
      userEvent.type(screen.getByLabelText(/Registered e-mail address/i), 'email@gmail.com');
      userEvent.click(screen.getByRole('button', { name: /SEND AN EMAIL/i }));

      const errorAlert = await screen.findByText(/Please wait/i);

      expect(mockedAxiosFn).toHaveBeenCalledTimes(1);
      expect(errorAlert).toBeInTheDocument();
    });
  });
});
