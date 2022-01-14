import { Container, Heading } from '@chakra-ui/react';

import { AnimalCard } from 'src/components/card/animal-card.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { AnimalDetail, AnimalType, Region } from 'src/components/card/animal.dto';
import './hero.scss';

const animals: AnimalDetail[] = [
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.COMMON,
    'name': 'AMERICAN_BISON',
    'level': 1,
    'region': Region.NORT_AMERICA,
    'primaryStats': { 'heal': 500, 'attack': 80, 'speed': 50, 'deffence': 150, 'weight': 190, 'lifetime': 26 },
    'secondaryStats': { 'attackBuff': 10, 'deffenceBuff': 10 },
    'description': 'This is a black bear.',
  },
  {
    'id': '3502ee1b-6cad-46ff-92f1-23b838033ef9',
    'type': AnimalType.RARE,
    'name': 'BLACK_BEAR',
    'level': 3,
    'region': Region.AFRICA,
    'primaryStats': { 'heal': 30, 'attack': 5, 'speed': 64, 'deffence': 10, 'weight': 1, 'lifetime': 18 },
    'secondaryStats': { 'healBuff': 20 },
    'description': 'This is a toucan.',
  },
  {
    'id': 'de99cb6b-de50-4352-9b3e-45da2e87a5b0',
    'type': AnimalType.EXOTIC,
    'name': 'GREAT_WHITE_SHARK',
    'level': 5,
    'region': Region.EUROPE,
    'primaryStats': { 'heal': 300, 'attack': 70, 'speed': 46, 'deffence': 120, 'weight': 125, 'lifetime': 19 },
    'secondaryStats': { 'attackBuff': 10, 'deffenceBuff': 10 },
    'description': 'This is a wild boar.',
  },
];

export const Hero = (): JSX.Element => {
  const { t } = useTranslate();
  return (
    <Container maxW="container.xl" className="hero">
      <aside className="hero-left-side">
        <AnimalCard data={animals[0]} scale={0.75} translateX="135px" className="animal-first ac" />
        <AnimalCard data={animals[1]} className="ac animal-middle" />
        <AnimalCard data={animals[2]} scale={0.75} className="animal-last ac" />
      </aside>
      <aside className="hero-right-side">
        <Heading as="h2" size="2xl" color="custom.macaroni-and-cheese" className="hero-title">
          <div>{t('main.hero.header01')}</div>
          <Heading as="h2" size="4xl">
            {t('main.hero.header02')}
          </Heading>
        </Heading>
        <Heading className="hero-description">{t('main.hero.description_first')}</Heading>
      </aside>
    </Container>
  );
};
