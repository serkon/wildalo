import { Box, Container } from '@chakra-ui/react';

import { Animal } from 'src/components/animal/animal.dto';
import { AnimalCard } from 'src/components/animal/animal.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import { useTranslate } from 'src/components/translate/translate.component';
import './triad.component.scss';

interface Props {
  data: Animal[] | undefined;
  className?: string;
  [key: string]: any;
  stats?: boolean;
}

export const Triad = (props: Props) => {
  const { data, className, stats, ...rest } = props;
  const { t } = useTranslate();
  const isDesktop = useMediaQuery('md');

  return (
    <>
      <Container maxW="container.xl" className={`triad ${isDesktop ? 'desktop' : 'mobile'} ${className}`} {...rest}>
        {JSON.stringify(rest)}
        {data && data.length > 0 ? (
          <Box className={`triad-container`}>
            <AnimalCard data={data[0]} scale={0.8} className="animal-first ac" stats={Boolean(stats).toString()} />
            <AnimalCard data={data[1]} scale={1} className="ac animal-middle" stats={Boolean(stats).toString()} />
            <AnimalCard data={data[2]} scale={0.8} className="animal-last ac" stats={Boolean(stats).toString()} />
          </Box>
        ) : (
          <Box opacity={0.6} width="32" textAlign={'center'} lineHeight={'25px'} margin={14} marginBottom="20" fontSize="18px">
            {t('dashboard.no_wilding_found')}
          </Box>
        )}
      </Container>
    </>
  );
};
