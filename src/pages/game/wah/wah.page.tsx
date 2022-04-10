import { useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi } from 'src/hooks';
import './wah.page.scss';
import { AnimalCard } from 'src/components/animal/animal.component';

export const PageWildingAndHerds = () => {
  const { t } = useTranslate();
  const [data, _setData] = useState<any[]>([]);
  useApi({ url: 'my/animal/list' }, (data) => {
    _setData(data.data);
    console.log(data.data.length);
  });
  return (
    <Page title="Wildings & Herds">
      <Grid templateColumns="repeat(2, auto)" gap={4} color="white">
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={6} color="white">
            {data &&
              data.length > 0 &&
              data.map((item, key) => (
                <GridItem bg="red" borderRadius="14px" key={key}>
                  <AnimalCard data={item} className="animal-first ac" stats={true} />
                </GridItem>
              ))}
          </Grid>
        </GridItem>
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <Box className="herd-container">
            <h1>{t('common.dashboard')}</h1>
            <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={6} color="white">
              {data &&
                data.length > 0 &&
                data.map((item, key) => (
                  <GridItem borderRadius="14px" key={key} className="card-container">
                    <AnimalCard data={item} className="animal-first ac" stats={true} />
                  </GridItem>
                ))}
              <GridItem borderRadius="14px" className="card-container empty" />
              <GridItem borderRadius="14px" className="card-container empty" />
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Page>
  );
};
