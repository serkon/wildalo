import React, { useEffect } from 'react';
import { Heading, Flex, Button, HStack, Text, Box } from '@chakra-ui/react';

import { api, HttpResponse } from 'src/components/axios/axios.component';
import { Triad } from 'src/components/triad/triad.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Animal } from 'src/components/animal/animal.dto';
import { AxiosResponse } from 'axios';

const getAnimals = async(): Promise<HttpResponse<Animal[]>> => {
  const response: AxiosResponse<HttpResponse<Animal[]>> = await api.post('/my/animal/list', {
    paging: {
      current: 0,
      limit: 3,
    },
  });

  return response.data;
};

export const MyWildlings = () => {
  const { t } = useTranslate();
  const [animals, setAnimals] = React.useState<HttpResponse<Animal[]> | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAnimals();
      setAnimals(response);
    }

    fetchData();
  }, []);

  return (
    <>
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'16px'} alignItems="center" display={'flex'}>
          {t('dashboard.my_wildlings')}
        </Heading>
        <HStack>
          <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
            {t('common.Total')}
          </Text>
          <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
            <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
              {(animals?.paging && animals?.paging?.total) || 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Triad data={animals?.data} />
      {animals && animals.data.length > 0 ? (
        <Flex justifyContent={'space-between'} pt="3">
          <Button variant="ghost" fontWeight="bold">
            {t('common.buy_more')}
          </Button>
          <Button variant="outline" fontWeight="bold">
            {t('common.see_all')}
          </Button>
        </Flex>
      ) : (
        <Box textAlign={'center'}>
          <Button variant="primary" width={'70%'} margin="auto">
            {t('dashboard.Buy_wildings')}
          </Button>
        </Box>
      )}
    </>
  );
};
