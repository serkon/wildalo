import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Box, IconButton, InputGroup, InputLeftElement, Input, InputRightElement, Button, HStack, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { AnimalCard } from 'src/components/animal/animal.component';
import { Animal } from 'src/components/animal/animal.dto';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi, useObservable } from 'src/hooks';
import { set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { RootState } from 'src/store/store';
import { Dragger } from 'src/utils/dragger';

export const WildlingsComponent = () => {
  const { t } = useTranslate();
  const refInput = useRef<HTMLInputElement>(null);
  const store = useSelector((state: RootState) => state);
  const { dispatch } = useStore();
  const [search, setSearch] = useState<any[]>([]);
  const onKeyPress = (item: any) => {
    subject.next(item.target.value);
  };
  const onClear = () => {
    setSearch(store.wildling.list);
    refInput.current!.value = '';
  };
  const filter = (value: string) => {
    const filtered = store.wildling.list.filter((item: Animal) => item.name.toLowerCase().includes(value.toLowerCase()));
    setSearch(filtered);
  };
  const { subject } = useObservable((value: string) => {
    filter(value);
  }, 400);

  useApi({ url: 'my/animal/list' }, async (data) => {
    console.log('my wilding data', data);
    dispatch(set_wildling_list(data.data));
  });

  useEffect(() => {
    filter(refInput.current!.value);
  }, [store.wildling.list]);
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
              {store.wildling.list.length ?? 0}
            </Text>
          </Flex>
        </HStack>
      </Flex>
      <Grid
        templateColumns="repeat(3, minmax(0, 1fr))"
        gap={6}
        color="white"
        drop-zone="wildlings"
        onDragOver={(e: any) => Dragger.onDragOver(e)}
        onDragEnter={(e: any) => Dragger.onDragEnter(e)}
        onDragLeave={(e: any) => Dragger.onDragLeave(e)}
        onDrop={(e: any) => {
          Dragger.onDrop(e, () => {
            const data = e.dataTransfer.getData('id');
            if (data) {
              const animal: Animal = JSON.parse(data);
              console.log('animal', animal);
            }
          });
        }}
        className="drag-over-wildlings">
        {search &&
          search.length > 0 &&
          search.map((item: Animal, key: number) => (
            <GridItem key={key}>
              <AnimalCard data={item} className="animal-first ac" stats={true} draggable drop-target="herds" />
            </GridItem>
          ))}
        <GridItem className="grid-card-container empty" alignItems={'center'} justifyContent={'center'} display="flex">
          <Button variant={'primary'}>{t('game.wah.Buy_more_Wildings')}</Button>
        </GridItem>
      </Grid>
    </>
  );
};
