import { Box, Grid, GridItem } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { Animal, AnimalDetail } from './animal.dto';

import './animal.component.scss';
import { Dragger } from 'src/utils/dragger';

interface Props {
  data: Animal | AnimalDetail;
  className?: string;
  scale?: number;
  stats?: boolean;
  drop?: string;
}

export const AnimalCard = (props: React.PropsWithChildren<Props>) => {
  const { t } = useTranslate();
  const { data, className, stats, scale, drop, ...rest } = props;
  const regionPicture = {
    backgroundImage: `url(/images/regions/${data.region}.svg)`,
  };
  const style: { transform?: string } = {};

  if (scale) {
    style.transform = `scale(${scale || 1}`;
  }

  return (
    <>
      <Box
        {...rest}
        className={`animal ${className} ${stats && 'sequare'}`}
        draggable
        onDragStart={(event: any) => Dragger.onDragStart(event, data)}
        onDragEnd={(event: any) => Dragger.onDragEnd(event, data)}
        drop-target={drop}>
        <div className="layout" style={style}>
          <div className="overflow" style={{ backgroundImage: `url(/images/animals/${data.name}.jpg)` }} />
          <div className={`rarity-line ${data.rarity.toLowerCase()}`} />
          <div className="level" style={{ backgroundImage: `url(/images/level/level-${props.data.level}.svg)` }} />
          <div className={`rarity ${data.rarity.toLowerCase()}`} />
          <div className="region" style={regionPicture} />
          <div className="name">{t(`animals.${data.name}`)}</div>
        </div>
        {Boolean(props.stats) && (
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
