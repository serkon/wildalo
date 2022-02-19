import { Menu, MenuButton, Button, HStack, Avatar, Stack, Box, MenuList, MenuDivider } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';

export const UserMenu = () => {
  const { t } = useTranslate();
  return (
    <>
      <Menu flip={true}>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
          _focus={{ 'boxShadow': '0 0 0 4px rgba(255, 255, 225, 0.1)' }}
          _hover={{ 'boxShadow': '0 0 0 4px rgba(255, 255, 225, 0.1)' }}>
          <HStack spacing="7" backgroundColor="#0B2F28" borderColor="rgba(255,255,255,0.3)" borderWidth="1px" borderStyle="solid" borderRadius="24px">
            <Avatar
              margin="4px"
              size={'sm'}
              src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
            />
            <Stack spacing="0" alignItems="end" paddingRight="21px" display={{ 'base': 'none', 'md': 'flex' }}>
              <Box color="white" fontSize="12px" marginBottom="0.5">
                ShowRanger
              </Box>
              <HStack spacing="1">
                <img src="/images/common/fodr.svg" />
                <Box color="white" fontSize="15px">
                  456.23
                </Box>
              </HStack>
            </Stack>
          </HStack>
        </MenuButton>
        <MenuList
          backgroundColor="#0B2F28"
          borderRadius="14px"
          border="1px solid rgba(255,255,255,0.2)"
          padding="20px 18px"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.4);"
          textAlign="center"
          zIndex={2}>
          <Stack marginTop="0" textAlign="left">
            <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
              {t('dashboard.FODR')}
            </Box>
            <HStack color="white" justifyContent="space-between" marginTop="14px!important" fontSize="13px" lineHeight="15px">
              <Box fontWeight="500">{t('common.FODR')}</Box>
              <Box fontWeight="400">1233</Box>
            </HStack>
            <HStack color="white" justifyContent="space-between" marginTop="14px" fontWeight="600" lineHeight="15px">
              <Box fontSize="13px">{t('common.TOTAL')}</Box>
              <Box fontSize="16px">42</Box>
            </HStack>
          </Stack>
          <Stack marginTop="23px" textAlign="left">
            <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
              {t('common.WARC')}
            </Box>
            <HStack color="white" justifyContent="space-between" marginTop="14px!important" fontSize="13px" lineHeight="15px">
              <Box fontWeight="500">{t('common.Claimable')}</Box>
              <Box fontWeight="400">0</Box>
            </HStack>
            <HStack color="white" justifyContent="space-between" marginTop="14px" fontWeight="600" lineHeight="15px">
              <Box fontSize="13px">{t('common.TOTAL')}</Box>
              <Box fontSize="16px">50</Box>
            </HStack>
          </Stack>
          <Button
            variant="ghost"
            colorScheme="white"
            border="1px solid #FFC633"
            borderRadius={'full'}
            size="sm"
            width={'min-content'}
            margin="auto!important"
            marginTop="29px !important"
            marginBottom="23px !important">
            {t('common.more_details')}
          </Button>
          <MenuDivider></MenuDivider>
          <Stack justifyContent={'center'} alignItems="center">
            <Avatar
              margin="4px"
              size={'lg'}
              src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
            />
            <HStack color="white">
              <Box fontSize={13} fontWeight={700}>
                Showranger
              </Box>
              <Box fontSize={11} fontWeight={700} backgroundColor="#615A48" padding="2px 4px" borderRadius="2px" boxShadow="0px 1px 0px #211F18;">
                {t('common.LEVEL')} 2
              </Box>
            </HStack>
            <Button variant="ghost" colorScheme="white" border="1px solid #FFC633" borderRadius={'full'} size="sm" width={'min-content'} marginTop="21px !important">
              {t('common.my_profile')}
            </Button>
          </Stack>
        </MenuList>
      </Menu>
      <HStack
        as={Button}
        variant="ghost"
        border="1px solid #FFC633"
        borderRadius="22px"
        height="42px"
        color="white"
        padding="0 15px"
        marginLeft="10px"
        display={{ 'base': 'none', 'lg': 'flex' }}>
        <Box fontSize="14px" fontWeight="700">
          {t('common.Fight')}
        </Box>
        <Box fontSize="11px" fontWeight="800" borderRadius="50%" bg="#FB3535" width="16px" height="16px" alignItems="center" justifyContent="center" display="flex">
          2
        </Box>
      </HStack>
    </>
  );
};
