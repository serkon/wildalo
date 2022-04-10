import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/ubuntu';
import '@fontsource/berkshire-swash';
import '@fontsource/roboto';
import '@fontsource/roboto-slab';
import '@fontsource/saira';

import './index.scss';
import App from './App';
import theme from './theme';
import { store } from 'src/store/store';
import { Language } from 'src/components/translate/translate.component';
import { ScrollTo } from 'src/hooks';
import { PageFaq } from 'src/pages/faq/faq.page';
import { PageHome } from 'src/pages/home/home.page';
import { PageNotFound } from 'src/pages/http/not-found.page';
import { PageRegister } from 'src/pages/user/register.page';
import { PageGame } from 'src/pages/game/game.page';

const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTo />
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Language>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="" element={<PageHome />} />
                <Route path="faq" element={<PageFaq />} />
                <Route path="game/*" element={<PageGame />} />
                <Route path="register" element={<PageRegister />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
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
