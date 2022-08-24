import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import PasswordUpdate from './password-update';
import { wrapper } from '../../../test-utils/test-utils';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { updatePasswordResponse } from '../../../mock/authentication.mock';

jest.mock('../../../logic/auth/user-authentication.logic');

const mockedAxiosFn = mocked(userAuthenticationFn);

const resetToken = '2309EWMKDJKEPOWELKASNMSDIO';

describe('Password Update Testing', () => {
  test('Component should Render Without Crashing', () => {
    render(<PasswordUpdate tokenId={resetToken} />, { wrapper });
  });

  test('Test for successful Password Reset Request', async () => {
    mockedAxiosFn.mockResolvedValueOnce(updatePasswordResponse);
    render(<PasswordUpdate tokenId={resetToken} />, { wrapper });
    userEvent.type(screen.getByLabelText(/Password/i), 'admin');
    userEvent.type(screen.getByLabelText(/Confirm Password/i), 'admin');

    userEvent.click(screen.getByRole('button', { name: /CREATE NEW PASSWORD/i }));

    const messageAlert = await screen.findByTestId('success');
    expect(messageAlert).toBeInTheDocument();
  });

  test('Test for failed Request', async () => {
    mockedAxiosFn.mockImplementationOnce(() => Promise.reject(new Error('An Error occurred')));
    render(<PasswordUpdate tokenId="" />, { wrapper });

    userEvent.type(screen.getByLabelText(/Password/i), 'admin');
    userEvent.type(screen.getByLabelText(/Confirm Password/i), 'admin');

    userEvent.click(screen.getByRole('button', { name: /CREATE NEW PASSWORD/i }));

    const messageAlert = await screen.findByTestId('error');

    expect(messageAlert).toBeInTheDocument();
  });
});
