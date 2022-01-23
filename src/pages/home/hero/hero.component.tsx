import { Container, Heading, Button, Box } from '@chakra-ui/react';

import { AnimalCard } from 'src/components/card/animal-card.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { AnimalDetail, AnimalType, Region } from 'src/components/card/animal.dto';
import { useMQReal } from 'src/theme/util/media-query';
import './hero.component.scss';

const animals: AnimalDetail[] = [
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.RARE,
    'name': 'BLACK_MAMBA',
    'level': 3,
    'region': Region.AFRICA,
    'primaryStats': { 'heal': 40, 'attack': 40, 'speed': 5, 'deffence': 10, 'weight': 2, 'lifetime': 11 },
    'secondaryStats': { 'poison': 20 },
    'description': 'This is a black mamba.',
  },
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.EXOTIC,
    'name': 'MUSTANG',
    'level': 3,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'heal': 260, 'attack': 40, 'speed': 75, 'deffence': 50, 'weight': 600, 'lifetime': 19 },
    'secondaryStats': { 'healBuff': 20, 'speedBuff': 20 },
    'description': 'This is an mustang.',
  },
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.COMMON,
    'name': 'OSPREY',
    'level': 8,
    'region': Region.EUROPE,
    'primaryStats': { 'heal': 90, 'attack': 35, 'speed': 120, 'deffence': 35, 'weight': 2, 'lifetime': 9 },
    'secondaryStats': { 'speedBuff': 20 },
    'description': 'This is an osprey.',
  },
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.EXOTIC,
    'name': 'GRAY_WHALE',
    'level': 1,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'heal': 1200, 'attack': 20, 'speed': 5, 'deffence': 20, 'weight': 36000, 'lifetime': 61 },
    'secondaryStats': { 'poison': 20 },
    'description': 'This is a gray whale.',
  },
  {
    'id': '529da4c9-b340-4828-94ad-c9f613998070',
    'type': AnimalType.COMMON,
    'name': 'AMERICAN_BISON',
    'level': 1,
    'region': Region.NORTH_AMERICA,
    'primaryStats': { 'heal': 500, 'attack': 80, 'speed': 50, 'deffence': 150, 'weight': 190, 'lifetime': 26 },
    'secondaryStats': { 'attackBuff': 10, 'defenseBuff': 10 },
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
        <AnimalCard data={animals[0]} scale={0.75} translateX="135px" className="animal-first ac" />
        <AnimalCard data={animals[1]} className="ac animal-middle" />
        <AnimalCard data={animals[2]} scale={0.75} className="animal-last ac" />
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
          <Button bg="custom.macaroni-and-cheese" color="black" onClick={() => redirect('https://discord.com/channels/920134929583603714/920134930284044359')}>
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
