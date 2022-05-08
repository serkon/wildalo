import { Box, Button, Heading, Image } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';
import { useMediaQuery } from 'src/theme/util/media-query';
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
roadmap;

export const PageHome = () => {
  const { t } = useTranslate();
  const isLarge = useMediaQuery('md');
  isLarge;
  return (
    <>
      <Box backgroundImage="/images/pages/landing/hero-background.svg" className="home-hero">
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
      <Box className="home-become-ranger">.</Box>
    </>
  );
};
