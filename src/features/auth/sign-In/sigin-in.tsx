import React from 'react';
import SignInForm from './signin-form';
import PasswordReset from './password-reset';
import PasswordUpdate from './password-update';
import { queryUrl } from '../../../helpers/query-params';
import { LocationProps } from '../../../components/auth/auth-modal-types';

interface SignInProps {
  location?: LocationProps;
}
const SignIn: React.FC<SignInProps> = () => {
  const prevStep = queryUrl(window.location).get('step');
  const tokenId = queryUrl(window.location).get('token');
  const [steps, setSteps] = React.useState<number>(Number(prevStep) || 0);

  const SignInSteps = () => {
    switch (steps) {
      case 0:
        return <SignInForm steps={steps} setSteps={setSteps} />;
      case 1:
        return <PasswordReset />;
      case 2:
        return <PasswordUpdate tokenId={tokenId} />;
      default:
        throw new Error('Not found');
    }
  };
  return <div>{SignInSteps()}</div>;
};

export default SignIn;
