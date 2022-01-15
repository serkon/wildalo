import { Container, Flex, Center, Image, Stack, Tooltip } from '@chakra-ui/react';
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
  { 'title': 'links.about_us', 'to': '' },
  { 'title': 'links.contact_us', 'to': '' },
  { 'title': 'links.faqs', 'to': '' },
  { 'title': 'links.privacy_policy', 'to': '' },
  { 'title': 'links.how_to_play', 'to': '' },
  { 'title': 'links.whitepaper', 'to': '' },
];

const socials = [
  { 'title': 'social.facebook', 'to': 'https://www.facebook.com/wildalogame' },
  { 'title': 'social.twitter', 'to': 'https://twitter.com/wildalogame' },
  { 'title': 'social.reddit', 'to': 'https://www.reddit.com/r/wildalo/' },
  { 'title': 'social.discord', 'to': 'https://discord.com/channels/920134929583603714/920134930284044359' },
  { 'title': 'social.youtube', 'to': 'https://www.youtube.com/channel/UCeqL4KyprLNMKwFQueOdsIw' },
  { 'title': 'social.linkedin', 'to': 'https://www.linkedin.com/in/wildalo-game-a23921229/' },
  { 'title': 'social.instagram', 'to': 'https://www.instagram.com/wildalogame/' },
  { 'title': 'social.medium', 'to': 'https://medium.com/@wildalogame' },
  { 'title': 'social.telegram', 'to': 'https://t.me/+jO3E4SQjH6U2MmEx' },
];

export const Footer = (props: Props): JSX.Element => {
  const socialLink = (d: string) => {
    console.log(d);
    return {
      'WebkitMaskImage': `url(/images/socials/${t(d)}.svg)`,
      'maskImage': `url(/images/socials/${t(d)}.svg)`,
    };
  };
  const { t } = useTranslate();
  return (
    <>
      <Center as="footer" className={props.className}>
        <Container maxW="container.xl">
          <Flex width="full" alignItems="center">
            <Image srcSet={props.logo} objectFit="contain" maxW="170px" />
            <div className="link-container">
              {items.map((item: { title: string; to: string }) => (
                <Link to={item.to}>{t(item.title)}</Link>
              ))}
            </div>
            <Stack className="socials">
              {socials.map((social: { title: string; to: string }) => (
                <Tooltip label={t(social.title)} aria-label="A tooltip">
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
