import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import './index.scss';
import theme from './theme';
import App from './App';
import { store } from 'src/store/store';
import { Language } from 'src/components/translate/translate.component';
import { HomePage } from 'src/pages/home/home.page';
import { Outlet } from 'react-router';

export const useSetTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export const useProcess = () => {
  useEffect(() => {
    console.log('process.env:', process.env);
  });
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Language>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="home" element={<HomePage />} />
              </Route>
            </Routes>
            <Outlet />
          </Language>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
