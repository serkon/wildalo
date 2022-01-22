import { Container, Flex, Center, Image, Stack, Tooltip, Box } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';
import { Link } from 'react-router-dom';

import './footer.component.scss';

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
  logo?: string;
  children?: JSX.Element | string;
  className?: string;
}

const items = [
  { 'title': 'links.how_to_play', 'to': '' },
  { 'title': 'links.whitepaper', 'to': '' },
  // { 'title': 'links.about_us', 'to': '' },
  // { 'title': 'links.contact_us', 'to': '' },
  // { 'title': 'links.faqs', 'to': '' },
  // { 'title': 'links.privacy_policy', 'to': '' },
];

const socials = [
  { 'title': 'social.discord', 'to': 'https://discord.com/channels/920134929583603714/920134930284044359' },
  { 'title': 'social.telegram', 'to': 'https://t.me/+jO3E4SQjH6U2MmEx' },
  { 'title': 'social.twitter', 'to': 'https://twitter.com/wildalogame' },
  { 'title': 'social.facebook', 'to': 'https://www.facebook.com/wildalogame' },
  { 'title': 'social.reddit', 'to': 'https://www.reddit.com/r/wildalo/' },
  // { 'title': 'social.youtube', 'to': 'https://www.youtube.com/channel/UCeqL4KyprLNMKwFQueOdsIw' },
  // { 'title': 'social.linkedin', 'to': 'https://www.linkedin.com/in/wildalo-game-a23921229/' },
  // { 'title': 'social.instagram', 'to': 'https://www.instagram.com/wildalogame/' },
  // { 'title': 'social.medium', 'to': 'https://medium.com/@wildalogame' },
];

export const Footer = (props: Props): JSX.Element => {
  const socialLink = (d: string) => ({
    'WebkitMaskImage': `url(/images/socials/${t(d)}.svg)`,
    'maskImage': `url(/images/socials/${t(d)}.svg)`,
  });
  const { t } = useTranslate();
  return (
    <>
      <Center as="footer" className={props.className}>
        <Container maxW="container.xl" className="footer-container">
          <Flex width="full" alignItems="center" flexDirection={{ 'base': 'column', 'md': 'row' }}>
            <Image srcSet={props.logo} objectFit="contain" maxW={{ 'base': '50%', 'md': '170px' }} />
            <Box className="link-container" ml={[0, 124]} mt={[10, 0]}>
              {items.map((item: { title: string; to: string }, key: number) => (
                <Link to={item.to} key={key}>
                  {t(item.title)}
                </Link>
              ))}
            </Box>
            <Stack className="socials" mt={[16, 0]} justifyContent={{ 'base': 'space-between', 'md': 'end' }} width={{ 'base': '100%', 'md': 'auto' }}>
              {socials.map((social: { title: string; to: string }, key: number) => (
                <Tooltip label={t(social.title)} aria-label="A tooltip" key={key}>
                  <a href={`${social.to}`} target="_blank" style={socialLink(social.title)} className="social" color="white"></a>
                </Tooltip>
              ))}
            </Stack>
          </Flex>
        </Container>
      </Center>
    </>
  );
};
