import React from 'react';
import { Image, Box, Flex, HStack, IconButton, useDisclosure, Stack, Container, Link } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

import { useTranslate } from 'src/components/translate/translate.component';
import { UserMenu } from 'src/pages/user/user.menu';

interface HeaderLink {
  title: string;
  to: string;
  external?: boolean;
}
const items: HeaderLink[] = [
  { title: 'links.home', to: '/' },
  { title: 'links.marketplace', to: 'faq' },
  { title: 'links.game', to: 'game' },
  { title: 'links.guide', to: 'guide' },
  { title: 'links.whitepaper', to: '/whitepaper.pdf', external: true },
];
const Links = () => {
  const { t } = useTranslate();

  return (
    <React.Fragment>
      {items.map((item: { title: string; to: string }, key: number) => (
        <Link as={NavLink} to={item.to} color="#87afa8" variant="header" key={key}>
          {t(item.title)}
        </Link>
      ))}
    </React.Fragment>
  );
};

export function Header(props: { logo: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="container.xxl" as="header" background="custom.header">
        <Flex height={70} width="full" alignItems={'center'} justifyContent={{ base: 'space-between', md: 'flex-end' }}>
          <IconButton
            color="white"
            variant="ghost"
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'} flexGrow={{ base: '0', md: '1' }}>
            <Box>
              <Image srcSet={props.logo} objectFit="contain" maxW="170px" />
            </Box>
          </HStack>
          <HStack as={'nav'} spacing={{ md: 6, lg: '44px' }} alignItems={'flex-end'} display={{ base: 'none', md: 'flex' }} padding={{ md: 6, lg: '44px' }}>
            <Links />
          </HStack>
          <Flex alignItems={'center'} display={{ base: 'flex' }}>
            <UserMenu />
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Links />
            </Stack>
          </Box>
        ) : null}
      </Container>
    </>
  );
}
