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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { createRef, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { AnimalCard } from 'src/components/animal/animal.component';
import { Animal } from 'src/components/animal/animal.dto';
import { api, HttpResponse } from 'src/components/axios/axios.component';
import { Herd } from 'src/components/fight/fight.dto';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi } from 'src/hooks';
import { delete_wildling, set_wildling_list } from 'src/store/reducers/WildlingReducer';
import { Dragger } from 'src/utils/dragger';

export const HerdsComponent = () => {
  const { t } = useTranslate();
  // const store = useStore().getState();
  // const _store = useSelector((state: RootState) => state);
  const { dispatch } = useStore();
  const [data, setData] = useState<Herd[] | null>([]);
  const herdNameInputRef = useRef([]);
  const updateHerdName = (herd: Herd, ref: React.RefObject<HTMLInputElement>) => {
    // TODO update herd name
    console.log(herd._id, ref.current?.value);
  };
  const focusInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };
  const directToFight = () => {
    // TODO navigate to fight
    console.log('direct to fight');
  };
  const getHerdAnimalByPosition = (herd: Herd, position: number): Animal | null => {
    // TODO get herd animal by position
    const item: { position: number; animal: Animal } | undefined = herd.animals && herd.animals.find((item) => item.position === position);
    return (item && item.animal) || null;
  };
  const updateWildingOnAnimalDrag = async () => {
    const wildlingsResponse: AxiosResponse<HttpResponse<Animal[]>> = await api.post('my/animal/list');
    dispatch(set_wildling_list(wildlingsResponse.data.data));
  };
  const updateHerdOnAnimalDrag = async (newHerd: Herd, animal: Animal): Promise<void> => {
    try {
      await api.post('/herd/update', { data: newHerd });
      setData(
        () =>
          data &&
          data.map((item) => {
            if (item._id === newHerd._id) {
              return newHerd;
            }
            return item;
          }),
      );
      dispatch(delete_wildling(animal));
      updateWildingOnAnimalDrag();
    } catch (e) {
      console.log(e);
    }
  };

  useApi({ url: 'my/herd/list' }, (data) => {
    setData(data.data);
    herdNameInputRef.current = data.data.map((_item: Herd, key: number) => herdNameInputRef.current[key] ?? createRef());
  });

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems="center" mb={4}>
        <Button leftIcon={<Image src="/images/pages/game/wah/add.svg" />} variant="outline" pl="4px">
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
        {data &&
          data.length > 0 &&
          data.map((herd: Herd, key) => (
            <AccordionItem key={key} className="accordion-herd-item" style={key > 0 ? { marginTop: '20px' } : {}}>
              {(state: { isExpanded: boolean; isDisabled: boolean }) => (
                <>
                  <Box className="accordion-title">
                    <Flex className="accordion-title-parent" ml="-8px" pt="8px" pb={state.isExpanded ? 0 : '8px'}>
                      <AccordionButton w={8} justifyContent="center" className="accordion-opener" shadow={'none'} boxShadow="none">
                        <AccordionIcon />
                      </AccordionButton>
                      <InputGroup width={'auto'}>
                        <label className="input-sizer" data-value={herd.name}>
                          <Input
                            type="text"
                            defaultValue={herd.name}
                            ref={herdNameInputRef.current[key]}
                            onChange={() => updateHerdName(herd, herdNameInputRef.current[key])}
                            onInput={() => ((herdNameInputRef.current[key] as any).current.parentNode.dataset.value = (herdNameInputRef.current[key] as any).current.value)}
                            htmlSize={1}
                            p="0"
                            focusBorderColor="none"
                            className="herd-name-input"
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
                      <Box fontSize={11} fontWeight={700} backgroundColor="#615A48" padding="2px 4px" ml="auto" mr="4" borderRadius="2px">
                        {t('common.LEVEL')} {herd.level}
                      </Box>
                      <Box mr="4">{herd.animals?.length || 0} / 4</Box>
                      <Button className="get-into-fight" mr="4" variant={'primary'} disabled={herd.animals?.length != 4} onClick={directToFight} boxShadow="none">
                        {t('game.wah.Get_into_a_Fight')}
                      </Button>
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
                                    _hover={{ backgroundColor: '#0B2F28' }}>
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
                        <Button size="xs" ml="auto" leftIcon={<Image src="/images/pages/game/wah/trash.svg" />} variant="ghosy" fontSize={'12px'} color={'#FF937B'}>
                          {t('game.wah.Delete_herd')}
                        </Button>
                      </Flex>
                    )}
                  </Box>
                  <AccordionPanel p={0} className="accordion-herd-item-content">
                    <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={6} color="white">
                      {Array.from({ length: 4 }, (_, i) => i).map((_animal: number, key: number) => {
                        const animal = getHerdAnimalByPosition(herd, key);
                        return (
                          <GridItem
                            drop-zone="herds"
                            onDragOver={(e: any) => Dragger.onDragOver(e)}
                            onDragEnter={(e: any) => Dragger.onDragEnter(e)}
                            onDragLeave={(e: any) => Dragger.onDragLeave(e)}
                            onDragEnd={(e: any) => e.preventDefault()}
                            onDrop={(e: any) => {
                              Dragger.onDrop(e, () => {
                                const data = e.dataTransfer.getData('id');
                                if (data) {
                                  const animal: Animal = JSON.parse(data);
                                  const newHerd = { ...herd };
                                  newHerd.animals = newHerd.animals ? [...newHerd.animals] : [];
                                  newHerd.animals[key] = { position: key, animal };
                                  updateHerdOnAnimalDrag(newHerd, animal);
                                }
                              });
                            }}
                            key={key}
                            className={`drop-zone grid-item ${animal ? 'grid-item-filled' : 'grid-item-empty'}`}
                            alignItems="center"
                            justifyContent={'center'}
                            display="flex"
                            textAlign={'center'}>
                            {animal ? (
                              <AnimalCard data={animal} stats={true} draggable drop-target="wildlings" />
                            ) : (
                              <Text fontSize={12} maxW="150px">
                                {t('game.wah.Drag')}
                              </Text>
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
