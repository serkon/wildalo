import { Box, Button, Container, Flex, Grid, GridItem, Heading, Image, ListItem, Stack, UnorderedList, VStack } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Carousel, CarouselItem } from 'src/components/carousel/carousel.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Triad } from 'src/components/triad/triad.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import { Animal, AnimalRarity, Region } from 'src/utils/dto';
import { getLink, LinkItem, LinkSocials } from 'src/utils/links';

import './home.page.scss';

const roadmap = [
  {
    title: '<span>Q2</span>-2022',
    description: ['TGE & Community Building', 'Herd Fights Begin'],
  },
  {
    title: '<span>Q3</span>-2022',
    description: ['New Fall Wildlings', 'Ranger Leaderboard & Tournaments', 'NFT sales in Wildalo Marketplace'],
  },
  {
    title: '<span>Q4</span>-2022',
    description: ['New Winter Wildlings', 'Wildalo Homesteads'],
  },
  {
    title: '<span>H1</span>-2023',
    description: ['New Spring Wildlings', 'Consumables', 'Ranger Guilds'],
  },
];

const carousel: { title: string; description: string; button: LinkItem }[] = [
  {
    title: 'main.carousel-01.title',
    description: 'main.carousel-01.description',
    button: { title: 'main.carousel-01.label', to: 'https://medium.com/@wildalogame/introducing-wildalo-a-sustainable-play-and-earn-web3-game-c726e672e7ef', external: true },
  },
  {
    title: 'main.carousel-02.title',
    description: 'main.carousel-02.description',
    button: { title: 'main.carousel-02.label', to: 'https://spintop.network/gamepedia/games/wildalo#overview', external: true },
  },
  {
    title: 'main.carousel-03.title',
    description: 'main.carousel-03.description',
    button: { title: 'main.carousel-03.label', to: 'https://wildalo.gitbook.io/whitepaper', external: true },
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

export const PageHome = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const direction = (item: LinkItem) => {
    item.external ? window.open(item.to, '_blank') : navigate(item.to);
  };
  const isLarge = useMediaQuery('lg');

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
          <Button as={NavLink} to={'game/dashboard'} variant={'primary'} className="play-now" height="44px" borderRadius="22px">
            {t('common.Play_Now')}
          </Button>
          <Box className="extensions" flexDirection={{ md: 'row' }}>
            <Button variant="link" onClick={() => window.open('https://polygon.technology/', '_blank')}>
              <Image src="/images/pages/landing/home-polygon-logo.svg" alt="" />
            </Button>
            <Button variant="link" onClick={() => window.open('https://metamask.io/', '_blank')}>
              <Image src="/images/pages/landing/home-metamask-logo.svg" alt="" />
            </Button>
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
              <Flex direction="row" mt="64px !important" columnGap={2} rowGap={2} flexWrap="wrap" justifyContent={'center'}>
                <Button
                  leftIcon={<Image src="/images/socials/discord.svg" height="18px" />}
                  variant="outline"
                  height="42px"
                  borderRadius="21px"
                  onClick={() => direction(getLink(LinkSocials, 'social.discord') as LinkItem)}
                >
                  {t('main.Join_Discord')}
                </Button>
                <Button
                  leftIcon={<Image src="/images/socials/telegram.svg" height="18px" />}
                  variant="outline"
                  height="42px"
                  borderRadius="21px"
                  onClick={() => direction(getLink(LinkSocials, 'social.telegram') as LinkItem)}
                >
                  {t('main.Join_Telegram')}
                </Button>
                <Button
                  leftIcon={<Image src="/images/socials/twitter.svg" height="18px" />}
                  variant="outline"
                  height="42px"
                  borderRadius="21px"
                  onClick={() => direction(getLink(LinkSocials, 'social.twitter') as LinkItem)}
                >
                  {t('main.Follow_Us')}
                </Button>
              </Flex>
            </VStack>
            <Triad data={animals} style={{ transform: isLarge ? 'scale(1)' : 'scale(0.7)' }} />
          </Flex>
          <Flex className="what-is-wildalo" direction={'column'} alignItems="center">
            <Heading fontSize="42px" pb="32px" color="white" textAlign={'center'}>
              {t('main.What_is_Wildalo')}
            </Heading>
            <Box className="image-container" maxW="60%">
              <Image src="/images/pages/landing/what-is-wildalo.png" />
            </Box>
          </Flex>
        </Container>
      </section>
      <section className="home-news-and-roadmap">
        <Container maxW="container.xl">
          <VStack className="home-news" flexGrow="1" width={{ base: '100%', md: '60%' }} margin="auto">
            <Heading fontSize="32px" pb="24px" color="white" fontWeight="light">
              {t('main.news')}
            </Heading>
            <Carousel maxWidth="100%" margin="auto" className="home-news-carousel">
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
          <Stack className="home-roadmap" mt="360px">
            <Heading fontSize="32px" pb="24px" color="white" fontWeight="light" textAlign={'center'}>
              {t('main.roadmap')}
            </Heading>
            <Stack className="home-roadmap-list" overflow={{ base: 'none', md: 'auto' }}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={10} padding={{ base: 0, md: 4 }} width="100%" mb="32px" pb="32px">
                {roadmap.map((item, key) => (
                  <GridItem
                    key={key}
                    className="home-roadmap-list-item"
                    width="100%"
                    minWidth="274px"
                    height="294px"
                    padding="24px"
                    borderRadius="20px"
                    backgroundColor="#09241F"
                    color="white"
                  >
                    <Heading as="h3" size="xl" mb="32px" isTruncated className="quarter" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <UnorderedList lineHeight={'32px'}>
                      {item.description.map((des: string, key: number) => (
                        <ListItem key={key}>{des}</ListItem>
                      ))}
                    </UnorderedList>
                  </GridItem>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </section>
      <Box className="home-who-we-are" pt={{ base: '135px', md: '248px' }} pb={{ base: '290px', md: '512px' }}>
        <Container maxW="container.xl">
          <VStack className="home-who-we-are-content" flexGrow="1" width={{ base: '100%', md: '85%' }} margin="auto">
            <Heading fontSize="32px" pb="24px" color="white" fontWeight="light">
              {t('main.who_we_are')}
            </Heading>
            <Box
              backgroundColor={'#09241F'}
              width="100%"
              borderRadius="20px"
              px={{ base: '32px', md: '150px' }}
              py={{ base: '32px', md: '90px' }}
              color="white"
              textAlign={'center'}
              alignItems="center"
            >
              <Box className="home-who-we-are-content-text" dangerouslySetInnerHTML={{ __html: t('main.who_we_are_description') }} />
              <Image src="/images/common/logo.svg" marginX="auto" mt="64px !important" />
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};
