import { Grid, GridItem } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { store } from 'src/store/store';
import { HttpResponse, api } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { set_herd_list, update_herd } from 'src/store/reducers/HerdReducer';
import { Contractor } from 'src/components/metamask/contractor';
import { Animal, Herd } from 'src/utils/dto';
import { Page } from 'src/components/page/page.component';
import { HerdsComponent } from './herds.component';
import { WildlingsComponent } from './wildlings.component';
import './wah.page.scss';

export const getWildingListApi = async () => {
  const animalListResponse: AxiosResponse<HttpResponse<Animal[]>> = await api.post('my/animal/list');
  store.dispatch(set_wildling_list(animalListResponse.data.data ? animalListResponse.data.data : []));
};

export const getHerdListApi = async () => {
  const herdListResponse: AxiosResponse<HttpResponse<Herd[]>> = await api.post('my/herd/list');
  store.dispatch(set_herd_list(herdListResponse.data.data ? herdListResponse.data.data : []));
};

export const createHerdApi = async (): Promise<Herd | null> => {
  let herd: Herd | null = null;
  try {
    const { headers } = await Contractor.header();
    herd = await api.post('/herd/create', { headers });
  } catch (e) {
    console.log('create herd error: ', e);
  }
  return herd;
};

export const updateHerdApi = async (newHerd: Herd, updateWildling: boolean = true): Promise<void> => {
  try {
    const { headers } = await Contractor.header();
    await api.post('/herd/update', { data: newHerd }, { headers });
    store.dispatch(update_herd(newHerd));
    updateWildling && getWildingListApi() && getHerdListApi();
  } catch (e) {
    console.log('update herd error: ', e);
  }
};

export const deleteHerdApi = async (herdId: string): Promise<void> => {
  try {
    const { headers } = await Contractor.header();
    await api.post('/herd/delete', { data: { id: herdId } }, { headers });
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
