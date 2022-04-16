import { Container, Heading, Button, Box } from '@chakra-ui/react';
import { Animal, AnimalRarity, Region } from 'src/components/animal/animal.dto';

import { useTranslate } from 'src/components/translate/translate.component';
import { Triad } from 'src/components/triad/triad.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import './hero.component.scss';

const animals: Animal[] = [
  {
    _id: 'c3d955d0-c9b4-4e51-93bd-9fd50de129a2',
    rarity: AnimalRarity.COMMON,
    free: true,
    name: 'BLACK_BEAR',
    level: 1,
    region: Region.NORTH_AMERICA,
    primaryStats: {
      attackPower: 80,
      defense: 150,
      speed: 50,
      healPoint: 500,
      weight: 190,
      lifeSpan: 26,
    },
    secondaryStats: {
      attackBuff: 10,
      defenseBuff: 10,
    },
  },
  {
    _id: '41ac0c6b-09d2-4a44-86fd-26a403a61443',
    rarity: AnimalRarity.RARE,
    free: false,
    name: 'AMERICAN_BISON',
    level: 2,
    region: Region.NORTH_AMERICA,
    primaryStats: {
      attackPower: 600,
      defense: 50,
      speed: 35,
      healPoint: 200,
      weight: 1200,
      lifeSpan: 17,
    },
    secondaryStats: {
      healBuff: 10,
      defenseBuff: 20,
    },
  },
  {
    _id: 'df8b3ca6-b55d-489a-8878-e8e0eee77edd',
    rarity: AnimalRarity.EXOTIC,
    free: false,
    name: 'BLACK_RHINOCEROS',
    level: 7,
    region: Region.AFRICA,
    primaryStats: {
      attackPower: 500,
      defense: 120,
      speed: 42,
      healPoint: 200,
      weight: 1100,
      lifeSpan: 47,
    },
    secondaryStats: {
      attackBuff: 10,
      defenseBuff: 10,
      defenseDebuff: 10,
    },
  },
];

export const Hero = (): JSX.Element => {
  const { t } = useTranslate();
  const isDesktop = useMediaQuery('lg');
  const redirect = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <Container maxW="container.xl" className={`hero ${isDesktop ? 'desktop' : 'mobile'}`}>
      <Triad data={animals} className="hero-left-side" />
      <aside className="hero-right-side">
        <Heading as="h2" size="2xl" color="custom.macaroni-and-cheese" className="hero-title">
          <div>{t('main.hero.header01')}</div>
        </Heading>
        <Heading as="h2" size="4xl" color="custom.macaroni-and-cheese" paddingBottom={9}>
          {t('main.hero.header02')}
        </Heading>
        <Heading className="hero-description">{t('main.hero.description_first')}</Heading>
        <Box paddingTop="30" justifyContent="center">
          <Button bg="custom.macaroni-and-cheese" color="black" onClick={() => redirect('https://discord.gg/Vypt9GUjKh')}>
            {t('main.hero.join_discord')}
          </Button>
          <Button bg="custom.macaroni-and-cheese" color="black" marginLeft="24px" onClick={() => redirect('https://t.me/+jO3E4SQjH6U2MmEx')}>
            {t('main.hero.join_telegram')}
          </Button>
        </Box>
      </aside>
    </Container>
  );
};
