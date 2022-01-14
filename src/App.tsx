import { Suspense } from 'react';
import { Heading, Text, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

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
          <section className="section-01">
            <Container maxW="container.md" className="hero" flexDirection="column" textAlign="center">
              <Heading as="h1" color="white">
                {t('main.section.one.header')}
              </Heading>
              <Text textAlign="center">{t('main.section.one.description')}</Text>
              <Link to="/home" color="white">
                {t('main.section.one.link')}
              </Link>
              <Outlet />
            </Container>
          </section>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
