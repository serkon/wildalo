import { Box, Container } from '@chakra-ui/react';

import { Animal } from 'src/components/animal/animal.dto';
import { AnimalCard } from 'src/components/animal/animal.component';
import { useMediaQuery } from 'src/theme/util/media-query';
import { useTranslate } from 'src/components/translate/translate.component';
import './triad.component.scss';

export const Triad = ({ data }: { data: Animal[] | undefined }) => {
  const { t } = useTranslate();
  const isDesktop = useMediaQuery('md');

  return (
    <>
      <Container maxW="container.xl" className={`triad ${isDesktop ? 'desktop' : 'mobile'}`}>
        {data && data.length > 0 ? (
          <Box className={`triad-left-side`}>
            <AnimalCard data={data[0]} scale={0.8} className="animal-first ac" />
            <AnimalCard data={data[1]} scale={1} className="ac animal-middle" />
            <AnimalCard data={data[2]} scale={0.8} className="animal-last ac" />
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
