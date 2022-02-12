import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { useTranslate } from './components/translate/translate.component';
import { useMobile, useProcess, useSetTitle } from 'src/index';
import logo from './assets/logo.svg';

function App(): JSX.Element {
  useSetTitle('Wildalo');
  useMobile();
  useProcess();
  const { t } = useTranslate();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Header logo={logo} />
        <main style={{ 'flexGrow': 1 }}>
          <Outlet />
        </main>
        <Footer logo={logo} className="footer" />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
