import { Box, Container } from '@chakra-ui/react';

import { Animal } from 'src/components/animal/animal.dto';
import { AnimalCard } from 'src/components/animal/animal.component';
import { useMQReal } from 'src/theme/util/media-query';
import './triad.component.scss';

export const Triad = ({ data }: { data: Animal[] | undefined }) => {
  const isDesktop = useMQReal('md');

  return (
    <>
      <Container maxW="container.xl" className={`triad ${isDesktop ? 'desktop' : 'mobile'}`}>
        {data && data.length > 0 && (
          <Box className={`triad-left-side`}>
            <AnimalCard data={data[0]} scale={0.8} className="animal-first ac" />
            <AnimalCard data={data[1]} scale={1} className="ac animal-middle" />
            <AnimalCard data={data[2]} scale={0.8} className="animal-last ac" />
          </Box>
        )}
      </Container>
    </>
  );
};
