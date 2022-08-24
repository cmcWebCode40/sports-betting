import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import ErrorBoundary from './pages/error/error-boundary';
import theme from './themes/theme';
import Routes from './routes/Routes';
import i18n from './libs/i18next.lib';

import './libs';
import './assets/style.css';
import { SELECTED_LANG } from './constants/local-storage.constants';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const items: any = localStorage.getItem(SELECTED_LANG);
  const lng = JSON.parse(items);

  return (
    <ErrorBoundary>
      <BrowserRouter basename={`/${lng?.code || 'en'}`}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
            <ReactQueryDevtools />
            <ToastContainer />
          </QueryClientProvider>
        </I18nextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
