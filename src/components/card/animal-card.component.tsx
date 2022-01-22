import { Box, GridItem } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';

import React from 'react';

import { useTranslate } from 'src/components/translate/translate.component';
import './animal-card.scss';
import { Animal, AnimalDetail } from './animal.dto';

interface Props {
  data: Animal | AnimalDetail;
  className?: string;
  scale?: number;
  translateX?: string;
}

// sample 1
export const AnimalCard = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { t } = useTranslate();
  const { data } = props;
  const animalPicture = {
    'backgroundImage': `url(/images/animals/${data.name}.svg)`,
  };
  const regionPicture = {
    'backgroundImage': `url(/images/regions/${data.region}.svg)`,
  };
  const scale = {
    'transform': `scale(${props.scale || 1}`,
  };
  return (
    <>
      <Box {...props} className={`animal-card ${props.className}`} style={scale ? scale : {}}>
        <div className="level">
          <span className="level-title">{t('level')}</span> <span className="level-value">{data.level}</span>
        </div>
        <h2 className="animal-name">{t(`animals.${data.name}`)}</h2>
        <div className={`animal-background card-type-${data.type.toLowerCase()}`}></div>
        <div className="animal-picture" style={animalPicture}></div>
        <div className="region" style={regionPicture}></div>
        <div className="stats">
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            {Object.keys(data.primaryStats).map((item, key) => (
              <GridItem w="20" h="6" key={key} className="prop">
                <img src={`./images/stats/${item}.svg`} />
                <span className="item-value">{(data.primaryStats as any)[item]}</span>
              </GridItem>
            ))}
          </Grid>
        </div>
      </Box>
    </>
  );
};
