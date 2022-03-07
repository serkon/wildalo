import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Avatar, Box, Link, Flex, Divider, HStack, Heading, Button, Image } from '@chakra-ui/react';

import { api, HttpResponse } from 'src/components/axios/axios.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Ranger } from 'src/pages/user/user.dto';
import './my-profile.component.scss';

export const MyProfile = () => {
  const [ranger, setRanger] = React.useState<Ranger | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response: AxiosResponse<HttpResponse<Ranger>> = await api.post('/my/profile');
      const { data } = response;
      setRanger(data.data);
    }

    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const { t } = useTranslate();

  return (
    <>
      {ranger && (
        <>
          <Flex justifyContent={'center'} alignItems="center" padding="16px 18px" direction={'column'} position="relative">
            <Avatar margin="0" width="128px" height={'128px'} src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${ranger?.imageId}.jpeg`} />
            <Box fontSize={16} fontWeight={700} mt={8}>
              {ranger?.username}
            </Box>
            <Link as={NavLink} to={'user/profile'} variant="header" fontWeight="400" fontSize={'13px'} lineHeight="100%">
              {t('common.Edit_Profile')}
            </Link>
          </Flex>
          <Divider borderBottomWidth={'1px'} borderColor="rgba(42, 89, 80, 0.6);" my="16px" />
          <Box px={4} py={7}>
            <Heading fontSize={'16px'}>{t('dashboard.Balance_Summary')}</Heading>
            <Flex direction={'column'} marginTop="24px" textAlign="left" fontWeight="400">
              <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
                {t('common.FODR')}
              </Box>
              <HStack color="white" marginTop="20px" alignItems={'baseline'} lineHeight="normal">
                <Box fontSize="13px" flexGrow={1}>
                  {t('common.TOTAL')}
                </Box>
                <Image src="/images/gems/FODR.svg" width="32px" />
                <Box fontSize="48px">42</Box>
              </HStack>
              <HStack color="white" justifyContent="space-between" marginTop="14px">
                <Box fontSize="14px" flexGrow={1}>
                  {t('common.Claimable')}
                </Box>
                <Box fontSize="14px" lineHeight="16px">
                  {ranger.claimableFodrBalance}
                </Box>
                <Button variant={'ghost'} paddingRight="0">
                  {t('common.claim')}
                </Button>
              </HStack>
            </Flex>
            <Divider marginTop="24px" borderBottomWidth={'1px'} borderColor="rgba(42, 89, 80, 0.6);" />
            <Flex direction={'column'} marginTop="24px" textAlign="left" fontWeight="400">
              <Box color="rgba(255,255,255,0.4)" fontSize="20px" fontWeight="500" lineHeight="23px">
                {t('common.WARC')}
              </Box>
              <HStack color="white" marginTop="20px" alignItems={'baseline'} lineHeight="normal">
                <Box fontSize="13px" flexGrow={1}>
                  {t('common.TOTAL')}
                </Box>
                <Image src="/images/gems/WARC.svg" width="32px" />
                <Box fontSize="48px">50</Box>
              </HStack>
              <HStack color="white" justifyContent="space-between" marginTop="14px">
                <Box fontSize="14px" flexGrow={1}>
                  {t('common.Claimable')}
                </Box>
                <Box fontSize="14px" lineHeight="16px">
                  {ranger.claimableWarcBalance}
                </Box>
                <Button variant={'ghost'} paddingRight="0">
                  {t('common.claim')}
                </Button>
              </HStack>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
};
