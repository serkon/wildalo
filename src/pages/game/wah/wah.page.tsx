import { Grid, GridItem } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './wah.page.scss';
import { WildlingsComponent } from './wildlings.component';
import { HerdsComponent } from './herds.component';
import { AxiosResponse } from 'axios';
import { HttpResponse, api } from 'src/components/axios/axios.component';
import { Animal, Herd } from 'src/utils/dto';
import { set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { store } from 'src/store/store';
import { set_herd_list, update_herd } from 'src/store/reducers/HerdReducer';

export const getWildingListApi = async () => {
  const animalListResponse: AxiosResponse<HttpResponse<Animal[]>> = await api.post('my/animal/list');
  store.dispatch(set_wildling_list(animalListResponse.data.data ? animalListResponse.data.data : []));
};

export const getHerdListApi = async () => {
  const herdListResponse: AxiosResponse<HttpResponse<Herd[]>> = await api.post('my/herd/list');
  store.dispatch(set_herd_list(herdListResponse.data.data ? herdListResponse.data.data : []));
};

export const updateHerdApi = async (newHerd: Herd, updateWildling: boolean = true): Promise<void> => {
  try {
    await api.post('/herd/update', { data: newHerd });
    store.dispatch(update_herd(newHerd));
    updateWildling && getWildingListApi() && getHerdListApi();
  } catch (e) {
    console.log('update herd error: ', e);
  }
};

export const createHerdApi = async (): Promise<Herd | null> => {
  let herd: Herd | null = null;
  try {
    herd = await api.post('/herd/create');
  } catch (e) {
    console.log('create herd error: ', e);
  }
  return herd;
};

export const deleteHerdApi = async (herdId: string): Promise<void> => {
  try {
    await api.post('/herd/delete', { data: { id: herdId } });
  } catch (e) {
    console.log('delete herd error: ', e);
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
