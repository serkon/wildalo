import { Container, Flex, Center, Image, Button, Stack } from '@chakra-ui/react';
import { useMQReal } from 'src/theme/util/media-query';

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
  logo?: string;
  children?: JSX.Element | string;
}

const DesktopMenu = () => (
  <Stack direction="row" spacing={[0, 4, 8, 20]} flex="1" justifyContent="center" alignItems="center">
    <Button color="white" variant="ghost">
      AUCTION
    </Button>
    <Button color="white" variant="ghost">
      PACKAGES
    </Button>
    <Button color="white" variant="ghost">
      GAME
    </Button>
    <Button color="white" variant="ghost">
      HOW TO PLAY
    </Button>
  </Stack>
);

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
