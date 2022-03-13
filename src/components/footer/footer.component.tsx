import { Container, Flex, Center, Image, Stack, Tooltip, Box, Button } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';

import './footer.component.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
  logo?: string;
  children?: JSX.Element | string;
  className?: string;
}

const items = [
  { title: 'links.how_to_play', to: 'faq' },
  { title: 'footer.terms_and_conditions', to: 'terms-and-conditions.pdf', external: true },
  { title: 'links.whitepaper', to: 'whitepaper.pdf', external: true },
  { title: 'footer.privacy_policy', to: 'privacy-and-policy.pdf', external: true },

  // { 'title': 'links.about_us', 'to': '' },
  // { 'title': 'links.contact_us', 'to': '' },
  // { 'title': 'links.faqs', 'to': '' },
];
const socials = [
  { title: 'social.discord', to: 'https://discord.gg/Vypt9GUjKh' },
  { title: 'social.telegram', to: 'https://t.me/+jO3E4SQjH6U2MmEx' },
  { title: 'social.twitter', to: 'https://twitter.com/wildalogame' },
  { title: 'social.facebook', to: 'https://www.facebook.com/wildalogame' },
  { title: 'social.reddit', to: 'https://www.reddit.com/r/wildalo/' },

  // { 'title': 'social.youtube', 'to': 'https://www.youtube.com/channel/UCeqL4KyprLNMKwFQueOdsIw' },
  // { 'title': 'social.linkedin', 'to': 'https://www.linkedin.com/in/wildalo-game-a23921229/' },
  // { 'title': 'social.instagram', 'to': 'https://www.instagram.com/wildalogame/' },
  // { 'title': 'social.medium', 'to': 'https://medium.com/@wildalogame' },
];

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
        </Container>
      </Center>
    </>
  );
};
