import { Button, Container, Heading, Input } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';

import { api, AuthorizationHeader, Response } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import './dashboard.page.scss';

export interface User {
  name: string;
}
export const DashboardPage = () => {
  const { t } = useTranslate();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response: Response<User | null> = await login();
      console.log(response);
      const { data } = response;
      setUser(data);
      // ...
    }

    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const login = async () => {
    const response = await api.post('/login', {
      'email': 'a@a.com',
      'password': '123456',
    });
    window.localStorage.setItem(AuthorizationHeader.AccessToken, response.data.data.accessToken);
    window.localStorage.setItem(AuthorizationHeader.RefreshToken, response.data.data.refreshToken);
    return response;
  };

  const admin = async () => {
    const response = await api.get('/admin');
    console.log(response);
  };

  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Container maxWidth="container.xl" className="dashboard-page">
        <div className="dashboard">
          <div className="dashboard__content">
            <div className="dashboard__content__title">
              <Heading as="h2" color="white" my="8">
                {t('Welcome to the dashboard')}
              </Heading>
            </div>
            <div className="dashboard__content__text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl
                euismod nunc. Pellentesque euismod, urna eu tincidunt consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl euismod nunc. Pellentesque euismod, urna eu
                tincidunt consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl euismod nunc. Pellentesque euismod, urna eu tincidunt consectetur, nisi lectus aliquet nunc,
                eget egestas nunc nisl euismod nunc. Pellentesque euismod, urna eu tincidunt consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl euismod nunc.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl euismod nunc. Pellentesque euismod, urna eu tincidunt
                consectetur, nisi lectus aliquet nunc, eget egestas nunc nisl euismod nunc.
              </p>
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
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
