import { Menu, MenuButton, Button, HStack, Avatar, Stack, Box, MenuList, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HttpResponse } from 'src/components/axios/axios.component';
import { FightsOverview } from 'src/components/fight/fight.dto';
import { useTranslate } from 'src/components/translate/translate.component';
import { useApi } from 'src/hooks';
import { set_ranger } from 'src/store/reducers/RangerReducer';
import { Ranger } from './user.dto';

export const UserProfile = () => {
  const { t } = useTranslate();
  const store = useStore().getState();

  return (
    <>
      <Box padding="20px 18px 0 18px">
        <Stack marginTop="0" textAlign="left">
          <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
            {t('common.FODR')}
          </Box>
          <HStack color="white" justifyContent="space-between" marginTop="14px!important" fontSize="13px" lineHeight="15px">
            <Box fontWeight="500">{t('common.Claimable')}</Box>
            <Box fontWeight="400">{store.ranger.data && store.ranger.data.claimableFodrBalance}</Box>
          </HStack>
          <HStack color="white" justifyContent="space-between" marginTop="14px" fontWeight="600" lineHeight="15px">
            <Box fontSize="13px">{t('common.TOTAL')}</Box>
            <Box fontSize="16px">{Number(BigInt(store.metamask.fodrBalance)) / Math.pow(10, 12)}</Box>
          </HStack>
        </Stack>
        <Stack marginTop="23px" textAlign="left">
          <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
            {t('common.WARC')}
          </Box>
          <HStack color="white" justifyContent="space-between" marginTop="14px!important" fontSize="13px" lineHeight="15px">
            <Box fontWeight="500">{t('common.Claimable')}</Box>
            <Box fontWeight="400">{store.ranger.data && store.ranger.data.claimableWarcBalance}</Box>
          </HStack>
          <HStack color="white" justifyContent="space-between" marginTop="14px" fontWeight="600" lineHeight="15px">
            <Box fontSize="13px">{t('common.TOTAL')}</Box>
            <Box fontSize="16px">{Number(BigInt(store.metamask.warcBalance)) / Math.pow(10, 12)}</Box>
          </HStack>
        </Stack>
        <Button variant="outline" mt={'30px'} mb={'24px'}>
          {t('common.more_details')}
        </Button>
      </Box>
      <Divider />
      <Stack justifyContent={'center'} alignItems="center" padding="28px 18px 16px 18px">
        <Avatar margin="4px" size={'lg'} src={`${store.ranger.data && process.env.REACT_APP_PUBLIC_URL}/uploads/${store.ranger.data?.imageId}.jpeg`} />
        <HStack color="white">
          <Box fontSize={13} fontWeight={700}>
            {store.ranger.data && store.ranger.data.name}
          </Box>
          <Box fontSize={11} fontWeight={700} backgroundColor="#615A48" padding="2px 4px" borderRadius="2px" boxShadow="0px 1px 0px #211F18;">
            {t('common.LEVEL')} {store.ranger.data && store.ranger.data.level}
          </Box>
        </HStack>
        <Button variant="outline" mt={'20px !important'}>
          {t('common.my_profile')}
        </Button>
      </Stack>
    </>
  );
};

export const UserMenu = () => {
  const { t } = useTranslate();
  const store = useStore().getState();
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const startPlayHandler = () => {
    // window.location.reload();
    navigate('/game/dashboard');
  };
  const [state, setState] = useState<FightsOverview>({
    fights: [],
    winScore: 0,
    totalScore: 0,
    treshold: 0,
  });

  const reload = () => {
    window.location.reload();
  };

  useApi(
    { url: '/my/animal/fights' },
    (data: HttpResponse<FightsOverview>) => {
      setState(data.data);
      console.log(store);
    },
    store.metamask.status,
  );

  // const { _data, _isLoading, _isError } = useApi({ url: '/my/profile' }, (data: HttpResponse<Ranger>) => dispatch(set_ranger(data.data)), store.metamask.status);
  useApi(
    { url: '/my/info' },
    (data: HttpResponse<Ranger>) => {
      console.log(data);
      dispatch(set_ranger(data.data));
    },
    store.metamask.status,
  );

  return (
    <>
      {store.layout.play && store.metamask.status && store.ranger.data && (
        <>
          <Menu flip={true}>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
              _focus={{ boxShadow: '0 0 0 4px rgba(255, 255, 225, 0.1)' }}
              _hover={{ boxShadow: '0 0 0 4px rgba(255, 255, 225, 0.1)' }}>
              <HStack spacing="7" backgroundColor="#0B2F28" borderColor="rgba(255,255,255,0.3)" borderWidth="1px" borderStyle="solid" borderRadius="24px">
                <Avatar margin="4px" size={'sm'} src={`${store.ranger.data && process.env.REACT_APP_PUBLIC_URL}/uploads/${store.ranger.data?.imageId}.jpeg`} />
                <Stack spacing="0" alignItems="end" paddingRight="21px" display={{ base: 'none', md: 'flex' }}>
                  <Box color="white" fontSize="12px" marginBottom="0.5">
                    {store.ranger.data.username}
                  </Box>
                  <HStack spacing="1">
                    <img src="/images/common/fodr.svg" />
                    <Box color="white" fontSize="15px">
                      {store.ranger.data.claimableFodrBalance}
                    </Box>
                  </HStack>
                </Stack>
              </HStack>
            </MenuButton>
            <MenuList
              backgroundColor="#0B2F28"
              borderRadius="14px"
              border="1px solid rgba(255,255,255,0.2)"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.4);"
              textAlign="center"
              zIndex={2}>
              <UserProfile />
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
            display={{ base: 'none', lg: 'flex' }}>
            <Box fontSize="14px" fontWeight="700">
              {t('common.Fight')}
            </Box>
            <Box fontSize="11px" fontWeight="800" borderRadius="50%" bg="#FB3535" width="16px" height="16px" alignItems="center" justifyContent="center" display="flex">
              {state.fights.length}
            </Box>
          </HStack>
        </>
      )}
      {!store.layout.play && (
        <>
          <Button variant={'primary'} onClick={startPlayHandler}>
            {t('common.Start_Playing_Now')}
          </Button>
        </>
      )}
      {((store.layout.play && !store.ranger.data) || (store.layout.play && !store.metamask.status)) && (
        <>
          <Button variant={'primary'} onClick={reload}>
            {t('common.Connect')}
          </Button>
        </>
      )}
    </>
  );
};
