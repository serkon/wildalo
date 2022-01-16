import { Heading, Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Hero } from './hero/hero.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './home.page.scss';

const roadmap = [
  {
    'title': 'Q1',
    'description': 'Development & Community building, TGE',
  },
  {
    'title': 'Q2',
    'description': 'Herd Fights begin',
  },
  {
    'title': 'Q3',
    'description': 'Fall Wildlings Editions (+X new wildlings), League/Tournament',
  },
  {
    'title': 'Q4',
    'description': 'Winter Wildlings Editions (+Y new wildlings), Wildalo Homesteads',
  },
];

export const HomePage = () => {
  const { t } = useTranslate();

  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
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
          <Grid templateColumns="repeat(4, 1fr)" gap={10} width="100%">
            {roadmap.map((item, key) => (
              <GridItem key={key} className="prop">
                <Heading as="h3" size="xl" h="20" isTruncated className="title">
                  {item.title}
                </Heading>
                <p>{item.description}</p>
              </GridItem>
            ))}
          </Grid>
          <div className="leaf"></div>
        </Container>
      </section>
    </>
  );
};
