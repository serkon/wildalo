import { Grid, GridItem } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './wah.page.scss';
import { WildlingsComponent } from './wildlings.component';
import { HerdsComponent } from './herds.component';
import { AxiosResponse } from 'axios';
import { Animal } from 'src/components/animal/animal.dto';
import { HttpResponse, api } from 'src/components/axios/axios.component';
import { Herd } from 'src/components/fight/fight.dto';
import { set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { store } from 'src/store/store';
import { update_herd } from 'src/store/reducers/HerdReducer';

export const updateWildingOnAnimalDrag = async () => {
  const wildlingsResponse: AxiosResponse<HttpResponse<Animal[]>> = await api.post('my/animal/list');
  store.dispatch(set_wildling_list(wildlingsResponse.data.data));
};

export const updateHerdOnAnimalDrag = async (newHerd: Herd): Promise<void> => {
  try {
    await api.post('/herd/update', { data: newHerd });
    store.dispatch(update_herd(newHerd));
    updateWildingOnAnimalDrag();
  } catch (e) {
    console.log(e);
  }
};

export const PageWildingAndHerds = () => {
  const { t } = useTranslate();
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
