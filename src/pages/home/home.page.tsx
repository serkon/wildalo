import { Box, Button, Container, Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselItem } from 'src/components/carousel/carousel.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Triad } from 'src/components/triad/triad.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import { Animal, AnimalRarity, Region } from 'src/utils/dto';
import { LinkItem } from 'src/utils/links';

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

const carousel: { title: string; description: string; button: LinkItem }[] = [
  {
    title: 'main.carousel-01.title',
    description: 'main.carousel-01.description',
    button: { title: "Let's get started", to: '/game/dashboard' },
  },
  {
    title: 'main.carousel-02.title',
    description: 'main.carousel-02.description',
    button: { title: "Let's get started", to: '/game/wah' },
  },
  {
    title: 'main.carousel-03.title',
    description: 'main.carousel-03.description',
    button: { title: "Let's get started", to: '/signup' },
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
  const navigate = useNavigate();
  const direction = (item: LinkItem) => {
    item.external ? window.open(item.to, '_blank') : navigate(item.to);
  };
  const isLarge = useMediaQuery('md');
  // TODO remove:
  isLarge;

  return (
    <>
      <section className="home-hero">
        <Box backgroundImage="/images/pages/landing/hero-background.png" className="home-hero-content" padding={'24px'}>
          <Image src="/images/pages/landing/hero-logo.svg" alt="Wildalo" height="152px" pt="48px" />
          <Heading fontSize="5xl" textAlign={'center'} pb="48px" color="white">
            {t('main.slogan')}
          </Heading>
        </Box>
        <Box className="home-description" padding={'24px'}>
          <Heading width={{ base: '100%', md: '660px' }} fontSize="18px" textAlign={'center'} pb="55px" color="white">
            <div dangerouslySetInnerHTML={{ __html: t('main.subslogan') }} />
          </Heading>
          <Button variant={'primary'} className="play-now" height="44px" borderRadius="22px">
            {t('common.Play_Now')}
          </Button>
          <Box className="extensions" flexDirection={{ md: 'row' }}>
            <Image src="/images/pages/landing/home-avalange-logo.svg" alt="" />
            <Image src="/images/pages/landing/home-metamask-logo.svg" alt="" />
          </Box>
        </Box>
      </section>
      <section className="home-become-ranger">
        <Container maxW="container.xl">
          <Flex flexDirection={{ base: 'column-reverse', md: 'row' }}>
            <VStack alignItems={{ base: 'center', md: 'flex-start' }} flexGrow="1" justifyContent={'center'} alignContent="center" mt={{ base: '96px', md: '0' }}>
              <Heading fontSize="42px" pb="32px" color="white" textAlign={{ base: 'center', md: 'left' }}>
                {t('main.Become_a_Ranger_in_a_New_World!')}
              </Heading>
              <Box color="white" textAlign={{ base: 'center', md: 'left' }}>
                {t('main.Join_our_Discord')}
              </Box>
              <Stack direction="row" spacing={4} mt="64px !important">
                <Button leftIcon={<Image src="/images/socials/discord.svg" height="18px" />} variant="outline" height="42px" borderRadius="21px">
                  Join Discord
                </Button>
                <Button leftIcon={<Image src="/images/socials/telegram.svg" height="18px" />} variant="outline" height="42px" borderRadius="21px">
                  Join Telegram
                </Button>
              </Stack>
            </VStack>
            <Triad data={animals} style={{ transform: 'scale(0.8)' }} />
          </Flex>
          <Flex className="what-is-wildalo" direction={'column'} alignItems="center">
            <Heading fontSize="42px" pb="32px" color="white">
              What is Wildalo?
            </Heading>
            <Image src="/images/pages/landing/what-is-wildalo.png" />
          </Flex>
        </Container>
      </section>
      <section className="home-news-and-roadmap">
        <Container maxW="container.xl">
          <VStack flexGrow="1" width={{ base: '100%', md: '60%' }} margin="auto">
            <Heading fontSize="32px" pb="24px" color="white" fontWeight="light">
              {t('main.news')}
            </Heading>
            <Carousel maxWidth="100%" margin="auto" className="home-news">
              {carousel.map((item, index) => (
                <CarouselItem key={index}>
                  <Heading fontSize="42px" pb="32px" color="white">
                    {t(item.title)}
                  </Heading>
                  <Box key={index} fontSize="14px" color="white" whiteSpace={'break-spaces'} textAlign="center">
                    {t(item.description)}
                  </Box>
                  <Button onClick={() => direction(item.button)} variant={'outline'} my="8">
                    {t(item.button.title)}
                  </Button>
                </CarouselItem>
              ))}
            </Carousel>
          </VStack>
        </Container>
      </section>
    </>
  );
};
