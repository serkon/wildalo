import { Heading, Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Hero } from './hero/hero.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './home.page.scss';

export const HomePage = () => {
  const { t } = useTranslate();

  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Hero />
      <section className="one">
        <Container maxW="container.md" className="hero" flexDirection="column" textAlign="center">
          <Heading as="h1" color="white">
            {t('main.section.one.header')}
          </Heading>
          <Text textAlign="center">{t('main.section.one.description')}</Text>
          <Link to="/faq" color="white">
            {t('main.section.one.link')}
          </Link>
        </Container>
      </section>
      <section className="second"></section>
    </>
  );
};
