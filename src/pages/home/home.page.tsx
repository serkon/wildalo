import { Heading, Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Hero } from './hero/hero.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './home.page.scss';
import { useMQReal } from 'src/theme/util/media-query';

const roadmap = [
  {
    'title': 'Q2',
    'description': ['TGE & Community Building', 'Herd Fights Begin'],
  },
  {
    'title': 'Q3',
    'description': ['New Fall Wildlings', 'Ranger Leaderboard & Tournaments', 'NFT sales in Wildalo Marketplace'],
  },
  {
    'title': 'Q4',
    'description': ['New Winter Wildlings', 'Wildalo Homesteads'],
  },
  {
    'title': 'H1’23',
    'description': ['New Spring Wildlings', 'Consumables', 'Ranger Guilds'],
  },
];

export const HomePage = () => {
  const { t } = useTranslate();
  const isLarge = useMQReal('md');

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
            Wild Animal World
          </Heading>
          <div className="description">
            Wildalo is a wild world filled with amazing animals also known as wildlings . Wildalo players, aka Rangers, collect these wildlings to grow them (upgrade their levels),
            form herds with them and fight their herds with other herds to earn in game currency.
          </div>
          <div className="stone"></div>
        </Container>
      </section>
      <section className="third">
        <Container maxW="container.lg" display="flex" flexDirection="column" textAlign="left" alignItems="flex-end">
          <Heading as="h3" size="xl" variant="center" isTruncated className="title">
            Do Good!
          </Heading>
          <Grid templateColumns={{ 'base': 'repeat(1, 1fr)', 'md': 'repeat(4, 1fr)' }} gap={10} padding={{ 'base': 4, 'md': 0 }} width="100%">
            {roadmap.map((item, key) => (
              <GridItem key={key} className="prop">
                <Heading as="h3" size="xl" isTruncated className="quarter">
                  {item.title}
                </Heading>
                <ul>
                  {item.description.map((des: string, key: number) => (
                    <li key={key}>{des}d</li>
                  ))}
                </ul>
              </GridItem>
            ))}
          </Grid>
          <div className="leaf"></div>
        </Container>
      </section>
    </>
  );
};
