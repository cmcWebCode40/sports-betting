import React from 'react';
import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { wrapper } from '../../test-utils/test-utils';
import { userProfileFn } from '../../logic/user-profile.logic';
import UserProfile from './user-profile';

const mockedFn = mocked(userProfileFn);

jest.mock('../../logic/user-profile.logic');

const rtlRender = () => render(<UserProfile />, { wrapper });

describe('User Profile Page Test', () => {
  test('Component Should Render Correctly ', async () => {
    mockedFn.mockImplementationOnce(() =>
      Promise.resolve({ name: 'mike', profilePics: 'xakksksj' }),
    );
    rtlRender();
    const profileTitle = screen.getByText(/Profile/i);
    expect(profileTitle).toBeInTheDocument();
  });
});
