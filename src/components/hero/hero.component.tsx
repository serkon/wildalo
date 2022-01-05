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
          <div>{t('main.hero.header01')}</div>
          <div>{t('main.hero.header02')}</div>
          <div>{t('main.hero.header03')}</div>
        </Heading>
        <Heading className="hero-description">{t('main.hero.description_first')}</Heading>
        <Heading className="hero-description hero-slogan">{t('main.hero.slogan')}</Heading>
        <Button color="light" className="hero-sign">
          {t('common.start')}
        </Button>
        <Heading className="hero-description">{t('main.hero.description_second')}</Heading>
      </aside>
    </Container>
  );
};
