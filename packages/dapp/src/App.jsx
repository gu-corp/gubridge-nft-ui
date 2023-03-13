import 'focus-visible/dist/focus-visible';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { SettingsProvider } from 'contexts/SettingsContext';
import { Web3Provider } from 'contexts/Web3Context';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

import i18n from './i18n';
import { Routes } from './Routes';
import { theme } from './theme';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  *:focus {
    outline: none;
    border-color: rgba(66, 153, 225, 0.6);
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
`;

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Global styles={GlobalStyles} />
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <Router>
          <SettingsProvider>
            <Web3Provider>
              <Routes />
            </Web3Provider>
          </SettingsProvider>
        </Router>
      </ErrorBoundary>
    </I18nextProvider>
  </ChakraProvider>
);
