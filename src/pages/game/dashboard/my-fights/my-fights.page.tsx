import { Heading, Flex, HStack, Text, Button, Box, Badge, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChartPie } from 'src/components/chart/pie/pie.component';
import { Fight } from 'src/components/fight/fight.component';
import { Fight as FightInterface } from 'src/utils/dto';

import { useTranslate } from 'src/components/translate/translate.component';
import { RootState } from 'src/store/store';
import { useDirection } from 'src/hooks';
import { LinkGame } from 'src/utils/links';
import { getFights } from 'src/pages/game/wah/wah.page';

export const MyFights = () => {
  const { t } = useTranslate();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const direction = useDirection();
  const ref = React.useRef<number>(0);

  useEffect(() => {
    async function fetchData() {
      await getFights();
    }

    if (store.metamask.status) {
      fetchData();
    }
  }, [store.metamask.status]);

  useEffect(() => {
    ref.current = Math.floor((store.fightsOverview.winScore * 100) / store.fightsOverview.totalScore ?? 1);
  }, [store.fightsOverview]);

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
              {store.fightsOverview.fights.length ?? 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      {store.fightsOverview.fights.length > 0 ? (
        store.fightsOverview.fights.map((_item: FightInterface, key: React.Key | null | undefined) => <Fight key={key} detail={_item} />)
      ) : (
        <Box opacity={0.6} width="56" textAlign={'center'} lineHeight={'25px'} mx="auto" marginTop="14" marginBottom="8" fontSize="18px">
          {t('dashboard.no_fights_found')}
        </Box>
      )}
      {/* TODO: Store'da adamın hiç herds'i yoksa disable et kontrolü ekle */}
      <Button variant={'primary'} mt="34px" disabled={!store.metamask.status || store.fightsOverview.fights.length >= 3} onClick={() => direction(LinkGame[1])}>
        {t('dashboard.start_new')}!
        <HStack position={'absolute'} right={'16px'} fontSize="12px" fontWeight={'bold'}>
          <Box>{t('dashboard.Remaining')}</Box>
          <Badge color="white" bg="black" borderRadius="50%" width="20px" height="20px" alignItems="center" justifyContent="center" display="flex">
            {3 - (store.fightsOverview.fights.length ?? 0)}
          </Badge>
        </HStack>
      </Button>
      {ref.current >= 0 && <ChartPie data={ref.current} description="Fight Win Rate" width="207px" height="207px" style={{ marginTop: '67px' }} />}
      <Stack alignItems={'center'}>
        <Box fontWeight={500} fontSize={'19px'} lineHeight="27px">
          {store.fightsOverview.winScore ?? 0} / {store.fightsOverview.totalScore ?? 1}
        </Box>
        <Box fontSize={'10px'} marginTop="-2px!important" lineHeight="14px" opacity={0.3}>
          {t('dashboard.Total_Fights')}
        </Box>
      </Stack>
    </div>
  );
};
