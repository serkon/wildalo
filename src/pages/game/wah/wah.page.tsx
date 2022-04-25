import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './wah.page.scss';
import { WildlingsComponent } from './wildlings.component';
import { HerdsComponent } from './herds.component';
import { Dragger } from 'src/utils/dragger';

export const dragger = new Dragger('drop-zone');

export const PageWildingAndHerds = () => {
  const { t } = useTranslate();
  const [data, _setData] = useState<any[]>([]);
  data;
  t;

  return (
    <Page title="Wildings & Herds">
      <Grid templateColumns="minmax(0, 1fr) 500px" gap={4} color="white">
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <WildlingsComponent />
        </GridItem>
        {/* #### Herds #### */}
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <HerdsComponent />
        </GridItem>
      </Grid>
    </Page>
  );
};
