import { Container, Heading, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslate } from 'src/components/translate/translate.component';
import { LinkGame } from 'src/utils/links';
import './page.component.scss';

interface Props {
  title: string;
  children?: React.ReactNode;
}
const Links = () => {
  const { t } = useTranslate();

  return (
    <React.Fragment>
      {LinkGame.map((item: { title: string; to: string }, key: number) => (
        <Link as={NavLink} to={item.to} variant="header" key={key} fontWeight="400">
          {t(item.title)}
        </Link>
      ))}
    </React.Fragment>
  );
};

export const Page = (props: Props) => {
  const { t } = useTranslate();
  const { title } = props;

  return (
    <Container maxWidth="container.xl" className="page-container" marginBottom="120px">
      <Heading as="h3" size="lg" isTruncated className="page-title" fontSize="132px" position="absolute" marginLeft="-9px" zIndex={-1}>
        {t(title)}
      </Heading>
      <HStack as={'nav'} spacing={{ base: 3, md: 6, lg: 12 }} alignItems={'flex-end'} display={{ base: 'none', xs: 'flex' }} padding="48px 0">
        <Links />
      </HStack>
      {props.children}
    </Container>
  );
};
