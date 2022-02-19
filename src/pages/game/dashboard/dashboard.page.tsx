import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Button, Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react';

import { api, AuthorizationHeader, LoginResponse, Response } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Page } from 'src/components/page/page.component';
import { MyWildlings } from './my-wildling/my-wildling.component';
import './dashboard.page.scss';

export interface User {
  name: string;
}
export const PageDashboard = () => {
  const { t } = useTranslate();
  const [user] = React.useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response: AxiosResponse<Response<LoginResponse>> = await login();
      console.log(response);
      const { data } = response;
      console.log(data);
      // setUser(data);
      // ...
    }

    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const login = async () => {
    const response: AxiosResponse<Response<LoginResponse>> = await api.post('/login', {
      'data': {
        'email': 'john@doe.com',
        'password': '1234567',
      },
    });
    window.localStorage.setItem(AuthorizationHeader.AccessToken, (response.data.data as LoginResponse).accessToken);
    window.localStorage.setItem(AuthorizationHeader.RefreshToken, (response.data.data as LoginResponse).refreshToken);
    return response;
  };

  const admin = async () => {
    const response = await api.get('/admin');
    console.log(response);
  };

  return (
    <>
      <Page title="Dashboard">
        <Grid templateRows="repeat(2, auto)" templateColumns="repeat(5, auto)" gap={5} color="white">
          <GridItem bg="#09241F" colSpan={2} p={8} borderRadius="14px">
            <MyWildlings />
          </GridItem>
          <GridItem bg="#09241F" colSpan={2} rowSpan={2} p={8} borderRadius="14px">
            <Heading color="white" fontSize={'16px'}>
              {t('dashboard.fight_overview')}
            </Heading>
            <Text mt={4}>2</Text>
          </GridItem>
          <GridItem bg="#09241F" rowSpan={2} p={8} borderRadius="14px">
            <Heading fontSize="xl">{t('dashboard.my_herds')}</Heading>
            <Text mt={4}>3</Text>
          </GridItem>
          <GridItem bg="#09241F" colSpan={2} p={8} borderRadius="14px">
            <Heading fontSize="xl">{t('dashboard.my_herds')}</Heading>
            <Text mt={4}>4</Text>
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
