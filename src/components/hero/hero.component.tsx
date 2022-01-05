import { Button, Container, Heading } from '@chakra-ui/react';

import { AnimalCard } from 'src/components/card/animal-card.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './hero.scss';

export const Hero = (): JSX.Element => {
  const { t } = useTranslate();
  return (
    <Container maxW="container.xl" className="hero">
      <aside className="hero-left-side">
        <AnimalCard id="2" type="2" label="Wandering Albatros" scale={0.75} translateX="135px" className="animal-first ac" />
        <AnimalCard id="3" type="3" label="Wandering Albatros" className="ac animal-middle" />
        <AnimalCard id="1" type="1" label="Wandering Albatros" scale={0.75} className="animal-last ac" />
      </aside>
      <aside className="hero-right-side">
        <Heading as="h2" size="2xl" color="custom.macaroni-and-cheese" className="hero-title">
          <div>{t('hero.header01')}</div>
          <div>{t('hero.header02')}</div>
          <div>{t('hero.header03')}</div>
        </Heading>
        <Heading className="hero-description">First 100 packages are at discount during pre-launch.</Heading>
        <Heading className="hero-description hero-slogan">Sign up and buy now!</Heading>
        <Button color="light" className="hero-sign">
          START
        </Button>
        <Heading className="hero-description">Win 5 FREE cards by signing up!</Heading>
      </aside>
    </Container>
  );
};
