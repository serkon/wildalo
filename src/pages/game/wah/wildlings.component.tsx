import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Box, IconButton, InputGroup, InputLeftElement, Input, InputRightElement, Button, HStack, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AnimalCard } from 'src/components/animal/animal.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { useObservable, useApi } from 'src/hooks';

export const WildlingsComponent = () => {
  const { t } = useTranslate();
  const refInput = useRef<HTMLInputElement>(null);
  const [data, _setData] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const onKeyPress = (item: any) => {
    subject.next(item.target.value);
  };
  const onClear = () => {
    setSearch(data);
    refInput.current!.value = '';
  };
  const { subject } = useObservable((value) => {
    const filtered = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setSearch(filtered);
  }, 400);

  useApi({ url: 'my/animal/list' }, (data) => {
    _setData(data.data);
    setSearch(data.data);
  });

  return (
    <>
      <Flex alignItems={'center'} borderBottom={'1px solid #12463D'} pb={3} mb={5} className="filter-container">
        <Box justifyContent="center" display={'inline-flex'} flexDirection="column" className="filter" whiteSpace={'nowrap'} alignItems="center">
          <IconButton icon={<Image src="/images/pages/game/wah/filter.svg" />} variant="ghost" aria-label={''} height="auto" minWidth={0} m="auto" mb="1.5" />
          <Box fontSize={'11px'}>{t('game.wah.Filter_&_Sorting')}</Box>
        </Box>
        <InputGroup ml={12} mr={12} className="search">
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<Image src="/images/pages/game/wah/search.svg" />}
          />
          <Input placeholder="Search by name, homestead" border="none" bg="#0B2D26" onInput={onKeyPress} _placeholder={{ opacity: 1, color: 'white.500' }} ref={refInput} />
          {refInput.current?.value && (
            <InputRightElement
              // eslint-disable-next-line react/no-children-prop
              children={
                <Button onClick={onClear} variant="ghost" color="white" opacity={0.5}>
                  <CloseIcon w={2} h={2} />
                </Button>
              }
            />
          )}
        </InputGroup>
        <HStack>
          <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
            {t('common.Total')}
          </Text>
          <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
            <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
              {data.length ?? 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={6} color="white">
        {search &&
          search.length > 0 &&
          search.map((item, key) => (
            <GridItem key={key}>
              <AnimalCard data={item} className="animal-first ac" stats="true" />
            </GridItem>
          ))}
        <GridItem className="grid-card-container empty" alignItems={'center'} justifyContent={'center'} display="flex">
          <Button variant={'primary'}>{t('game.wah.Buy_more_Wildings')}</Button>
        </GridItem>
      </Grid>
    </>
  );
};
