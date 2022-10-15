import { Grid, GridItem } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { store } from 'src/store/store';
import { HttpResponse, api, Paging } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { set_herd_list, update_herd } from 'src/store/reducers/HerdReducer';
import { Contractor } from 'src/components/metamask/contractor';
import { Animal, FightsOverview, Herd } from 'src/utils/dto';
import { Page } from 'src/components/page/page.component';
import { HerdsComponent } from './herds.component';
import { WildlingsComponent } from './wildlings.component';
import socket from 'src/utils/socket';
import './wah.page.scss';
import { set_fights_overview } from 'src/store/reducers/FightReducer';

export const getWildingListApi = async () => {
  const animalListResponse: AxiosResponse<HttpResponse<Animal[]>> = await api.post('my/animal/list');
  const storeState: { list: Animal[]; paging: Paging } = {
    list: animalListResponse.data.data ? animalListResponse.data.data : [],
    paging: {
      current: animalListResponse.data.paging?.current as number,
      limit: animalListResponse.data.paging?.limit as number,
      total: animalListResponse.data.paging?.total as number,
    },
  };
  store.dispatch(set_wildling_list(storeState));
  return storeState;
};

export const getFightsApi = async () => {
  const response: AxiosResponse<HttpResponse<FightsOverview>> = await api.post('my/animal/fights');
  store.dispatch(set_fights_overview(response.data.data));
  return response.data.data;
};

export const getHerdListApi = async () => {
  const herdListResponse: AxiosResponse<HttpResponse<Herd[]>> = await api.post('my/herd/list');
  const storeState = {
    list: herdListResponse.data.data ? herdListResponse.data.data : [],
    paging: {
      current: herdListResponse.data.paging?.current as number,
      limit: herdListResponse.data.paging?.limit as number,
      total: herdListResponse.data.paging?.total as number,
    },
  };
  store.dispatch(set_herd_list(storeState));
  return storeState;
};

export const createFightApi = async (herd: Herd): Promise<Herd | null> => {
  try {
    const { headers } = await Contractor.header();
    // const { data } = await api.post('/fight/create', { data: { herd } }, { headers });
    const { data } = await api.post('/herd/enQueue', { data: { herd } }, { headers });
    herd && store.dispatch(update_herd(data.data));
    // getHerdListApi();
    /**
     * @TODO: socket emit sample - Aşağıdaki kodu silmeyi unutma
     * Kendi sunucumda (nodejs) components/socket altında bir 'matchmaking-demo' yaptım
     * Demoda fight create edildikten sonra belirli bir süre sonrasında herd'ün statusunu update etsin diye socket'i
     * trigger ediyorum. Bu sayede oradan bana status update edildi bilgisi geliyor 'update-herd-list' socket methodundan.
     *
     * // const { metamask } = store.getState();
     * // socket.emit('matchmaking-demo', { room: metamask.walletAddress, herd: herd._id });
     */
    const { metamask } = store.getState();
    socket.emit('matchmaking-demo', { room: metamask.walletAddress, herd: herd._id });
  } catch (e) {
    console.log('create fight error: ', e);
  }
  return herd;
};

export const cancelFightApi = async (herd: Herd): Promise<Herd | null> => {
  try {
    const { data } = await api.post('/fight/cancel', { data: { herd } });
    getHerdListApi();
    console.log('cancel fight: ', data);
  } catch (e) {
    console.log('cancel fight error: ', e);
  }
  return herd;
};

export const createHerdApi = async (): Promise<Herd | null> => {
  let herd: Herd | null = null;
  try {
    const { headers } = await Contractor.header();
    herd = await api.post('/herd/create', { headers });
    getHerdListApi();
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
    if (updateWildling) {
      getWildingListApi();
      getHerdListApi();
    }
  } catch (e) {
    console.log('update herd error: ', e);
  }
};

export const deleteHerdApi = async (herdId: string): Promise<void> => {
  try {
    const { headers } = await Contractor.header();
    await api.post('/herd/delete', { data: { id: herdId } }, { headers });
    getHerdListApi();
  } catch (e) {
    console.log('delete herd error: ', e);
  }
};

export const PageWildingAndHerds = () => {
  const { t } = useTranslate();
  t;

  return (
    <Page title="Wildings & Herds">
      <Grid templateColumns="minmax(0, 1fr) minmax(0, 0.72548fr)" gap={4} color="white">
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
