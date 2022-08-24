/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import ErrorBoundary from '../pages/error/error-boundary';
import i18n from '../libs/i18next.lib';
import { store } from '../provider/store/store';
import theme from '../themes/theme';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapper = ({ children }: any): JSX.Element => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </Provider>
          </QueryClientProvider>
        </I18nextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export { wrapper };
