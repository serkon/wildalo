import { useRef, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, HStack, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';

import { Page } from 'src/components/page/page.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi, useObservable } from 'src/hooks';
import { AnimalCard } from 'src/components/animal/animal.component';
import './wah.page.scss';
import { CloseIcon } from '@chakra-ui/icons';

export const PageWildingAndHerds = () => {
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
    <Page title="Wildings & Herds">
      <Grid templateColumns="repeat(2, auto)" gap={4} color="white">
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <Flex alignItems={'center'} borderBottom={'1px solid #12463D'} pb={3} mb={5} className="filter-container">
            <Box justifyContent="center" display={'inline-flex'} flexDirection="column" className="filter" whiteSpace={'nowrap'}>
              <IconButton icon={<Image src="/images/pages/game/wah/filter.svg" />} variant="ghost" aria-label={''} height="auto" minWidth={'auto'} mb="1.5" />
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
                <GridItem bg="red" borderRadius="14px" key={key}>
                  <AnimalCard data={item} className="animal-first ac" stats="true" />
                </GridItem>
              ))}
          </Grid>
        </GridItem>
        <GridItem bg="#09241F" p={6} borderRadius="14px">
          <Box className="herd-container">
            <h1>{t('common.dashboard')}</h1>
            <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={6} color="white">
              {search &&
                search.length > 0 &&
                search.map((item, key) => (
                  <GridItem borderRadius="14px" key={key} className="card-container">
                    <AnimalCard data={item} className="animal-first ac" stats="true" />
                  </GridItem>
                ))}
              <GridItem borderRadius="14px" className="card-container empty" />
              <GridItem borderRadius="14px" className="card-container empty" />
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Page>
  );
};
