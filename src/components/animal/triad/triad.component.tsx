import { useEffect } from 'react';
import { Animal } from 'src/dtos';
import { api } from 'src/components/axios/axios.component';
import { AnimalCard } from 'src/components/animal/animal.component';
import { Box, Container } from '@chakra-ui/react';
import { useMQReal } from 'src/theme/util/media-query';
import React from 'react';
import './triad.component.scss';

const requestTriad = async (): Promise<Animal[]> => {
  const response = await api.get('/animal/triad');
  return response.data.data;
};

export const Triad = () => {
  const isDesktop = useMQReal('md');
  const [animals, setAnimals] = React.useState<Animal[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await requestTriad();
      setAnimals(response);
    }

    fetchData();
  }, []);

  return (
    <>
      <Container maxW="container.xl" className={`triad ${isDesktop ? 'desktop' : 'mobile'}`}>
        {animals.length > 0 && (
          <Box className={`triad-left-side`}>
            <AnimalCard data={animals[0]} scale={0.8} className="animal-first ac" />
            <AnimalCard data={animals[1]} scale={1} className="ac animal-middle" />
            <AnimalCard data={animals[2]} scale={0.8} className="animal-last ac" />
          </Box>
        )}
      </Container>
    </>
  );
};
