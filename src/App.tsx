import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { useTranslate } from './components/translate/translate.component';
import logo from './assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { HttpResponse, api } from './components/axios/axios.component';
import { Ranger } from './pages/user/user.dto';
import { RootState, DispatchType } from './store/store';
import { setUser } from './store/reducers/UserReducer';
import { Button } from '@chakra-ui/react';

function App(): JSX.Element {
  const { t } = useTranslate();

  useSelector<RootState>((state: RootState): Ranger | null => state.user);
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<HttpResponse<Ranger>> = await api.post('/my/profile');
      const { data } = response;

      dispatch(setUser(data.data));
    }

    fetchData();
  }, [dispatch]); // Or [] if effect doesn't need props or state

  // useSetTitle('Wildalo');
  // useMobile();
  // useProcess();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Header logo={logo} />
        <main>
          <Button>asd</Button>
          <Outlet />
        </main>
        <Footer logo={logo} className="footer" />
      </Suspense>
    </ErrorBoundary>
  );
}

// export default connect()(App);
export default App;
