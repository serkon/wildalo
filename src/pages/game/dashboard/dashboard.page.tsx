import React from 'react';
import { AxiosResponse } from 'axios';
import { Button, Grid, GridItem, Input } from '@chakra-ui/react';

import { api, AuthorizationHeader, LoginResponse, HttpResponse } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Page } from 'src/components/page/page.component';
import { MyWildlings } from './my-wildling/my-wildling.component';
import { MyHerds } from './my-herds/my-herds.component';
import { MyFights } from './my-fights/my-fights.page';
import { MyProfile } from './my-profile/my-profile.component';
import './dashboard.page.scss';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/store/reducers/UserReducer';

export interface User {
  name: string;
}
export const PageDashboard = () => {
  const { t } = useTranslate();
  const [user] = React.useState<User | null>(null);
  const login = async () => {
    const response: AxiosResponse<HttpResponse<LoginResponse>> = await api.post('/login', {
      data: {
        email: 'john@doe.com',
        password: '1234567',
      },
    });

    window.localStorage.setItem(AuthorizationHeader.AccessToken, (response.data.data as LoginResponse).accessToken);
    window.localStorage.setItem(AuthorizationHeader.RefreshToken, (response.data.data as LoginResponse).refreshToken);

    return response;
  };
  const admin = async () => {
    const response = await api.post('/admin');

    console.log(response);
  };
  const dispatch = useDispatch();
  const update = () => {
    dispatch(updateUser({username: 'John'}));
  };

  return (
    <>
      <Button onClick={update}>update</Button>
      <Page title="Dashboard">
        <Grid templateRows="repeat(2, auto)" templateColumns="repeat(5, auto)" gap={5} color="white">
          <GridItem bg="#09241F" colSpan={2} p={8} borderRadius="14px">
            <MyWildlings />
          </GridItem>
          <GridItem bg="#09241F" colSpan={2} rowSpan={2} p={8} borderRadius="14px">
            <MyFights />
          </GridItem>
          <GridItem bg="#09241F" rowSpan={2} p={3} borderRadius="14px">
            <MyProfile />
          </GridItem>
          <GridItem bg="#09241F" colSpan={2} p={8} borderRadius="14px">
            <MyHerds />
          </GridItem>
        </Grid>
        <div>{t('main.dashboard')}</div>
        <p>{JSON.stringify(user)}</p>
        <Button onClick={login} paddingRight="2">
          login
        </Button>
        <Button onClick={admin} paddingRight="2">
          admin
        </Button>
        <Input placeholder="Username" paddingRight="2" name="username" />
        <Input placeholder="Email" paddingRight="2" name="email" />
        <Input placeholder="Password" paddingRight="2" name="email" />
        <Button onClick={admin} paddingRight="2">
          save
        </Button>
      </Page>
    </>
  );
};
