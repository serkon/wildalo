import { Image, Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Stack, Container } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from 'src/components/translate/translate.component';
import React from 'react';
const items = [
  { 'title': 'links.home', 'to': '/' },
  { 'title': 'links.how_to_play', 'to': 'faq' },
  { 'title': 'links.whitepaper', 'to': 'whitepaper' },
];

const Links = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {items.map((item: { title: string; to: string }, key: number) => (
        <Button color="white" variant="ghost" onClick={() => navigate(item.to)} key={key}>
          {t(item.title)}
        </Button>
      ))}
    </React.Fragment>
  );
};
export function Header(props: { logo: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="container.xl" as="header" background="custom.header">
        <Flex height={90} width="full" alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            color="white"
            variant="ghost"
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ 'md': 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image srcSet={props.logo} objectFit="contain" maxW="170px" />
            </Box>
          </HStack>
          <HStack as={'nav'} spacing={8} display={{ 'base': 'none', 'md': 'flex' }}>
            <Links />
          </HStack>
          <Flex alignItems={'center'} display={{ 'base': 'flex', 'md': 'none' }}>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ 'md': 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Links />
            </Stack>
          </Box>
        ) : null}
      </Container>
    </>
  );
}
