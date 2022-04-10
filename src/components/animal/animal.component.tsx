import { Box, Grid, GridItem } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { Animal, AnimalDetail } from './animal.dto';
import './animal.component.scss';

interface Props {
  data: Animal | AnimalDetail;
  className?: string;
  scale?: number;
  stats?: boolean;
}

export const AnimalCard = (props: React.PropsWithChildren<Props>) => {
  const { t } = useTranslate();
  const { data } = props;
  const regionPicture = {
    backgroundImage: `url(/images/regions/${data.region}.svg)`,
  };
  const style: { transform?: string } = {};

  if (props.scale) {
    style.transform = `scale(${props.scale || 1}`;
  }

  return (
    <>
      <Box {...props} className={`animal ${props.className} ${props.stats && 'sequare'}`}>
        <div className="layout" style={style}>
          <div className="overflow" style={{ backgroundImage: `url(/images/animals/${data.name}.jpg)` }} />
          <div className={`rarity-line ${data.rarity.toLowerCase()}`} />
          <div className="level" style={{ backgroundImage: `url(/images/level/level-${props.data.level}.svg)` }} />
          <div className={`rarity ${data.rarity.toLowerCase()}`} />
          <div className="region" style={regionPicture} />
          <div className="name">{t(`animals.${data.name}`)}</div>
        </div>
        {props.stats && (
          <div className="stats">
            <Grid templateColumns="repeat(3, 1fr)" gridColumnGap={'2px'} gridRowGap={0.5}>
              {Object.keys(data.primaryStats).map((item, key) => (
                <GridItem key={key} className="prop">
                  <img src={`/images/stats/${item}.svg`} style={{ display: 'inline' }} />
                  <span className="item-value">{(data.primaryStats as any)[item]}</span>
                </GridItem>
              ))}
            </Grid>
          </div>
        )}
      </Box>
    </>
  );
};
