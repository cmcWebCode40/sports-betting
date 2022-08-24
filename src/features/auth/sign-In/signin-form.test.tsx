import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import userEvent from '@testing-library/user-event';
import SignInForm from './signin-form';
import { wrapper } from '../../../test-utils/test-utils';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { userResponse } from '../../../mock/authentication.mock';

jest.mock('../../../logic/auth/user-authentication.logic');

const steps = 0;
const setSteps = jest.fn;
const mockedAxiosFn = mocked(userAuthenticationFn);

const renderRtl = () => render(<SignInForm steps={steps} setSteps={setSteps} />, { wrapper });

describe('User Signin Flow ', () => {
  test('Signin Form Component should render correctly', () => {
    renderRtl();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  describe('User Signin Functionality', () => {
    test('User Should signin successfully', async () => {
      mockedAxiosFn.mockResolvedValueOnce(userResponse);
      renderRtl();
      userEvent.type(screen.getByLabelText(/E-mail address/i), userResponse.email);
      userEvent.type(screen.getByLabelText(/password/i), userResponse.username);
      userEvent.click(screen.getByTestId('login-button'));

      await waitFor(() => expect(userResponse).toEqual(userResponse));
    });

    test('When User Signin Request Failed', async () => {
      mockedAxiosFn.mockRejectedValueOnce('Request Failed');
      renderRtl();
      userEvent.type(screen.getByLabelText(/E-mail address/i), userResponse.email);
      userEvent.type(screen.getByLabelText(/password/i), userResponse.username);

      userEvent.click(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(screen.getByText(/Signing in/i)).toBeInTheDocument();
      });
    });
  });
});
