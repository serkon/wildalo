import { Heading, Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Hero } from './hero/hero.component';
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

export const PageHome = () => {
  const { t } = useTranslate();
  const isLarge = useMediaQuery('md');

  return (
    <>
      <Heading as="h3" size={isLarge ? 'lg' : 'sm'} variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Hero />
      <section className="one">
        <Container maxW="container.md" flexDirection="column" textAlign="center">
          <Heading as="h1" color="white">
            {t('main.section.one.header')}
          </Heading>
          <Text textAlign="center">{t('main.section.one.description')}</Text>
          <Link to="/faq" color="white">
            {t('main.section.one.link')}
          </Link>
        </Container>
      </section>
      <section className="second">
        <Container maxW="container.lg" display="flex" flexDirection="column" textAlign="right" alignItems="flex-end">
          <Heading as="h3" size="xl" variant="center" isTruncated className="title">
            {t('main.section.second.wild_animal_world')}
          </Heading>
          <div className="description">{t('main.section.second.description')}</div>
          <div className="stone" />
        </Container>
      </section>
      <section className="third">
        <Container maxW="container.lg" display="flex" flexDirection="column" textAlign="left" alignItems="flex-end">
          <Heading as="h3" size="xl" variant="center" isTruncated className="title">
            {t('main.section.third.roadmap')}
          </Heading>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={10} padding={{ base: 4, md: 0 }} width="100%">
            {roadmap.map((item, key) => (
              <GridItem key={key} className="prop">
                <Heading as="h3" size="xl" isTruncated className="quarter">
                  {item.title}
                </Heading>
                <ul>
                  {item.description.map((des: string, key: number) => (
                    <li key={key}>{des}</li>
                  ))}
                </ul>
              </GridItem>
            ))}
          </Grid>
          <div className="leaf" />
        </Container>
      </section>
    </>
  );
};
