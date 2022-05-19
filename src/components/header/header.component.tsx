import React from 'react';
import { Image, Box, Flex, HStack, IconButton, useDisclosure, Stack, Container, Link, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

import { useTranslate } from 'src/components/translate/translate.component';
import { UserMenu } from 'src/pages/user/user.menu';
import { LinkItem, LinksHeader } from 'src/utils/links';

const Links = ({ click }: React.PropsWithChildren<{ click?: any }>) => {
  click;
  const { t } = useTranslate();
  return (
    <React.Fragment>
      {LinksHeader.map((item: LinkItem, key: number) => {
        let properties = {};
        if (!item.external) {
          properties = { as: NavLink, to: item.to };
        }
        return (
          <Button
            {...properties}
            variant="header"
            key={key}
            justifyContent="flex-start"
            fontSize={{ base: '27px', md: '15px' }}
            color={{ base: 'white', md: '#87afa8' }}
            onClick={() => {
              click ? click() : false;
              item.external && window.open(item.to, '_blank');
            }}
          >
            {t(item.title)}
          </Button>
        );
      })}
    </React.Fragment>
  );
};

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container
        maxW="container.xxl"
        as="header"
        background={{ base: 'rgba(18, 70, 61, 0.9)', md: '#12463D' }}
        className="navigation-top"
        paddingX={0}
        position={{ base: 'fixed', md: 'static' }}
        minHeight={isOpen ? '100%' : '70px'}
        transition="all 0.2s ease-in-out"
        display="flex"
        flexDirection="column"
        zIndex="2"
      >
        <Flex
          height={70}
          width="full"
          alignItems={'center'}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          className="header-nav"
          paddingX={{ base: 4, md: '8' }}
          backgroundColor="#12463D"
        >
          <IconButton
            color="white"
            variant="ghost"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon w={6} h={6} />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            size="lg"
            height={'48px'}
            width={'48px'}
          />
          <HStack spacing={8} alignItems={'center'} flexGrow={{ base: '0', md: '1' }}>
            <Box>
              <Link as={NavLink} to={'/'}>
                <Image src={'/images/common/logo.svg'} objectFit="contain" maxW="170px" display={{ base: 'none', md: 'flex' }} />
                <Image src={'/images/common/logo-alone.svg'} objectFit="contain" maxW="170px" display={{ base: 'flex', md: 'none' }} />
              </Link>
            </Box>
          </HStack>
          <HStack as={'nav'} spacing={{ md: 0, lg: 8 }} alignItems={'flex-end'} display={{ base: 'none', md: 'flex' }} pr={{ base: 0, md: 8 }}>
            <Links />
          </HStack>
          <Flex alignItems={'center'} display={{ base: 'flex' }}>
            <UserMenu />
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ base: 'flex', md: 'none' }} flexGrow="1" flexDirection={'column'}>
            <Stack as={'nav'} justifyContent={'space-evenly'} flexGrow="1" alignItems={'center'}>
              <Links click={onClose} />
            </Stack>
          </Box>
        ) : null}
      </Container>
    </>
  );
}
