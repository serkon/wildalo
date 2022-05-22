import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DispatchType, RootState } from './store/store';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { useMobile, useProcess, useSetTitle } from './hooks';
import { Header } from 'src/components/header/header.component';
import { Footer } from 'src/components/footer/footer.component';
import { useTranslate } from 'src/components/translate/translate.component';

import logo from './assets/logo.svg';
import { Box } from '@chakra-ui/react';

function App(): JSX.Element {
  const { t } = useTranslate();
  const dispatch = useDispatch<DispatchType>();
  const selector = useSelector<RootState>((state: RootState): RootState => state) as RootState;

  // useApi({ url: '/my/info' }, (data: HttpResponse<Ranger>) => dispatch(set_ranger(data.data)));
  dispatch;
  selector;

  useSetTitle('Wildalo');
  useMobile();
  useProcess();

  useEffect(() => {
    const initMetaMask = async (): Promise<void> => {
      // await MetaMaskHandler.init();
    };
    initMetaMask();
  }, []);

  const curLoc = useLocation();
  useEffect(() => {
    // console.log('## curLoc', location.pathname, match?.params);
  }, [curLoc]);
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Header />
        <Box className="main" mt={{ base: '70px', md: 0 }}>
          <Outlet />
        </Box>
        <Footer logo={logo} className="footer" />
      </Suspense>
    </ErrorBoundary>
  );
}

// export default connect()(App);
export default App;
