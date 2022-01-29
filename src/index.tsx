import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import './index.scss';
import App from './App';
import theme from './theme';
import { store } from 'src/store/store';
import { Language } from 'src/components/translate/translate.component';
import { ScrollTo } from 'src/hooks/scroll.hook';
import { FAQPage } from 'src/pages/faq/faq.page';
import { HomePage } from './pages/home/home.page';
import { useMQReal } from './theme/util/media-query';

export const useSetTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement;
export const useProcess = () => {
  useEffect(() => {
    console.log('process.env:', process.env);
  });
};

export const useMobile = () => {
  const isDesktop = useMQReal('md');

  useEffect(() => {
    !isDesktop ? root?.classList.add('mobile') : root?.classList.remove('mobile');
  });
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTo />
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Language>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="" element={<HomePage />} />
                <Route path="faq" element={<FAQPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Outlet />
          </Language>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  root,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
