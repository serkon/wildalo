import { Box, Popover, PopoverTrigger, PopoverContent, PopoverHeader, Image, Text, PopoverArrow, PopoverCloseButton, PopoverBody, Flex } from '@chakra-ui/react';
import { Herd, BonusItem } from 'src/utils/dto';
import { useTranslate } from 'src/components/translate/translate.component';
import './herd-bonus.component.scss';

interface HerdBonusProps {
  herd: Herd;
}

export const HerdBonus = ({ herd }: HerdBonusProps) => {
  const { t } = useTranslate();
  return (
    <Box className="herd-bonus">
      {herd.bonuses &&
        herd.bonuses.map((item: any, key: number) => (
          <Box key={key} className="bonus-container">
            {/* TODO get bonus name */}
            <Popover placement="bottom" closeOnBlur={false} trigger="hover" arrowShadowColor={'rgba(255,255,255, 0.1)'} arrowSize={16}>
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
                  {t(`bonus.${item.type}`)}
                </Box>
              </PopoverTrigger>
              <PopoverContent
                color="white"
                borderRadius="14px"
                bg="#09241F"
                border="1px solid rgba(255, 255, 255, 0.1) !important"
                p="12px 18px"
                boxShadow={' 0px 0px 10px rgba(0, 0, 0, 0.4) !important'}
                marginTop="8px"
              >
                <PopoverHeader p={0} fontWeight="bold" border="0" fontSize={'12px'} lineHeight="20px" mb="9px">
                  {t(`bonus.${item.type}`)}
                </PopoverHeader>
                <PopoverArrow backgroundColor={'#09241F'} />
                <PopoverCloseButton />
                <PopoverBody padding={0}>
                  <Box fontSize={'12px'} lineHeight="20px" mb="24px">
                    {t(`bonus.${item.type}_DESCRIPTION`)}
                  </Box>
                  {item.list &&
                    item.list.map((bonusItem: BonusItem, bonusKey: number) => (
                      <Flex
                        key={bonusKey}
                        className="bonus-item"
                        justifyContent={'space-between'}
                        alignItems="center"
                        borderBottom={`1px solid ${item.list.length - 1 === bonusKey ? 'trasparent' : '#12463D'}`}
                        mb={item.list.length - 1 === bonusKey ? '0' : '16px'}
                        pb={item.list.length - 1 === bonusKey ? '0' : '16px'}
                      >
                        <Box>
                          <Flex direction={'column'}>
                            <Box fontSize={'14px'} fontWeight="bolder">
                              +{bonusItem.animalCount}
                            </Box>
                            <Box color="#87AFA8" lineHeight={'13px'} fontSize="11px" fontWeight={'400'}>
                              {t('common.Card')}
                            </Box>
                          </Flex>
                        </Box>
                        <Box flexGrow={1} ml="12px">
                          <Image src={`/images/regions/${bonusItem.region}.svg`} height="26px" />
                        </Box>
                        <Box>
                          <Flex direction={'column'}>
                            <Box fontSize="11px" color={'#87AFA8'}>
                              {t(`stats.${bonusItem.type}`)}
                            </Box>
                            <Flex alignItems={'center'} justifyContent="flex-end">
                              <Image src={`/images/stats/${bonusItem.type}.svg`} />
                              <Text fontWeight={'bold'} fontSize="12px">
                                {bonusItem.value}%
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                    ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        ))}
    </Box>
  );
};
