import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

import { DispatchType, RootState } from './store/store';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { useMobile, useProcess, useSetTitle } from './hooks';
import { Header } from 'src/components/header/header.component';
import { Footer } from 'src/components/footer/footer.component';
import { useTranslate } from 'src/components/translate/translate.component';

import logo from './assets/logo.svg';

function App(): JSX.Element {
  const { t } = useTranslate();
  const dispatch = useDispatch<DispatchType>();
  const selector = useSelector<RootState>((state: RootState): RootState => state) as RootState;

  // useApi({ url: '/my/profile' }, (data: HttpResponse<Ranger>) => dispatch(set_ranger(data.data)));
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

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Header logo={logo} />
        <Box color={'white'}>{JSON.stringify(selector.metamask)}</Box>
        {false && (
          <Box color={'white'}>
            <pre style={{ width: '600px', height: '330px', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              <code>{JSON.stringify(selector)}</code>
            </pre>
          </Box>
        )}
        <main>
          <Outlet />
        </main>
        <Footer logo={logo} className="footer" />
      </Suspense>
    </ErrorBoundary>
  );
}

// export default connect()(App);
export default App;
