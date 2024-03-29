import React from 'react';
import { Box, GridItem } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { Animal, AnimalDetail } from 'src/components/animal/animal.dto';
import './animal-card.scss';

interface Props {
  data: Animal | AnimalDetail;
  className?: string;
  scale?: number;
  translateX?: string;
}

// sample 1
export const AnimalOldCard = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { t } = useTranslate();
  const { data } = props;
  const animalPicture = {
    backgroundImage: `url(/images/animals/${data.name}.jpeg)`,
  };
  const regionPicture = {
    backgroundImage: `url(/images/regions/${data.region}.svg)`,
  };
  const scale = {
    transform: `scale(${props.scale || 1}`,
  };

  return (
    <>
      <Box {...props} className={`animal-card ${props.className}`} style={scale ? scale : {}}>
        <div className="level">
          <span className="level-title">{t('level')}</span> <span className="level-value">{data.level}</span>
        </div>
        <h2 className="animal-name">{t(`animals.${data.name}`)}</h2>
        <div className={`animal-background card-type-${data.rarity.toLowerCase()}`} />
        <div className="animal-picture" style={animalPicture} />
        <div className="region" style={regionPicture} />
        <div className="stats">
          <Grid templateColumns="repeat(2, 1fr)" gridColumnGap={4} gridRowGap={2}>
            {Object.keys(data.primaryStats).map((item, key) => (
              <GridItem w="24" h="6" key={key} className="prop">
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
