import { Heading, Flex, HStack, Text, Button, Box, Badge, Stack } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { api } from 'src/components/axios/axios.component';
import { ChartPie } from 'src/components/chart/pie/pie.component';
import { Fight } from 'src/components/fight/fight.component';
import { FightsOverview } from 'src/components/fight/fight.dto';

import { useTranslate } from 'src/components/translate/translate.component';

const requestFightsOverview = async (): Promise<AxiosResponse<FightsOverview>> => {
  const response = await api.post('/my/animal/fights');

  return response.data;
};

export const MyFights = () => {
  const { t } = useTranslate();
  const [res, setResponse] = React.useState<FightsOverview>();
  const getFodr = () => {
    window.wildapter.checkMetamask();
    window.wildapter.checkPermissionToAccessAccounts();
    window.wildapter.sign();
    window.wildapter.checkConnection();
    window.wildapter.getSelectedChainId();
    window.wildapter.getSelectedAddress();
    window.wildapter.upgradeCard();
    window.wildapter.createAuction();
  };

  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<FightsOverview> = await requestFightsOverview();

      setResponse(response.data);
    }

    fetchData();
  }, []);

  return (
    <div className="my-herds">
      <Flex justifyContent={'space-between'} marginBottom={3}>
        <Heading fontSize={'16px'} alignItems="center" display={'flex'}>
          {t('dashboard.fight_overview')}
        </Heading>
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
      {res && res.fights.length > 0 ? (
        res.fights.map((_item, key) => <Fight key={key} detail={_item} />)
      ) : (
        <Box opacity={0.6} width="56" textAlign={'center'} lineHeight={'25px'} mx="auto" marginTop="14" marginBottom="8" fontSize="18px">
          {t('dashboard.no_fights_found')}
        </Box>
      )}
      {/* TODO: Store'da adamın hiç herds'i yoksa disable et kontrolü ekle */}
      <Button variant={'primary'} mt="34px" disabled={res && res.fights.length >= 3} onClick={getFodr}>
        {t('dashboard.start_new')}!
        <HStack position={'absolute'} right={'16px'} fontSize="12px" fontWeight={'bold'}>
          <Box>{t('dashboard.Remaining')}</Box>
          <Badge color="white" bg="black" borderRadius="50%" width="20px" height="20px" alignItems="center" justifyContent="center" display="flex">
            {3 - (res ? res.fights.length : 0)}
          </Badge>
        </HStack>
      </Button>
      <ChartPie data={res ? (res?.winScore * 100) / res?.totalScore : 0} description="Fight Win Rate" width="207px" height="207px" style={{ marginTop: '67px' }} />
      <Stack alignItems={'center'}>
        <Box fontWeight={500} fontSize={'19px'} lineHeight="27px">
          {res?.winScore} / {res?.totalScore}
        </Box>
        <Box fontSize={'10px'} marginTop="-2px!important" lineHeight="14px" opacity={0.3}>
          {t('dashboard.Total_Fights')}
        </Box>
      </Stack>
    </div>
  );
};
