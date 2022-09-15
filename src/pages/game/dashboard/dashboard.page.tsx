import { Grid, GridItem } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { MyWildlings } from './my-wildling/my-wildling.component';
import { MyHerds } from './my-herds/my-herds.component';
import { MyFights } from './my-fights/my-fights.page';
import { MyProfile } from './my-profile/my-profile.component';
import './dashboard.page.scss';

export interface User {
  name: string;
}
export const PageDashboard = () => (
  <>
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
    </Page>
  </>
);
