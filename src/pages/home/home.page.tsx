import { Box, Button, Container, Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react';
import { Carousel, CarouselItem } from 'src/components/carousel/carousel.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Triad } from 'src/components/triad/triad.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import { Animal, AnimalRarity, Region } from 'src/utils/dto';

import './home.page.scss';

const roadmap = [
  {
    title: 'Q2',
    description: ['TGE & Community Building', 'Herd Fights Begin'],
  },
  {
    title: 'Q3',
    description: ['New Fall Wildlings', 'Ranger Leaderboard & Tournaments', 'NFT sales in Wildalo Marketplace'],
  },
  {
    title: 'Q4',
    description: ['New Winter Wildlings', 'Wildalo Homesteads'],
  },
  {
    title: 'H1’23',
    description: ['New Spring Wildlings', 'Consumables', 'Ranger Guilds'],
  },
];

const carousel = [
  {
    title: 'main.carousel-01.title',
    description: 'main.carousel-01.description',
    button: { label: "Let's get started", click: '/signup' },
  },
  {
    title: 'main.carousel-02.title',
    description: 'main.carousel-02.description',
    button: { label: "Let's get started", click: '/signup' },
  },
  {
    title: 'main.carousel-03.title',
    description: 'main.carousel-03.description',
    button: { label: "Let's get started", click: '/signup' },
  },
];

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

// TODO remove:
roadmap;

export const PageHome = () => {
  const { t } = useTranslate();
  const isLarge = useMediaQuery('md');
  // TODO remove:
  isLarge;

  return (
    <>
      <Box backgroundImage="/images/pages/landing/hero-background.png" className="home-hero">
        <Image src="/images/pages/landing/hero-logo.svg" alt="Wildalo" height="152px" pt="48px" />
        <Heading fontSize="5xl" textAlign={'center'} pb="48px" color="white">
          {t('main.slogan')}
        </Heading>
      </Box>
      <Box className="home-description">
        <Heading width="660px" fontSize="18px" textAlign={'center'} pb="55px" color="white">
          <div dangerouslySetInnerHTML={{ __html: t('main.subslogan') }} />
        </Heading>
        <Button variant={'primary'} className="play-now" height="44px" borderRadius="22px">
          {t('common.Play_Now')}
        </Button>
        <Box className="extensions">
          <Image src="/images/pages/landing/home-avalange-logo.svg" alt="" />
          <Image src="/images/pages/landing/home-metamask-logo.svg" alt="" />
        </Box>
      </Box>
      <section className="home-become-ranger">
        <Container maxW="container.xl">
          <Flex>
            <VStack alignItems="flex-start" flexGrow="1">
              <Heading fontSize="42px" pb="32px" color="white">
                {t('main.Become_a_Ranger_in_a_New_World!')}
              </Heading>
              <Box color="white">{t('main.Join_our_Discord')}</Box>
              <Stack direction="row" spacing={4} mt="64px !important">
                <Button leftIcon={<Image src="/images/socials/discord.svg" height="18px" />} variant="outline" height="42px" borderRadius="21px">
                  Join Discord
                </Button>
                <Button leftIcon={<Image src="/images/socials/telegram.svg" height="18px" />} variant="outline" height="42px" borderRadius="21px">
                  Join Telegram
                </Button>
              </Stack>
            </VStack>
            <Triad data={animals} />
          </Flex>
          <Flex className="what-is-wildalo" direction={'column'} alignItems="center">
            <Heading fontSize="42px" pb="32px" color="white">
              What is Wildalo?
            </Heading>
            <Image src="/images/pages/landing/what-is-wildalo.png" />
          </Flex>
        </Container>
      </section>
      <section className="home-roadmap">
        <Container maxW="container.xl">
          <VStack flexGrow="1">
            <Heading fontSize="42px" pb="32px" color="white">
              {t('main.Roadmap')}
            </Heading>
            <Carousel maxWidth="60%" margin="auto">
              {carousel.map((item, index) => (
                <CarouselItem key={index}>
                  <Heading fontSize="42px" pb="32px" color="white">
                    {t(item.title)}
                  </Heading>
                  <Box key={index} fontSize="14px" color="white" whiteSpace={'break-spaces'} textAlign="center">
                    {t(item.description)}
                  </Box>
                </CarouselItem>
              ))}
            </Carousel>
          </VStack>
        </Container>
      </section>
    </>
  );
};
