import React, { useState } from 'react';
import { queryUrl } from '../../../helpers/query-params';
import SignUpForm from './signup-form';
import SignUpConfirmation from './signup-confirmation';
import VerifyAccount from './verify-account';
import { LocationProps } from '../../../components/auth/auth-modal-types';

interface SignUpProps {
  location?: LocationProps;
}

const { location } = window;

const SignUp: React.FC<SignUpProps> = () => {
  const prevStep = queryUrl(location).get('step');
  const tokenId = queryUrl(location).get('token');
  const [steps, setSteps] = useState<number>(Number(prevStep));

  const SignUpSteps = () => {
    switch (steps) {
      case 0:
        return <SignUpForm setSteps={setSteps} steps={steps} />;
      case 1:
        return <SignUpConfirmation />;
      case 2:
        return <VerifyAccount tokenId={tokenId} />;
      default:
        throw new Error('Not found');
    }
  };

  return <div>{SignUpSteps()}</div>;
};

export default SignUp;
