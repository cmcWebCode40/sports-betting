import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import { userAuthenticationFn } from '../../../logic/auth/user-authentication.logic';
import { userResponse } from '../../../mock/authentication.mock';
import { wrapper } from '../../../test-utils/test-utils';
import SignUpForm from './signup-form';

jest.mock('../../../logic/auth/user-authentication.logic');

const steps = 0;
const stepsFn = jest.fn;

const mockedAxiosFn = mocked(userAuthenticationFn);

const renderRtl = () => render(<SignUpForm setSteps={stepsFn} steps={steps} />, { wrapper });

describe('Test for Account Confirmation', () => {
  test('Component Should render correctly', () => {
    renderRtl();

    expect(screen.getByTestId('signup')).toHaveTextContent(/sign up/i);
  });

  describe('Signup Process Flow', () => {
    test('User Should Sign up Successfully', async () => {
      mockedAxiosFn.mockImplementationOnce(() => Promise.resolve(userResponse));
      renderRtl();
      userEvent.type(screen.getByLabelText(/User name/i), 'cmcWebCode');
      userEvent.type(screen.getByLabelText(/E-mail address/i), 'cmcWebCode@gmail.com');
      userEvent.type(screen.getByLabelText(/Password/i), 'cmcWebCode');
      userEvent.click(screen.getByTestId('signup'));

      expect(await screen.findByText(/creating user/i)).toBeInTheDocument();
    });
    test('If Error Occur in signup process', async () => {
      mockedAxiosFn.mockRejectedValueOnce('Something Went Wrong');
      renderRtl();
      userEvent.type(screen.getByLabelText(/User name/i), 'cmcWebCode');
      userEvent.type(screen.getByLabelText(/E-mail address/i), 'cmcWebCode@gmail.com');
      userEvent.type(screen.getByLabelText(/Password/i), 'cmcWebCode');
      userEvent.click(screen.getByTestId('signup'));

      expect(await screen.findByText(/creating user/i)).toBeInTheDocument();
    });
  });
});
