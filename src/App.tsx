import { Suspense } from 'react';
import { Heading } from '@chakra-ui/react';

import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from './components/header/header.component';
import { useTranslate } from './components/translate/translate.component';
import { useSetTitle } from 'src/index';
import { Hero } from './components/hero/hero.component';
import logo from './assets/logo.png';
import './App.scss';

function App(): JSX.Element {
  useSetTitle('App');
  const { t } = useTranslate();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...!</div>}>
        <Header logo={logo}>test</Header>
        <main>
          <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
            {t('main.slogan')}
          </Heading>
          <Hero />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
