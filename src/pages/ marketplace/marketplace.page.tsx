import { Box, Button, Container, Flex, Heading, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { PlayableComponent } from 'src/components/playable/playable.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { RootState } from 'src/store/store';
import './marketplace.page.scss';

export const PageMarketplace = () => {
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const { t: translate } = useTranslate();

  return (
    <>
      <PlayableComponent />
      {store.layout.isPlayable && (
        <Container maxWidth="container.xl" className="page-container" marginBottom="120px">
          <Box
            pointerEvents={store.layout.isPlayable ? 'all' : 'none'}
            alignItems="flex-start"
            justifyContent={'flex-end'}
            color="white"
            width="100%"
            height={'100%'}
            display="flex"
            flexDirection={'column'}
            flexGrow="1"
            backgroundImage={`url(/images/pages/marketplace/header_backrground.svg)`}
            backgroundRepeat="no-repeat"
            backgroundPosition={'bottom'}
            minH="220px"
            mt="59px"
            mb="50px"
            padding={'24px 51px'}
            borderRadius="20px"
            boxShadow={'0px 0px 20px rgba(0, 0, 0, 0.4);'}
          >
            <Heading as="h1" size="lg" isTruncated fontSize="42px" lineHeight={'55px'} fontWeight="900" textShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}>
              {translate('marketplace.Wildalo_Marketplace')}
            </Heading>
            <Heading as="h2" size="md" isTruncated fontWeight="900" textShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}>
              {translate('marketplace.Add_more_Wildlings_to_Collection')}
            </Heading>
          </Box>
          <Box borderRadius="20px" display="flex" alignItems="flex-start" overflow="hidden" className="border-10">
            <Box
              color={'white'}
              gridRowGap="4px"
              display="flex"
              flexDirection="column"
              backgroundImage={`url(/images/pages/marketplace/wildlings_background.png)`}
              padding="20px 35px"
            >
              <Heading as="h3" size="md" fontSize="24px">
                1 Wildling
              </Heading>
              <Heading as="h3" size="md" color="#9ea1a2" fontSize="24px">
                PACK
              </Heading>
              <Box width={'380px'} pt="10px" pb="60px">
                Add new wildlings to your herd and increase your chances to win.
              </Box>
              <Button variant={'primary'} padding={'4px'} marginRight="auto" paddingLeft="38px" height="40px">
                <Box>Mint Wildling</Box>
                <Flex alignItems={'center'} backgroundColor="#1b1b1b" borderRadius={'17px'} padding="8px" paddingLeft={'12px'} marginLeft={'32px'}>
                  <Box color="white" fontWeight={'15px'} marginRight="7px">
                    0.10
                  </Box>
                  <Image src="/images/gems/FODR.svg" width="14px" height="14px" />
                </Flex>
              </Button>
            </Box>
            <Box flexGrow="1" w="100%">
              right
            </Box>
            <Box margin="20px" backgroundColor="#252525" padding="20px" borderRadius="14px">
              <Box fontSize="17px" color="white">
                Play to Earn! Free to Start!
              </Box>
              <Box marginTop="24px" fontSize="15px" color="white">
                But if you have little patience and you must have the strongest herd now, you can add FODR to your account immediately or trade cards on Kalao.
              </Box>
              <Box mt="52px">
                <Button variant={'outline'}>Buy FODR</Button>
                <Button variant={'ghost'} ml="22px">
                  Trade on Kalao
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
