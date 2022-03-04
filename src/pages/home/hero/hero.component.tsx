import { Container, Heading, Button, Box } from '@chakra-ui/react';

import { AnimalOldCard } from 'src/components/card/animal-card.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { AnimalDetail, AnimalRarity, Region } from 'src/components/animal/animal.dto';
import { useMQReal } from 'src/theme/util/media-query';
import './hero.component.scss';

const animals: AnimalDetail[] = [
  {
    '_id': '529da4c9-b340-4828-94ad-c9f613998070',
    'free': false,
    'rarity': AnimalRarity.RARE,
    'name': 'BLACK_MAMBA',
    'level': 3,
    'region': Region.AFRICA,
    'primaryStats': { 'healPoint': 40, 'attackPower': 40, 'speed': 5, 'defense': 10, 'weight': 2, 'lifeSpan': 11 },
    'secondaryStats': { 'poison': 20 },
    'description': 'This is a black mamba.',
  },
  {
    '_id': '529da4c9-b340-4828-94ad-c9f613998070',
    'free': false,
    'rarity': AnimalRarity.EXOTIC,
    'name': 'MUSTANG',
    'level': 1,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'healPoint': 260, 'attackPower': 40, 'speed': 75, 'defense': 50, 'weight': 600, 'lifeSpan': 19 },
    'secondaryStats': { 'healBuff': 20, 'speedBuff': 20 },
    'description': 'This is an mustang.',
  },
  {
    '_id': '529da4c9-b340-4828-94ad-c9f613998070',
    'free': true,
    'rarity': AnimalRarity.COMMON,
    'name': 'OSPREY',
    'level': 8,
    'region': Region.EUROPE,
    'primaryStats': { 'healPoint': 90, 'attackPower': 35, 'speed': 120, 'defense': 35, 'weight': 2, 'lifeSpan': 9 },
    'secondaryStats': { 'speedBuff': 20 },
    'description': 'This is an osprey.',
  },
  {
    '_id': '529da4c9-b340-4828-94ad-c9f613998070',
    'free': true,
    'rarity': AnimalRarity.EXOTIC,
    'name': 'GRAY_WHALE',
    'level': 1,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'healPoint': 1200, 'attackPower': 20, 'speed': 5, 'defense': 20, 'weight': 36000, 'lifeSpan': 61 },
    'secondaryStats': { 'poison': 20 },
    'description': 'This is a gray whale.',
  },
  {
    '_id': '529da4c9-b340-4828-94ad-c9f613998070',
    'free': true,
    'rarity': AnimalRarity.COMMON,
    'name': 'AMERICAN_BISON',
    'level': 1,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'healPoint': 500, 'attackPower': 80, 'speed': 50, 'defense': 150, 'weight': 190, 'lifeSpan': 26 },
    'secondaryStats': { 'attackBuff': 10, 'defenseBuff': 10 },
    'description': 'This is a black bear.',
  },
  {
    '_id': '3502ee1b-6cad-46ff-92f1-23b838033ef9',
    'free': true,
    'rarity': AnimalRarity.RARE,
    'name': 'BLACK_BEAR',
    'level': 3,
    'region': Region.AFRICA,
    'primaryStats': { 'healPoint': 30, 'attackPower': 5, 'speed': 64, 'defense': 10, 'weight': 1, 'lifeSpan': 18 },
    'secondaryStats': { 'healBuff': 20 },
    'description': 'This is a toucan.',
  },
  {
    '_id': 'de99cb6b-de50-4352-9b3e-45da2e87a5b0',
    'free': true,
    'rarity': AnimalRarity.EXOTIC,
    'name': 'GREAT_WHITE_SHARK',
    'level': 5,
    'region': Region.EUROPE,
    'primaryStats': { 'healPoint': 300, 'attackPower': 70, 'speed': 46, 'defense': 120, 'weight': 125, 'lifeSpan': 19 },
    'secondaryStats': { 'attackBuff': 10, 'defenseBuff': 10 },
    'description': 'This is a wild boar.',
  },
];

export const Hero = (): JSX.Element => {
  const { t } = useTranslate();
  const isDesktop = useMQReal('md');

  const redirect = (path: string) => {
    window.open(path, '_blank');
  };
  return (
    <Container maxW="container.xl" className={`hero ${isDesktop ? 'desktop' : 'mobile'}`}>
      <Box className={`hero-left-side`}>
        <AnimalOldCard data={animals[0]} scale={0.75} translateX="135px" className="animal-first ac" />
        <AnimalOldCard data={animals[1]} className="ac animal-middle" />
        <AnimalOldCard data={animals[2]} scale={0.75} className="animal-last ac" />
      </Box>
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
