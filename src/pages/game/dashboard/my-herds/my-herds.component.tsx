import { useEffect } from 'react';
import { Heading, Flex, Button, HStack, Text, Box, Image } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { HttpResponse, api } from 'src/components/axios/axios.component';
import { Herd, HerdStatus } from 'src/components/fight/fight.dto';
import { useTranslate } from 'src/components/translate/translate.component';
import './my-herds.component.scss';
import React from 'react';

const getHerds = async (): Promise<HttpResponse<Herd[]>> => {
  const response: AxiosResponse<HttpResponse<Herd[]>> = await api.get('/my/herd/list');
  return response.data;
};

export const MyHerds = () => {
  const { t } = useTranslate();
  const [herds, setHerds] = React.useState<Herd[] | null>(null);
  const [idle, setIdle] = React.useState(0);
  const [winner, setWinner] = React.useState<Herd | null>(null);

  useEffect(() => {
    async function fetchData() {
      let count = 0;
      const response = await getHerds();
      setHerds(response.data);

      const findWinner = response.data.reduce((previous: Herd, herd: Herd) => {
        if (herd.status === HerdStatus.IDLE) {
          setIdle(++count);
        }
        return previous.win > herd.win ? previous : herd;
      });
      setWinner(findWinner);
    }

    fetchData();
  }, []);

  return (
    <div className="my-herds">
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'16px'}>{t('dashboard.my_herds')}</Heading>
        <HStack spacing={8}>
          <HStack>
            <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
              {t('common.Idle')}
            </Text>
            <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
              <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
                {idle}
              </Text>
            </Flex>
          </HStack>
          <HStack>
            <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
              {t('common.Total')}
            </Text>
            <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
              <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
                {herds?.length || 0}
              </Text>
            </Flex>
          </HStack>
        </HStack>
      </Flex>
      <Box textAlign={'center'} py="44px" className="content">
        <Text color="rgba(255, 255, 255, 0.4)" fontSize={'15px'} lineHeight="18px" mb={2}>
          {t('dashboard.most_successfull')}
        </Text>
        <Text fontSize={'29px'} lineHeight="34px" mb={0.5}>
          {(winner && winner.name) || t('common.no_winner_herd')}
        </Text>
        <HStack justifyContent={'center'}>
          <Image src="/images/page/dashboard/trophy.svg"></Image>
          <Text fontSize={'46px'} lineHeight="54px">
            {winner ? winner.win : 0}
          </Text>
          <Text fontSize={'15px'} lineHeight="18px" color="rgba(255, 255, 255, 0.4)">
            {t('common.wins')}
          </Text>
        </HStack>
      </Box>
      <Flex justifyContent={'space-between'} pt="3">
        <Button variant="ghost" fontWeight="bold">
          {t('common.create_new')}
        </Button>
        <Button variant="outline" fontWeight="bold">
          {t('common.see_all')}
        </Button>
      </Flex>
    </div>
  );
};
