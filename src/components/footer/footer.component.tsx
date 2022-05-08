import { Container, Center, Text, Image, Flex, Button, Box, Heading, Stack, Tooltip, Link } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';

import './footer.component.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { LinksFooter, LinkSocials, LinksTerms } from 'src/utils/links';

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
  logo?: string;
  children?: JSX.Element | string;
  className?: string;
}

interface FooterLink {
  title: string;
  to: string;
  external?: boolean;
}

export const Footer = (props: Props): JSX.Element => {
  const socialLink = (d: string) => ({
    WebkitMaskImage: `url(/images/socials/${t(d)}.svg)`,
    maskImage: `url(/images/socials/${t(d)}.svg)`,
  });
  const { t } = useTranslate();
  const navigate = useNavigate();
  const direction = (item: FooterLink) => {
    item.external ? window.open(item.to, '_blank') : navigate(item.to);
  };

  return (
    <>
      <Center as="footer" className={props.className}>
        <Container maxW="container.xl" className="footer-container">
          <Flex
            my="40px"
            pb="40px"
            alignItems="center"
            flexDirection={{ base: 'column', md: 'row' }}
            className="footer-logo"
            justifyContent={'space-between'}
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
          >
            <Link as={NavLink} to={'/'}>
              <Image srcSet={props.logo} objectFit="contain" maxW={{ base: '50%', md: '170px' }} opacity="0.4" />
            </Link>
            <Box flexDirection={'row'} display="flex">
              <Text fontSize={'22px'} display={{ base: 'none', md: 'flex' }} mr="60px">
                Ready to get started?
              </Text>
              <Button variant={'white'}>Start Winning!</Button>
            </Box>
          </Flex>
          <Flex className="links">
            {LinksFooter.map((item: { name: string; links: { title: string; to: string }[] }, key: number) => (
              <Flex key={key} flexDirection="column" fontFamily={'roboto'} className="footer-link-column">
                <Heading as="h6" size="md" variant={'footerLinkTitle'} mb="20px">
                  {t(`footer.${item.name}`)}
                </Heading>
                {item.links.map((link: { title: string; to: string }, key: number) => (
                  <Button variant="green" onClick={() => direction(link)} key={key} justifyContent="flex-start" mb="20px">
                    {t(link.title)}
                  </Button>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex className="footer-terms-and-socials">
            {LinksTerms.map((link: { title: string; to: string }, key: number) => (
              <Button variant="footer" onClick={() => direction(link)} key={key} justifyContent="flex-start" mr="80px">
                {t(link.title)}
              </Button>
            ))}
            <Stack className="socials" mt={[32, 0]} justifyContent={{ base: 'space-between', md: 'end' }} width={{ base: 'auto', md: 'auto' }}>
              {LinkSocials.map((social: { title: string; to: string }, key: number) => (
                <Tooltip label={t(social.title)} aria-label="A tooltip" key={key}>
                  <a href={`${social.to}`} target="_blank" style={socialLink(social.title)} className="social" color="white" rel="noreferrer" />
                </Tooltip>
              ))}
            </Stack>
          </Flex>
          {/**
          <Flex width="full" alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <Image srcSet={props.logo} objectFit="contain" maxW={{ base: '50%', md: '170px' }} />
            <Box className="link-container" ml={[0, 124]} mt={[10, 0]}>
              {items.map((item: { title: string; to: string }, key: number) => (
                <Button color="white" variant="link" onClick={() => direction(item)} key={key} justifyContent="flex-start">
                  {t(item.title)}
                </Button>
              ))}
            </Box>
            <Stack className="socials" mt={[16, 0]} justifyContent={{ base: 'space-between', md: 'end' }} width={{ base: '100%', md: 'auto' }}>
              {socials.map((social: { title: string; to: string }, key: number) => (
                <Tooltip label={t(social.title)} aria-label="A tooltip" key={key}>
                  <a href={`${social.to}`} target="_blank" style={socialLink(social.title)} className="social" color="white" rel="noreferrer" />
                </Tooltip>
              ))}
            </Stack>
          </Flex>
          */}
        </Container>
      </Center>
    </>
  );
};
