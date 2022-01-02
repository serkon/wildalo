import { Box, Button } from '@chakra-ui/react';
import React from 'react';

import { useTranslate } from 'src/components/translate/translate.component';
import './animal-card.scss';

interface Props {
  id?: string;
  label: string;
  className?: string;
}

// sample 1
export const AnimalCard = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { t } = useTranslate();
  const classes = ['content'];
  if (props.className) {
    classes.push(props.className);
  }
  return (
    <Box className="animal-card">
      <Button>{t('withParam', { 'param': 'level 2' })}</Button>
    </Box>
  );
};
