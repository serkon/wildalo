import { Box, Button, Container, Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartDonut } from 'src/components/chart/donut/donut.component';
import { Wildapter } from 'src/components/metamask/adaptor';
import { PlayableComponent } from 'src/components/playable/playable.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { RootState } from 'src/store/store';
import './marketplace.page.scss';

export const PageMarketplace = () => {
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const { t: translate } = useTranslate();
  const [price, setPrice] = useState(0);
  const buyPackage = () => {
    Wildapter.buyPackage('1', '1', price.toString());
  };

  useEffect(() => {
    const mint = async () => {
      const price = await Wildapter.getPackagePrice('1', '1');
      setPrice(Number(price));
    };

    mint();
  }, []);

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
          <Box borderRadius="20px" display="flex" alignItems="strech" overflow="hidden" className="border-10">
            <Box
              color={'white'}
              gridRowGap="4px"
              display="flex"
              flexDirection="column"
              backgroundImage={`url(/images/pages/marketplace/wildlings_background.png)`}
              padding="20px 35px"
            >
              <Heading as="h3" size="md" fontSize="24px">
                1 {translate('marketplace.Wildling')}
              </Heading>
              <Heading as="h3" size="md" color="#9ea1a2" fontSize="24px">
                {translate('marketplace.PACK')}
              </Heading>
              <Box width={'380px'} pt="10px" pb="60px">
                {translate('marketplace.Add_new_wildlings')}
              </Box>
              <Button variant={'primary'} padding={'4px'} marginRight="auto" paddingLeft="38px" height="40px" onClick={() => buyPackage()}>
                <Box>{translate('marketplace.Mint_Wildling')}</Box>
                <Flex alignItems={'center'} backgroundColor="#1b1b1b" borderRadius={'17px'} padding="8px" paddingLeft={'12px'} marginLeft={'32px'}>
                  <Box color="white" fontWeight={'15px'} marginRight="7px">
                    {price / Math.pow(10, 12)}
                  </Box>
                  <Image src="/images/gems/FODR.svg" width="14px" height="14px" />
                </Flex>
              </Button>
            </Box>
            <Box flexGrow="1" alignItems="stretch" w="100%">
              <ChartDonut margin={40} stroke={18} />
            </Box>
            <Box margin="20px" backgroundColor="#252525" padding="20px" borderRadius="14px">
              <Box fontSize="17px" color="white">
                {translate('marketplace.Play_Start')}
              </Box>
              <Box marginTop="24px" fontSize="15px" color="white">
                {translate('marketplace.But_if_you_have')}
              </Box>
              <Box mt="52px">
                <Button variant={'outline'}>{translate('marketplace.Buy_FODR')}</Button>
                <Button variant={'ghost'} ml="22px">
                  {translate('marketplace.Trade_on_Kalao')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
