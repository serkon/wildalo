import { Suspense } from 'react';
import { Heading } from '@chakra-ui/react';

import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from './components/header/header.component';
import { Hero } from './components/hero/hero.component';
import { useSetTitle } from 'src/index';
import logo from './assets/logo.png';
import './App.scss';

function App(): JSX.Element {
  useSetTitle('App');

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...!</div>}>
        <Header logo={logo}>test</Header>
        <main>
          <Heading as="h2" size="lg" variant="center" isTruncated className="page-banner">
            New Etherium Game is Coming Soon!
          </Heading>
          <Hero />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
