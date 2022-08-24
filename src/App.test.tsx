import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { wrapper } from './test-utils/test-utils';

test('renders App Component tree without error', () => {
  render(<App />, { wrapper });
});
