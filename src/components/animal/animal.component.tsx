import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useTranslate } from 'src/components/translate/translate.component';
import { Animal, AnimalDetail } from 'src/dtos';
import './animal.component.scss';

interface Props {
  data: Animal | AnimalDetail;
  className?: string;
  scale?: number;
}

export const AnimalCard = (props: React.PropsWithChildren<Props>) => {
  const { t } = useTranslate();
  const { data } = props;
  const regionPicture = {
    'backgroundImage': `url(/images/regions/${data.region}.svg)`,
  };
  const style: { transform?: string } = {};

  if (props.scale) {
    style.transform = `scale(${props.scale || 1}`;
  }

  return (
    <>
      <Box {...props} className={`animal ${props.className}`}>
        <div className="layout" style={style}>
          <div className="overflow" style={{ 'backgroundImage': `url(/images/animals/${data.name}.jpeg)` }}></div>
          <div className={`rarity-line ${data.type.toLowerCase()}`}></div>
          <div className="level" style={{ 'backgroundImage': `url(/images/level/level-${props.data.level}.svg)` }}></div>
          <div className={`rarity ${data.type.toLowerCase()}`}></div>
          <div className="region" style={regionPicture}></div>
          <div className="name">{t(`animals.${data.name}`)}</div>
        </div>
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
