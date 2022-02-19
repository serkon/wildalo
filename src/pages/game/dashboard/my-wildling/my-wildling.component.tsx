import { Heading, Flex, Button, HStack, Text } from '@chakra-ui/react';
import { Triad } from 'src/components/animal/triad/triad.component';
import { useTranslate } from 'src/components/translate/translate.component';

export const MyWildlings = () => {
  const { t } = useTranslate();

  return (
    <>
      <Flex justifyContent={'space-between'}>
        <Heading fontSize={'16px'}>{t('dashboard.my_wildlings')}</Heading>
        <HStack>
          <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
            {t('common.Total')}
          </Text>
          <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
            <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
              23
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Triad />
      <Flex justifyContent={'space-between'} pt="3">
        <Button variant="ghost" fontWeight="bold">
          {t('common.buy_more')}
        </Button>
        <Button variant="outline" fontWeight="bold">
          {t('common.see_all')}
        </Button>
      </Flex>
    </>
  );
};
