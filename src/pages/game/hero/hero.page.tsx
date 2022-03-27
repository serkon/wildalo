import { Box, CloseButton, Container, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslate } from 'src/components/translate/translate.component';

import './hero.page.scss';

export const GameHero = () => {
  const { t } = useTranslate();
  const [isOpen, setOpen] = useState(false);
  const setCookie = () => {
    window.localStorage.setItem('game-hero-closed', 'true');
  };

  const onToggle = () => {
    setOpen(!isOpen);
    window.localStorage.setItem('game-hero-closed', `${!isOpen}`);
  };

  useEffect(() => {
    const isClosed = window.localStorage.getItem('game-hero-closed');
    window.addEventListener('beforeunload', setCookie);
    setOpen(isClosed === 'true');
    return () => {
      window.removeEventListener('beforeunload', setCookie);
      setOpen(true);
    };
  }, []);
  return (
    <>
      {!isOpen && (
        <Box position={'relative'}>
          <Box height="310px" className="game-hero">
            <Container maxWidth="container.xl" className="page-container">
              <Heading as="h1" size="lg" isTruncated variant={'primary'} fontSize="42px" lineHeight={'55px'} fontWeight="900" pt="9">
                {t('game.hero.title')}
              </Heading>
              <Heading as="h3" size="lg" isTruncated color="white" fontSize="20px" lineHeight={'28px'} fontWeight="900" pt="3">
                {t('game.hero.sub_title')}
              </Heading>
              <Heading as="h4" size="lg" isTruncated color="white" fontSize="16px" lineHeight={'28px'} fontWeight="900" pt="3">
                {t('game.hero.description')}
              </Heading>
              <Box fontSize={'12px'} lineHeight="14px" color="#87AFA8" pt="10">
                {t('game.hero.description')}
              </Box>
            </Container>
          </Box>
          <CloseButton onClick={() => onToggle()} position="absolute" right={'10px'} top="10px" color="white" />
        </Box>
      )}
    </>
  );
};
