import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { useTranslate } from './components/translate/translate.component';
import logo from './assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Ranger } from './pages/user/user.dto';
import { DispatchType, RootState } from './store/store';
import { setUser } from './store/reducers/UserReducer';
import { Button } from '@chakra-ui/react';
import { useApi, useMobile, useProcess, useSetTitle } from './hooks';

function App(): JSX.Element {
  const { t } = useTranslate();
  const dispatch = useDispatch<DispatchType>();
  const selector = useSelector<RootState>((state: RootState): Ranger | null => state.user);

  useApi({ url: '/my/profile' }, (data) => dispatch(setUser(data.data)));
  selector;

  useSetTitle('Wildalo');
  useMobile();
  useProcess();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Header logo={logo} />
        <main>
          <Button>ddd</Button>
          <Outlet />
        </main>
        <Footer logo={logo} className="footer" />
      </Suspense>
    </ErrorBoundary>
  );
}

// export default connect()(App);
export default App;
