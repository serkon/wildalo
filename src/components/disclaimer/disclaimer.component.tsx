import { Box, useToast, Heading, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useTranslate } from 'src/components/translate/translate.component';
import './disclaimer.component.scss';

export const Disclaimer = () => {
  const { t } = useTranslate();
  const toast = useToast();
  const onToggle = () => {
    window.localStorage.setItem('disclaimer', 'true');
  };

  useEffect(() => {
    const isClosed = window.localStorage.getItem('disclaimer');
    window.localStorage.setItem('disclaimer', 'true');
    !isClosed &&
      toast({
        position: 'bottom',
        isClosable: true,
        duration: 10000,
        variant: 'with-shadow',
        onCloseComplete: () => {
          onToggle();
        },
        render: ({ onClose }) => (
          <Box m={3} color="white" p={3} className="chakra-alert">
            <Heading as="h3" size="md" mb="24px">
              {t('main.disclaimer.title')}
            </Heading>
            <Box>{t('main.disclaimer.description')}</Box>
            <Button onClick={onClose} mt="24px" variant={'primary'}>
              {t('main.disclaimer.Accept_Cookies')}
            </Button>
          </Box>
        ),
      });
  }, []);

  return <>sad</>;
};
