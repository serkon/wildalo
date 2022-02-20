import { Heading, Flex, HStack, Text, Button, Box, Badge } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { api } from 'src/components/axios/axios.component';
import { Fight } from 'src/components/fight/fight.component';
import { FightOverview } from 'src/components/fight/fight.dto';

import { useTranslate } from 'src/components/translate/translate.component';

const requestFightsOverview = async (): Promise<AxiosResponse<FightOverview>> => {
  const response = await api.get('/animal/my/overview');
  return response.data;
};

export const Overview = () => {
  const { t } = useTranslate();
  const [res, setResponse] = React.useState<FightOverview>();

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<FightOverview> = await requestFightsOverview();
      setResponse(response.data);
    }

    fetchData();
  }, []);

  return (
    <div className="my-herds">
      <Flex justifyContent={'space-between'} marginBottom={3}>
        <Heading fontSize={'16px'}>{t('dashboard.fight_overview')}</Heading>
        <HStack>
          <Text color="rgbae(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
            {t('common.Active')}
          </Text>
          <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
            <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px" color="#77D163">
              {res ? res.fights.length : 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      {res && res.fights.map((_item, key) => <Fight key={key} detail={_item} />)}
      <Button variant={'primary'} mt="12" disabled={res && res.fights.length >= 3}>
        {t('dashboard.start_new')}!
        <HStack position={'absolute'} right={'16px'} fontSize="12px" fontWeight={'bold'}>
          <Box>{t('dashboard.Remaining')}</Box>
          <Badge color="white" bg="black" borderRadius="50%" width="20px" height="20px" alignItems="center" justifyContent="center" display="flex">
            {3 - (res ? res.fights.length : 0)}
          </Badge>
        </HStack>
      </Button>
    </div>
  );
};
