import { Box } from '@chakra-ui/react';
import React from 'react';

import { useTranslate } from 'src/components/translate/translate.component';
import './animal-card.scss';

interface Props {
  id?: string;
  type: string;
  label: string;
  className?: string;
  scale?: number;
  translateX?: string;
}

// sample 1
export const AnimalCard = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { t } = useTranslate();
  const animalPicture = {
    'backgroundImage': `url(/images/animals/${props.id}.svg)`,
  };
  const scale = {
    'transform': `scale(${props.scale || 1}`,
  };
  return (
    <>
      <Box {...props} className={`animal-card ${props.className}`} style={scale}>
        <div className="level">
          <span className="level-title">{t('level')}</span> <span className="level-value">{props.type}</span>
        </div>
        <h2 className="animal-name">{props.label}</h2>
        <div className={`animal-background card-type-${props.type}`}></div>
        <div className="animal-picture" style={animalPicture}></div>
      </Box>
    </>
  );
};
