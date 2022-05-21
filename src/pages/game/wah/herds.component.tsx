import {
  Flex,
  Box,
  IconButton,
  Button,
  HStack,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react';
import { createRef, useEffect, useRef } from 'react';
import { useSelector, useStore } from 'react-redux';
import { AnimalCard } from 'src/components/animal/animal.component';
import { Animal, Herd, HerdState } from 'src/utils/dto';
import { Timer } from 'src/components/timer/timer.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi, useObservable } from 'src/hooks';
import { set_herd_list } from 'src/store/reducers/HerdReducer';
import { RootState } from 'src/store/store';
import { Dragger } from 'src/utils/dragger';
import { createHerdApi, updateHerdApi, deleteHerdApi, getHerdListApi, getWildingListApi } from './wah.page';

export const HerdsComponent = () => {
  const { t } = useTranslate();
  // const store = useStore().getState();
  const store = useSelector((state: RootState) => state);
  const { dispatch } = useStore();
  const herdNameInputRef = useRef([]);
  // Update Herd Name Listener: Look updateHerdName method
  const { subject } = useObservable(({ herd, ref }) => {
    updateHerdApi(herd, false);
    (ref.current as HTMLInputElement).disabled = true;
  }, 1000);
  const updateHerdName = (herd: Herd, ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current?.value) {
      herd.name = ref.current?.value;
      subject.next({ herd, ref });
    }
  };
  const focusInput = (ref: React.RefObject<HTMLInputElement>) => {
    (ref.current as HTMLInputElement).disabled = false;
    ref.current?.focus();
  };
  const directToFight = () => {
    // TODO navigate to fight
    console.log('direct to fight');
  };
  const getHerdAnimalByPosition = (herd: Herd, position: number): { position: number; animal: Animal } | null => {
    const item: { position: number; animal: Animal } | undefined = herd.animals && herd.animals.find((item) => item.position === position);
    return item || null;
  };
  const createNewHerd = async () => {
    console.log('Create new herd');
    await createHerdApi();
    getHerdListApi();
  };
  const deleteHerd = async (herd: Herd) => {
    console.log('Delete Herd: ', herd);
    await deleteHerdApi(herd._id);
    getHerdListApi();
    getWildingListApi();
  };

  useEffect(() => {
    herdNameInputRef.current = store.herd.list.map((_item: Herd, key: number) => herdNameInputRef.current[key] ?? createRef());
  }, [store.herd.list]);

  useApi({ url: 'my/herd/list' }, (data) => {
    dispatch(set_herd_list(data.data));
  });

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems="center" mb={4}>
        <Button leftIcon={<Image src="/images/pages/game/wah/add.svg" />} variant="outline" pl="4px" onClick={() => createNewHerd()}>
          {t('game.wah.Create_Herd')}
        </Button>
        <HStack spacing={8}>
          <VStack>
            <IconButton icon={<Image src="/images/pages/game/wah/info.svg" />} aria-label={'information'} variant="ghost" minW={0} height="24px" />
            <Text fontSize={'11px'} mt="6px !important">
              Tips!
            </Text>
          </VStack>
          <HStack>
            <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
              {t('common.Idle')}
            </Text>
            <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
              <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
                {11}
              </Text>
            </Flex>
          </HStack>
          <HStack>
            <Text color="rgba(255, 255, 255, 0.4)" fontSize={16} fontWeight={'500'}>
              {t('common.Total')}
            </Text>
            <Flex alignItems={'center'} justifyContent={'center'} width="44px" height="44px" borderRadius="50%" border="1px solid #2A5950" backgroundColor="#0B2F28">
              <Text fontWeight={'bold'} fontSize="24px" lineHeight="28px" marginLeft="-1px" letterSpacing="-1px">
                {0}
              </Text>
            </Flex>
          </HStack>
        </HStack>
      </Flex>
      <Accordion defaultIndex={[0]} allowToggle className="accordion-herd-list">
        {store.herd.list &&
          store.herd.list.length > 0 &&
          store.herd.list.map((herd: Herd, key) => (
            <AccordionItem key={key} className="accordion-herd-item" style={key > 0 ? { marginTop: '20px' } : {}}>
              {(state: { isExpanded: boolean; isDisabled: boolean }) => (
                <>
                  <Box className="accordion-title">
                    <Flex className="accordion-title-parent" ml="-8px" pt="8px" pb={state.isExpanded ? 0 : '8px'}>
                      <AccordionButton w={8} justifyContent="center" className="accordion-opener" shadow={'none'} boxShadow="none">
                        <AccordionIcon />
                      </AccordionButton>
                      <Tooltip label={herd.name} fontSize="md">
                        <InputGroup width={'auto'}>
                          <label className="input-sizer" data-value={herd.name}>
                            <Input
                              type="text"
                              defaultValue={herd.name}
                              ref={herdNameInputRef.current[key]}
                              onBlur={() => ((herdNameInputRef.current[key] as any).current.disabled = true)}
                              onChange={() => updateHerdName(herd, herdNameInputRef.current[key])}
                              onInput={() => ((herdNameInputRef.current[key] as any).current.parentNode.dataset.value = (herdNameInputRef.current[key] as any).current.value)}
                              htmlSize={1}
                              p="0"
                              focusBorderColor="none"
                              className={`herd-name-input`}
                              disabled
                            />
                          </label>
                          <InputRightElement>
                            <IconButton
                              aria-label="Edit Herd Name"
                              icon={<Image src="/images/pages/game/wah/edit.svg" />}
                              onClick={() => focusInput(herdNameInputRef.current[key])}
                              variant="ghost"
                              className="edit-herd-name-button"
                            />
                          </InputRightElement>
                        </InputGroup>
                      </Tooltip>
                      <Box fontSize={11} fontWeight={700} backgroundColor="#615A48" padding="2px 4px" ml="auto" mr="4" borderRadius="2px">
                        {t('common.LEVEL')} {herd.level}
                      </Box>
                      <Box mr="4">{herd.animals?.length || 0} / 4</Box>
                      {herd.state === HerdState.IDLE && (
                        <Button size="md" className="get-into-fight" mr="4" variant={'primary'} disabled={herd.animals?.length !== 4} onClick={directToFight} boxShadow="none">
                          {t('game.wah.Get_into_a_Fight')}
                        </Button>
                      )}
                      {herd.state === HerdState.FIGHTING && (
                        <>
                          <Button
                            isLoading
                            loadingText={t('game.wah.Matchmaking')}
                            className="get-into-fight"
                            mr="4"
                            variant={'ghost'}
                            color="rgba(255, 255, 255, 0.5)"
                            disabled
                            boxShadow="none"
                            p="0"
                            size="xs"
                          >
                            {t('game.wah.Matchmaking')}
                          </Button>
                          <Timer diff={212312123} />
                        </>
                      )}
                      {herd.state === HerdState.DEAD && (
                        <Button className="get-into-fight" mr="4" variant={'outline'} boxShadow="none">
                          {t('game.wah.Match_Result')}
                        </Button>
                      )}
                    </Flex>
                    {state.isExpanded && (
                      <Flex className="accordion-title-sub" justifyContent={'space-beetwen'} mt="6px" mb="12px">
                        {herd.bonus &&
                          herd.bonus.map((item: any, key: number) => (
                            <Box key={key}>
                              {/* TODO get bonus name */}
                              <Popover placement="bottom" closeOnBlur={false} trigger="hover">
                                <PopoverTrigger>
                                  <Box
                                    fontSize={11}
                                    fontWeight={700}
                                    lineHeight="13px"
                                    color="#73AEA4"
                                    backgroundColor="#09241F"
                                    border="1px solid #73AEA4"
                                    padding={'2px'}
                                    px="12px"
                                    borderRadius={'2px'}
                                    cursor="pointer"
                                    _hover={{ backgroundColor: '#0B2F28' }}
                                  >
                                    {item.type}
                                  </Box>
                                </PopoverTrigger>
                                <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                                    Manage Your Channels
                                  </PopoverHeader>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverBody>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</PopoverBody>
                                  <PopoverFooter border="0" d="flex" alignItems="center" justifyContent="space-between" pb={4}>
                                    <Box fontSize="sm">Step 2 of 4</Box>
                                    <ButtonGroup size="sm">
                                      <Button colorScheme="green">Setup Email</Button>
                                      <Button colorScheme="blue">Next</Button>
                                    </ButtonGroup>
                                  </PopoverFooter>
                                </PopoverContent>
                              </Popover>
                            </Box>
                          ))}
                        <Button
                          size="xs"
                          ml="auto"
                          leftIcon={<Image src="/images/pages/game/wah/trash.svg" />}
                          variant="ghosy"
                          fontSize={'12px'}
                          color={'#FF937B'}
                          onClick={() => deleteHerd(herd)}
                        >
                          {t('game.wah.Delete_herd')}
                        </Button>
                      </Flex>
                    )}
                  </Box>
                  <AccordionPanel p={0} className="accordion-herd-item-content">
                    <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={6} color="white">
                      {Array.from({ length: 4 }, (_, i) => i).map((_animal: number, key: number) => {
                        const item: { position: number; animal: Animal } | null = getHerdAnimalByPosition(herd, key);
                        return (
                          <GridItem
                            drop-zone="herds"
                            onDragOver={(e: any) => Dragger.onDragOver(e)}
                            onDragEnter={(e: any) => Dragger.onDragEnter(e)}
                            onDragLeave={(e: any) => Dragger.onDragLeave(e)}
                            onDrop={(e: any) => {
                              Dragger.onDrop(e, () => {
                                const data = e.dataTransfer.getData('id');
                                if (data) {
                                  const animal: Animal = JSON.parse(data);
                                  const newHerd = { ...herd };
                                  newHerd.animals = newHerd.animals ? [...newHerd.animals] : [];
                                  const getIndex = newHerd.animals.findIndex((item: any) => item.position === key);
                                  getIndex >= 0 && newHerd.animals.splice(getIndex, 1);
                                  newHerd.animals.push({ position: key, animal });
                                  updateHerdApi(newHerd);
                                }
                              });
                            }}
                            key={key}
                            className={`drop-zone grid-item ${item && item.animal ? 'grid-item-filled' : 'grid-item-empty'}`}
                            alignItems="center"
                            justifyContent={'center'}
                            display="flex"
                            textAlign={'center'}
                          >
                            {item?.animal ? (
                              <AnimalCard
                                data={item?.animal}
                                stats={true}
                                draggable
                                drop-target="wildlings"
                                onDragStart={(event: any) => Dragger.onDragStart(event, { item, herd, key })}
                                onDragEnd={(event: any) =>
                                  Dragger.onDragEnd(event, { item, herd, key }, () => {
                                    // const newHerd = { ...herd };
                                    // newHerd.animals = newHerd.animals ? [...newHerd.animals] : [];
                                    // const getIndex = newHerd.animals.findIndex((item: any) => item.position === key);
                                    // newHerd.animals.splice(getIndex, 1);
                                    // console.log(item.position, key, getIndex, herd);
                                    // updateHerdOnAnimalDrag(newHerd, item?.animal);
                                  })
                                }
                              />
                            ) : (
                              <>
                                <Box position={'absolute'} left="20px" top="20px" className="number">
                                  #{key + 1}
                                </Box>
                                <Text fontSize={12} maxW="150px">
                                  {t('game.wah.Drag')}
                                </Text>
                              </>
                            )}
                          </GridItem>
                        );
                      })}
                    </Grid>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
};
