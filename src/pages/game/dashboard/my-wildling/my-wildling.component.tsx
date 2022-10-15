import { useEffect } from 'react';
import { Heading, Flex, Button, HStack, Text, Box } from '@chakra-ui/react';

import { Triad } from 'src/components/triad/triad.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';
import { LinkGame, LinksHeader } from 'src/utils/links';
import { useDirection } from 'src/hooks';
import { getWildingListApi } from 'src/pages/game/wah/wah.page';

export const MyWildlings = () => {
  const { t } = useTranslate();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const direction = useDirection();

  useEffect(() => {
    async function fetch() {
      await getWildingListApi();
    }

    fetch();
  }, [store.metamask.status]);

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
              {store.wildling.paging.total ?? 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Triad data={store.wildling.list} />
      {store.wildling.list.length > 0 ? (
        <Flex justifyContent={'space-between'} pt="3">
          <Button variant="ghost" fontWeight="bold" onClick={() => direction(LinksHeader[4])}>
            {t('common.buy_more')}
          </Button>
          <Button variant="outline" fontWeight="bold" onClick={() => direction(LinkGame[1])}>
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
