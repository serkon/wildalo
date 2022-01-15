import { Container, Flex, Center, Image, Button, Stack } from '@chakra-ui/react';
import { useMQReal } from 'src/theme/util/media-query';

import { useTranslate } from 'src/components/translate/translate.component';
import { useNavigate } from 'react-router-dom';

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
  logo?: string;
  children?: JSX.Element | string;
}

const items = [
  { 'title': 'links.home', 'to': '/' },
  { 'title': 'links.how_to_play', 'to': 'faq' },
  { 'title': 'links.whitepaper', 'to': 'whitepaper' },
];

const DesktopMenu = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={[0, 4, 8, 20]} flex="1" justifyContent="flex-end" alignItems="center">
      {items.map((item: { title: string; to: string }) => (
        <Button color="white" variant="ghost" onClick={() => navigate(item.to)}>
          {t(item.title)}
        </Button>
      ))}
    </Stack>
  );
};

const MobileMenu = () => <>mobile</>;

export const Header = (props: Props): JSX.Element => {
  const isLarge = useMQReal('md');

  return (
    <>
      <Center height={90} as="header" background="custom.header">
        <Container maxW="container.xl">
          <Flex width="full" alignItems="center" className="serkan">
            <Image srcSet={props.logo} objectFit="contain" maxW="170px" />
            {isLarge ? <DesktopMenu /> : <MobileMenu />}
          </Flex>
        </Container>
      </Center>
    </>
  );
};
